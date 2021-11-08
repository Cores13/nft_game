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
    string bgHue;
    // string circleHue;
    bytes memory imageData;
    string textHue;
    string value;
    uint256 stamina;
    uint256 strength;
  }

  mapping(uint256 => Word) public Vocabulary;

  // public
  function mint(bytes memory _image) public payable {
    uint256 supply = totalSupply();
    require(!paused);
    require(supply + 1 <= 10000);

    Word memory newWord = Word(
      string(abi.encodePacked("OCN #", uint256(supply + 1).toString())),
      "This is on chain test NFT",
      randomNum(361, block.difficulty, supply).toString(),
      randomNum(361, block.timestamp, block.difficulty).toString(),
      _image,
      words[randomNum(words.length, block.timestamp, supply)],
      randomNum(1000, block.timestamp, block.difficulty),
      randomNum(1000, block.timestamp, supply),
    );
      // randomNum(361, block.timestamp, supply).toString(),

    if (msg.sender != owner()) {
      require(msg.value >= 5000000000000000 wei);
    }

    Vocabulary[supply + 1] = newWord;

    _safeMint(msg.sender, supply + 1);
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

  function buildImage(uint256 _tokenId) public view returns (string memory) {
    Word memory currentWord = Vocabulary[_tokenId];
    return
      Base64.encode(
        bytes(
          abi.encodePacked(
            '<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">',
            "<g>",
            '<rect stroke="#000" height="603.00002" width="799" y="0" x="0.00001" fill="hsl(',
            currentWord.bgHue,
            ', 64%, 29%)"/>>',
            
            // '<path d="m394.5,531c-126.24309,0 -228.5,-100.91436 -228.5,-225.5c0,-124.58564 102.25691,-225.5 228.5,-225.5c126.24309,0 228.5,100.91436 228.5,225.5c0,124.58564 -102.25691,225.5 -228.5,225.5z" opacity="undefined" stroke="#000" fill="hsl(',
            // currentWord.circleHue,
            // ', 64%, 29%)"/>',
            '<text dominant-baseline="middle" stroke="#000" text-anchor="middle" font-size="24" stroke-width="0" y="50%" x="50%" fill="hsl(',
            currentWord.textHue,
            ', 58%, 69%)">',
            currentWord.value,
            "</text>",
            "</g>",
            "</svg>"
          )
        )
      );
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
                '", "attributes": [',
                "{",
                '"trait_type": ',
                '"Stamina",',
                '"value": ',
                currentWord.stamina,
                "},",
                "{",
                '"trait_type": ',
                '"Strength",',
                '"value": ',
                currentWord.strength,
                "}",
                "]",
                "}"
              )
            )
          )
        )
      );
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
}
