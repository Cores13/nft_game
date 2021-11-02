// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract NFT_Contract is ERC1155, Ownable {
  uint256 nextId = 0;

  struct Pet {
    uint8 damage;
    uint8 magic;
    uint256 lastMeal;
    uint256 endurance;
  }

  mapping(uint256 => Pet) private _tokenDetails;

  uint256 public constant ARTWORK = 0;
  uint256 public constant PHOTO = 1;

  constructor() ERC1155("https://09eun5c5jf3x.usemoralis.com/{id}.json") {
    _mint(msg.sender, ARTWORK, 1, "");
    _mint(msg.sender, PHOTO, 2, "");
  }

  function getTokenDetails(uint256 tokenId) public view returns (Pet memory) {
    return _tokenDetails[tokenId];
  }

  function mint(
    address account,
    uint8 _damage,
    uint8 _magic,
    uint256 _endurance,
  ) public onlyOwner {
    _tokenDetails[nextId] = Pet(
      _damage,
      _magic,
      block.timestamp,
      _endurance,
      data
    );
    _mint(account, nextId, 1, '');
    nextId++;
  }

  function feed(uint256 tokenId) public {
    Pet storage pet = _tokenDetails[tokenId];
    require(block.timestamp < pet.lastMeal + pet.endurance);
    pet.lastMeal = block.timestamp;
  }

  function burn(
    address account,
    uint256 id,
    uint256 amount
  ) public {
    require(msg.sender == account);
    _burn(account, id, amount);
  }

  function _beforeTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data,
    uint256 tokenId
  ) internal virtual {
    Pet storage pet = _tokenDetails[tokenId];
    require(block.timestamp < pet.lastMeal + pet.endurance); // Pet is still alive
  }
}
