//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract JAY is ERC20Burnable, Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    address payable private FEE_ADDRESS =
        payable(0x985B6B9064212091B4b325F68746B77262801BcB);

    uint256 public constant MIN = 1000;
    uint256 public MAX = 1 * 10 ** 18;

    uint256 private prevPrice;

    uint16 public SELL_FEE = 900;
    uint16 public BUY_FEE = 900;
    uint16 public constant FEE_BASE_1000 = 1000;

    uint8 public constant FEES = 33;

    uint128 public constant ETHinWEI = 1 * 10 ** 18;

    event Price(uint256 time, uint256 recieved, uint256 sent);

    constructor() payable ERC20("JayPeggers", "JAY") {
        _mint(msg.sender, msg.value * MIN);
        prevPrice = JAYtoETH(ETHinWEI);
    }

    //Will be set to 100m eth value after 1 hr
    setMax(uint256 _max) public onlyOwner(){
        MAX = _max;
    }

    // Sell Jay
    function sell(uint256 jay) external nonReentrant {
        require(jay > MIN, "must trade over min");

        // Total Eth to be sent
        uint256 eth = JAYtoETH(jay);

        // Burn of JAY
        _burn(msg.sender, jay);

        // Payment to sender
        sendEth(msg.sender, eth.mul(SELL_FEE).div(FEE_BASE_1000));

        // Team fee
        sendEth(FEE_ADDRESS, eth.div(FEES));

        // Check the price of Jay has increased
        // If not revert state, tx fails
        //TO AUDITOR: would ideal like to remove if not necessary 
        priceCheck();

        emit Price(block.timestamp, jay, eth);
    }

    // Buy Jay
    function buy(address reciever) external payable nonReentrant {
        require(msg.value > MIN && msg.value < MAX, "must trade over min");

        // Mint Jay to sender
        uint256 jay = ETHtoJAY(msg.value);
        _mint(reciever, jay.mul(BUY_FEE).div(FEE_BASE_1000));

        // Team fee
        sendEth(FEE_ADDRESS, msg.value.div(FEES));

        // Check the price of Jay has increased
        // If not revert state, tx fails
        //TO AUDITOR: would ideal like to remove if not necessary 
        priceCheck();

        emit Price(block.timestamp, jay, msg.value);
    }

    function JAYtoETH(uint256 value) public view returns (uint256) {
        return (value * address(this).balance).div(totalSupply());
    }

    function ETHtoJAY(uint256 value) public view returns (uint256) {
        return value.mul(totalSupply()).div(address(this).balance.sub(value));
    }

    function sendEth(address _address, uint256 _value) internal {
        (bool success, ) = _address.call{value: _value}("");
        require(success, "ETH Transfer failed.");
    }

    function setFeeAddress(address _address) external onlyOwner {
        FEE_ADDRESS = payable(_address);
    }

    function setSellFee(uint16 amount) external onlyOwner {
        require(amount <= 969);
        require(amount > SELL_FEE);
        SELL_FEE = amount;
    }

    function setBuyFee(uint16 amount) external onlyOwner {
        require(amount <= 969 && amount >= 10);
        BUY_FEE = amount;
    }

    function priceCheck() internal {
        // Gets there price of Jay after the TX
        uint256 newPrice = JAYtoETH(ETHinWEI);

        // Assert the new price is > than the previous price
        assert(prevPrice < newPrice);

        // Set previous price to new price
        prevPrice = newPrice;
    }

    //utils
    function getBuyJay(uint256 amount) public view returns (uint256) {
        return
            amount
                .mul(totalSupply())
                .div(address(this).balance)
                .mul(BUY_FEE)
                .div(FEE_BASE_1000);
    }

    function getSellJay(uint256 amount) public view returns (uint256) {
        return
            (amount * address(this).balance)
                .div(totalSupply())
                .mul(SELL_FEE)
                .div(FEE_BASE_1000);
    }
}
