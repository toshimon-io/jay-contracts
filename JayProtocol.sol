//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";


interface IERC721 {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}

interface IERC1155 {
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external;
}

interface IJAY {
    function sell(uint256 value) external;
    function buy(address reciever) external payable;
    function burnFrom(address account, uint256 amount) external;
    function ETHtoJAY(uint256 value) external view returns (uint256);
}

contract JayMart is Ownable, ReentrancyGuard{
    // Use SafeMath for all calculations including uint256's
    using SafeMath for uint256;

    // Define our price feed interface
    AggregatorV3Interface internal priceFeed;

    // Create variable to hold the team wallet address
    address payable private constant TEAM_WALLET = payable(0x985B6B9064212091B4b325F68746B77262801BcB);

    // Create variable to hold contract address
    address payable private JAY_ADDRESS;

    // Define new IJAY interface
    IJAY private JAY;

    // Define some constant variables
    uint256 private constant SELL_NFT_PAYOUT = 2;
    uint256 private constant SELL_NFT_FEE_VAULT = 4;
    uint256 private constant SELL_NFT_FEE_TEAM = 4;
    uint256 private constant BUY_NFT_FEE_VAULT = 2;
    uint256 private constant BUY_NFT_FEE_TEAM = 2;
    uint256 private constant USD_PRICE_SELL = 2 * 10**18;
    uint256 private constant USD_PRICE_BUY = 10 * 10**18;

    // Define variables for amount of NFTs bought/sold
    uint256 private nftsBought;
    uint256 private nftsSold;

    // Create variables for gas fee calculation 
    uint256 private buyNftFeeEth = 0.01 * 10**18;
    uint256 private buyNftFeeJay = 10 * 10**18;
    uint256 private sellNftFeeEth = 0.001 * 10**18;

    // Create variable to hold when the next fee update can occur
    uint256 private nextFeeUpdate = block.timestamp.add(7 days);

    // Constructor
    constructor(address _jayAddress) {
        JAY = IJAY(_jayAddress);
        priceFeed = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419); //main
    }

    /*
    * Name: sendEth
    * Purpose: Tranfer ETH tokens
    * Parameters:
    *    - @param 1: Address
    *    - @param 2: Value
    * Return: n/a
    */
    function sendEth(address _address, uint256 _value) private {
        (bool success, ) = _address.call{value: _value}("");
        require(success, "ETH Transfer failed.");
    }

    /*
    * Name: buyNFTs
    * Purpose: Purchase NFTs with ETH
    * Parameters:
    *    - @param 1: ERC721 Token Address
    *    - @param 2: ERC721 IDs
    *    - @param 3: ERC1155 Token Address
    *    - @param 4: ERC1155 IDs
    *    - @param 5: ERC1155 Amounts
    * Return: n/a
    */
    function buyNFTs(
        address[] calldata erc721TokenAddress, 
        uint256[] calldata erc721Ids, 
        address[] calldata erc1155TokenAddress, 
        uint256[] calldata erc1155Ids,
        uint256[] calldata erc1155Amounts
    ) external payable nonReentrant{
        // Calculate total
        uint256 total = erc721TokenAddress.length;

        // Transfer ERC721 NFTs
        buyERC721(erc721TokenAddress, erc721Ids);

        // Transfer ERC1155 NFTs
        total += buyERC1155(erc1155TokenAddress, erc1155Ids, erc1155Amounts);

        // Make sure enough ETH is present
        require(msg.value >= (total).mul(buyNftFeeEth), "You need to pay more ETH.");

        // Send fees to designated wallets
        sendEth(JAY_ADDRESS, msg.value.mul(BUY_NFT_FEE_VAULT).div(BUY_NFT_FEE_TEAM + BUY_NFT_FEE_VAULT));
        sendEth(TEAM_WALLET, msg.value.mul(BUY_NFT_FEE_TEAM).div(BUY_NFT_FEE_TEAM + BUY_NFT_FEE_VAULT));

        // Initiate burn method 
        JAY.burnFrom(msg.sender, total.mul(buyNftFeeJay));

        // Increase NFTs bought 
        nftsBought += total;
    }

    /*
    * Name: sellNFTs
    * Purpose: Purchase JAY tokens by selling NFTs
    * Parameters:
    *    - @param 1: ERC721 Token Address
    *    - @param 2: ERC721 IDs
    *    - @param 3: ERC1155 Token Address
    *    - @param 4: ERC1155 IDs
    *    - @param 5: ERC1155 Amounts
    * Return: n/a
    */
    function sellNFTs(
        address[] calldata erc721TokenAddress, 
        uint256[] calldata erc721Ids, 
        address[] calldata erc1155TokenAddress, 
        uint256[] calldata erc1155Ids, 
        uint256[] calldata erc1155Amounts
    ) external payable nonReentrant{
        // Calculate total
        uint256 total = erc721TokenAddress.length;

        // Transfer ERC721 NFTs
        buyJayWithERC721(erc721TokenAddress, erc721Ids);

        // Transfer ERC1155 NFTs
        total += buyJayWithERC1155(erc1155TokenAddress, erc1155Ids, erc1155Amounts);
        
        // Calculate fee
        uint256 _fee = total >= 100 ? (total).mul(sellNftFeeEth).div(2) : (total).mul(sellNftFeeEth);

v
        require(msg.value >= _fee, "You need to pay more ETH.");

        // Send fees to their designated wallets
        sendEth(JAY_ADDRESS, msg.value.mul(SELL_NFT_FEE_VAULT).div(SELL_NFT_PAYOUT));
        sendEth(TEAM_WALLET, msg.value.mul(SELL_NFT_FEE_TEAM).div(SELL_NFT_PAYOUT));

        // buy JAY
        JAY.buy{value: msg.value.div(SELL_NFT_PAYOUT)}(msg.sender);

        // Increase nftsSold variable
        nftsSold += total;
    }

    /*
    * Name: buyERC721
    * Purpose: Transfer ERC721 NFTs
    * Parameters:
    *    - @param 1: ERC721 Token Address
    *    - @param 2: ERC721 IDs
    * Return: n/a
    */
    function buyERC721(address[] calldata _tokenAddress, uint256[] calldata ids) internal {
        for (uint256 id = 0; id < ids.length; id++) {
            IERC721(_tokenAddress[id]).safeTransferFrom(
                address(this),
                msg.sender,
                ids[id]
            );
        }
    }

    /*
    * Name: buyERC1155
    * Purpose: Transfer ERC1155 NFTs
    * Parameters:
    *    - @param 1: ERC1155 Token Address
    *    - @param 2: ERC1155 IDs
    *    - @param 3: ERC1155 Amounts
    * Return: Amount of NFTs bought
    */
    function buyERC1155(address[] calldata _tokenAddress, uint256[] calldata ids, uint256[] calldata amounts) internal returns (uint256) {
        uint256 amount = 0;
        for (uint256 id = 0; id < ids.length; id++) {
            amount = amount.add(amounts[id]);
            IERC1155(_tokenAddress[id]).safeTransferFrom(
                address(this),
                msg.sender,
                ids[id],
                amounts[id],
                ""
            );
        }
        return amount;
    }

    /*
    * Name: buyJayWithERC721
    * Purpose: Buy JAY from selling ERC721 NFTs
    * Parameters:
    *    - @param 1: ERC721 Token Address
    *    - @param 2: ERC721 IDs
    *
    * Return: n/a
    */
    function buyJayWithERC721(address[] calldata _tokenAddress, uint256[] calldata ids) internal {
        for (uint256 id = 0; id < ids.length; id++) {
            IERC721(_tokenAddress[id]).safeTransferFrom(
                msg.sender,
                address(this),
                ids[id]
            );
        }
    }

    /*
    * Name: buyJayWithERC1155
    * Purpose: Buy JAY from selling ERC1155 NFTs
    * Parameters:
    *    - @param 1: ERC1155 Token Address
    *    - @param 2: ERC1155 IDs
    *    - @param 3: ERC1155 Amounts
    *
    * Return: Number of NFTs sold
    */
    function buyJayWithERC1155(address[] calldata _tokenAddress, uint256[] calldata ids, uint256[] calldata amounts) internal returns (uint256) {
        uint256 amount = 0;
        for (uint256 id = 0; id < ids.length; id++) {
            amount = amount.add(amounts[id]);
            IERC1155(_tokenAddress[id]).safeTransferFrom(
                msg.sender,
                address(this),
                ids[id],
                amounts[id],
                ""
            );
        }
        return amount;
    }

    /*
    * Name: updateFees
    * Purpose: Update the NFT sales fees
    * Parameters: n/a
    * Return: Array of uint256: NFT Sell Fee (ETH), NFT Buy Fee (ETH), NFT Buy Fee (JAY), time of next update
    */
    function updateFees() public returns (uint256, uint256, uint256, uint256) {
        // Get latest price feed 
        (uint80 roundID, int256 price, uint256 startedAt, uint256 timeStamp, uint80 answeredInRound) = priceFeed.latestRoundData();

        // Calulcate and store price
        uint256 _price = uint256(price).mul(1 * 10**10);

        // Check if it's time to update fees
        if (timeStamp > nextFeeUpdate) {
            sellNftFeeEth = _price > USD_PRICE_SELL ? uint256(1 * 10**18).div(_price.div(USD_PRICE_SELL)) : USD_PRICE_SELL.div(_price);
            // If transaction isn't submitted by the owner
            if (msg.sender != owner()) {
                if (sellNftFeeEth.div(2) >= sellNftFeeEth || sellNftFeeEth.mul(150) <= sellNftFeeEth) {
                    return (0, 0, 0, nextFeeUpdate);
                }
            }
            if (_price > USD_PRICE_BUY) {
                buyNftFeeEth = uint256(1 * 10**18).div(_price.div(USD_PRICE_BUY));
            } else {
                buyNftFeeEth = USD_PRICE_BUY.div(_price);
            }

            // Update buyNftFeeJay 
            buyNftFeeJay = JAY.ETHtoJAY(buyNftFeeEth);

            // Set nextFeeUpdate 
            nextFeeUpdate = timeStamp.add(24 hours);
        }
        return (sellNftFeeEth, buyNftFeeEth, buyNftFeeJay, nextFeeUpdate);
    }
}