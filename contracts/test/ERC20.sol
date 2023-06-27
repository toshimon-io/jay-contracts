//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


contract ERC is ERC20Burnable {

    function mint(uint256 amout) public {
        _mint(msg.sender, amout);
    }
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    constructor(
    ) ERC20("ERC","ERC") {
        _name = "ERC";
        _symbol = "ERC";
        _decimals = 6;
        _totalSupply = 10000000000000000 * (10**uint256(_decimals));
        emit Transfer(address(0), msg.sender, 1000);
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

}
