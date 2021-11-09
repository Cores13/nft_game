// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Base64.sol";

contract NFT is ERC721Enumerable, Ownable {
  using Strings for uint256;

  bool public paused = false;
  bool public revealed = false;
  string public notRevealedUri;
  string[] public words = ["improvise", "adapt", "overcome", "fight"];

  constructor(string memory _initNotRevealedUri)
    ERC721("NFTs v Traits", "NFWT")
  {
    setNotRevealedURI(_initNotRevealedUri);
  }

  struct Word {
    string name;
    string description;
    string value;
    uint256 number;
    string image;
    uint256 flips;
    string nation;
  }

  mapping(uint256 => Word) public Vocabulary;

  // public
  function mint(string memory _nation, string memory _image) public payable {
    uint256 supply = totalSupply();
    require(!paused);
    require(supply + 1 <= 4000); // Total coins

    Word memory newWord = Word(
      string(abi.encodePacked("OCN #", uint256(supply + 1).toString())),
      "This is on chain test NFT",
      words[randomNum(words.length, block.timestamp, supply)],
      supply + 1,
      _image,
      0,
      _nation
    );

    if (msg.sender != owner()) {
      require(msg.value >= 5000000000000000 wei); // 0.005 eth
    }

    Vocabulary[supply + 1] = newWord;

    _safeMint(msg.sender, supply + 1);
  }

  function flip(uint256 _tokenId) public payable returns (uint8) {
    require(msg.sender == ownerOf(_tokenId));
    uint8 side = uint8(
      randomNum(
        2,
        randomNum(block.timestamp, block.difficulty, block.timestamp),
        randomNum(block.timestamp, block.difficulty, block.timestamp)
      )
    );
    Vocabulary[_tokenId].flips += 1;
    return side;
  }

  function randomNum(
    uint256 _mod,
    uint256 _seed,
    uint256 _salt
  ) public view returns (uint256) {
    uint256 num = uint256(
      keccak256(abi.encodePacked(block.timestamp, msg.sender, _seed, _salt))
    ) % _mod;
    return num;
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  //only owner
  function reveal() public onlyOwner {
    revealed = true;
  }

  function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }

  function withdraw() public payable onlyOwner {
    // This will payout the owner 95% of the contract balance.
    // Do not remove this otherwise you will not be able to withdraw the funds.
    // =============================================================================
    (bool os, ) = payable(owner()).call{ value: address(this).balance }("");
    require(os);
    // =============================================================================
  }

  function buildImage(uint256 _tokenId) public view returns (string memory) {
    Word memory currentWord = Vocabulary[_tokenId];
    return Base64.encode(bytes(currentWord.image));
  }

  function tokenURI(uint256 _tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(_tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    Word memory currentWord = Vocabulary[_tokenId];

    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              abi.encodePacked(
                "{",
                '"name": "',
                currentWord.name,
                '", "description": "',
                currentWord.description,
                '", "image": "',
                "data:image/svg+xml;base64,",
                buildImage(_tokenId),
                '",',
                '"attributes": [',
                "{"
                '"trait_type": ',
                '"Nation",',
                '"value": "',
                currentWord.nation,
                '"}',
                "]",
                "}"
              )
            )
          )
        )
      );
  }
}
