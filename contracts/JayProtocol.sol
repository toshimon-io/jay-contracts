//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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

contract JayMart is Ownable {
    // Use SafeMath for all calculations including uint256's
    using SafeMath for uint256;

    // Define our price feed interface
    AggregatorV3Interface internal priceFeed;

    // Create variable to hold the team wallet address
    address payable private constant TEAM_WALLET =
        payable(0x985B6B9064212091B4b325F68746B77262801BcB);

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
    uint256 private constant USD_PRICE_SELL = 2 * 10 ** 18;
    uint256 private constant USD_PRICE_BUY = 10 * 10 ** 18;

    // Define variables for amount of NFTs bought/sold
    uint256 private nftsBought;
    uint256 private nftsSold;

    // Create variables for gas fee calculation
    uint256 private buyNftFeeEth = 0.01 * 10 ** 18;
    uint256 private buyNftFeeJay = 10 * 10 ** 18;
    uint256 private sellNftFeeEth = 0.001 * 10 ** 18;

    // Create variable to hold when the next fee update can occur
    uint256 private nextFeeUpdate = block.timestamp.add(7 days);

    // Constructor
    constructor(address _jayAddress) {
        JAY = IJAY(_jayAddress);
        priceFeed = AggregatorV3Interface(
            0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
        ); //main
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
    ) public payable {
        // Calculate total
        uint256 total = erc721TokenAddress.length;

        // Transfer ERC721 NFTs
        buyERC721(erc721TokenAddress, erc721Ids);

        // Transfer ERC1155 NFTs
        total += buyERC1155(erc1155TokenAddress, erc1155Ids, erc1155Amounts);

        // Calculate Jay fee
        uint256 _fee = total.mul(buyNftFeeEth);

        // Make sure enough ETH is present
        require(msg.value >= _fee, "You need to pay more ETH.");

        // Send fees to designated wallets
        sendEth(TEAM_WALLET, msg.value.div(BUY_NFT_FEE_TEAM));
        sendEth(JAY_ADDRESS, address(this).balance);

        // Initiate burn method
        JAY.burnFrom(msg.sender, _fee);

        // Increase NFTs bought
        nftsBought += total;
    }

    /*
     * Name: buyJay
     * Purpose: Purchase JAY tokens by selling NFTs
     * Parameters:
     *    - @param 1: ERC721 Token Address
     *    - @param 2: ERC721 IDs
     *    - @param 3: ERC1155 Token Address
     *    - @param 4: ERC1155 IDs
     *    - @param 5: ERC1155 Amounts
     * Return: n/a
     */
    function buyJay(
        address[] calldata erc721TokenAddress,
        uint256[] calldata erc721Ids,
        address[] calldata erc1155TokenAddress,
        uint256[] calldata erc1155Ids,
        uint256[] calldata erc1155Amounts
    ) public payable {
        uint256 total = erc721TokenAddress.length;

        // Transfer ERC721 NFTs
        buyJayWithERC721(erc721TokenAddress, erc721Ids);

        // Transfer ERC1155 NFTs
        total += buyJayWithERC1155(
            erc1155TokenAddress,
            erc1155Ids,
            erc1155Amounts
        );

        // Calculate fee
        uint256 _fee = total >= 100
            ? (total).mul(sellNftFeeEth).div(2)
            : (total).mul(sellNftFeeEth);

        // Make sure enough ETH is present
        require(msg.value >= _fee, "You need to pay more ETH.");

        // Send fees to their designated wallets
        sendEth(TEAM_WALLET, msg.value.div(SELL_NFT_FEE_TEAM));
        sendEth(JAY_ADDRESS, msg.value.div(SELL_NFT_FEE_VAULT));

        // buy JAY
        JAY.buy{value: address(this).balance}(msg.sender);

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
    function buyERC721(
        address[] calldata _tokenAddress,
        uint256[] calldata ids
    ) internal {
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
    function buyERC1155(
        address[] calldata _tokenAddress,
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) internal returns (uint256) {
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
    function buyJayWithERC721(
        address[] calldata _tokenAddress,
        uint256[] calldata ids
    ) internal {
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
    function buyJayWithERC1155(
        address[] calldata _tokenAddress,
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) internal returns (uint256) {
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

    // chainlink pricefeed / fee updater
    function getFees()
        public
        view
        returns (uint256, uint256, uint256, uint256)
    {
        return (sellNftFeeEth, buyNftFeeEth, buyNftFeeJay, nextFeeUpdate);
    }

    function getTotals() public view returns (uint256, uint256) {
        return (nftsBought, nftsSold);
    }

    /*
     * Name: updateFees
     * Purpose: Update the NFT sales fees
     * Parameters: n/a
     * Return: Array of uint256: NFT Sell Fee (ETH), NFT Buy Fee (ETH), NFT Buy Fee (JAY), time of next update
     */
    function updateFees() public returns (uint256, uint256, uint256, uint256) {
        // Get latest price feed
        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        uint256 _price = uint256(price).mul(1 * 10 ** 10);
        require(timeStamp > nextFeeUpdate, "Fee update every 24 hrs");

        uint256 _sellNftFeeEth;
        if (_price > USD_PRICE_SELL) {
            uint256 _p = _price.div(USD_PRICE_SELL);
            _sellNftFeeEth = uint256(1 * 10 ** 18).div(_p);
        } else {
            _sellNftFeeEth = USD_PRICE_SELL.div(_price);
        }

        require(
            owner() == msg.sender ||
                (sellNftFeeEth.div(2) < _sellNftFeeEth &&
                    sellNftFeeEth.mul(150) > _sellNftFeeEth),
            "Fee swing too high"
        );

        sellNftFeeEth = _sellNftFeeEth;

        if (_price > USD_PRICE_BUY) {
            uint256 _p = _price.div(USD_PRICE_BUY);
            buyNftFeeEth = uint256(1 * 10 ** 18).div(_p);
        } else {
            buyNftFeeEth = USD_PRICE_BUY.div(_price);
        }
        buyNftFeeJay = JAY.ETHtoJAY(buyNftFeeEth);

        nextFeeUpdate = timeStamp.add(24 hours);
        return (sellNftFeeEth, buyNftFeeEth, buyNftFeeJay, nextFeeUpdate);
    }

    function getLatestPrice() public view returns (int256) {
        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }

    //receiver helpers
    function deposit() public payable {}

    receive() external payable {}

    fallback() external payable {}

    function onERC1155Received(
        address,
        address from,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external pure returns (bytes4) {
        return IERC1155Receiver.onERC1155Received.selector;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }
}
