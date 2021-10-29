// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract NFT_Contract {
  uint256 public constant ARTWORK = 0;
  uint256 public constant PHOTO = 1;

  constructor() ERC1155("") {
    _mint(msg.sender, ARTWORK, 1, "");
    _mint(msg.sender, PHOTO, 2, "");
  }

  function mint(
    address account,
    uint256 id,
    uint256 amount
  ) public onlyOwner {
    _mint(account, id, amount, "");
  }

  function burn(
    address account,
    uint256 id,
    uint256 amount
  ) public {
    require(msg.sender == account);
    _burn(account, id, amount);
  }
}
