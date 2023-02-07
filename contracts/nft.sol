// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, Ownable {
    constructor() ERC721("LuckyTrader", "LKYTR") {}

    function safeMint(address _address, uint256 id) public {
        _safeMint(_address, id);
    }
}
