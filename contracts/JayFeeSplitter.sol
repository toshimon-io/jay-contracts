//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract JayFeeSplitter is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    address payable private TEAM_WALLET =
        payable(0x985B6B9064212091B4b325F68746B77262801BcB);
    address payable private LP_WALLET =
        payable(0x985B6B9064212091B4b325F68746B77262801BcB);
    address payable private NFT_WALLET =
        payable(0x985B6B9064212091B4b325F68746B77262801BcB);

    uint256 public constant MIN = 1 * 10 ** 15;

    constructor() {}

    // Sell Jay
    function splitFees() external nonReentrant {
        uint256 eth = address(this).balance;
        if (eth > MIN) {
            sendEth(TEAM_WALLET, eth.div(3));
            sendEth(LP_WALLET, eth.div(3));
            sendEth(NFT_WALLET, eth.div(3));
        }
    }

    function setTEAMWallet(address _address) external onlyOwner {
        TEAM_WALLET = payable(_address);
    }

    function setNFTWallet(address _address) external onlyOwner {
        NFT_WALLET = payable(_address);
    }

    function setLPWallet(address _address) external onlyOwner {
        LP_WALLET = payable(_address);
    }

    function sendEth(address _address, uint256 _value) internal {
        (bool success, ) = _address.call{value: _value}("");
        require(success, "ETH Transfer failed.");
    }

    receive() external payable {}
}
