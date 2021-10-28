// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract NFT_Token is ERC721, Ownable {
  uint256 nextId = 0;

  struct Pet {
    uint8 damage;
    uint8 magic;
    uint256 lastMeal;
    uint256 endurance;
  }

  mapping(uint256 => Pet) private _tokenDetails;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

  function getTokenDetails(uint256 tokenId) public view returns (Pet memory) {
    return _tokenDetails[tokenId];
  }

  function mint(
    uint8 _damage,
    uint8 _magic,
    uint256 _endurance
  ) public onlyOwner {
    _tokenDetails[nextId] = Pet(_damage, _magic, block.timestamp, _endurance);
    _safeMint(msg.sender, nextId);
    nextId++;
  }

  function feed(uint256 tokenId) public {
    Pet storage pet = _tokenDetails[tokenId];
    require(block.timestamp < pet.lastMeal + pet.endurance);
    pet.lastMeal = block.timestamp;
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override {
    Pet storage pet = _tokenDetails[tokenId];
    require(block.timestamp < pet.lastMeal + pet.endurance); // Pet is still alive
  }
}
