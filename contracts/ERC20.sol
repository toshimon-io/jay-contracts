//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract ERC is ERC20Burnable {
    constructor() ERC20("ERC", "ERC") {}

    function mint(uint256 amout) public {
        _mint(msg.sender, amout);
    }
}
