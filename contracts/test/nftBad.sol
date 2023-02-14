// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

interface IJAY {
    function sell(uint256 value) external;

    function buy(address reciever) external payable;

    function burnFrom(address account, uint256 amount) external;

    function ETHtoJAY(uint256 value) external view returns (uint256);
}

contract NFT is ERC721, Ownable {
    IJAY private immutable JAY;

    constructor() ERC721("LuckyTrader", "LKYTR") {
        JAY = IJAY(0x46eB2824CeAe16bC1cb3C324fb891DAf76C2c0cf);
    }

    function safeMint(address _address, uint256 id) public {
        _safeMint(_address, id);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not token owner or approved"
        );
        _safeTransfer(from, to, tokenId, data);
    }
}
