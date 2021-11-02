const Token = artifacts.require("NFT");
const nft1 = require("../contracts/000000000000000000000000000000000000000000000000.json");
const nft2 = require("../contracts/000000000000000000000000000000000000000000000001.json");

module.exports = async function (deployer) {
  await deployer.deploy(Token);
  let tokenInstance = await Token.deployed();
  // await tokenInstance.mint(
  //   "0x2df7317eA3001cF285d35092a2d9dC721da629dd",
  //   100,
  //   200,
  //   60000,
  //   nft1
  // );
  // await tokenInstance.mint(
  //   "0x2df7317eA3001cF285d35092a2d9dC721da629dd",
  //   200,
  //   100,
  //   30000,
  //   nft2
  // );
  // let pet = await tokenInstance.getTokenDetails(0);
  // let pet2 = await tokenInstance.getTokenDetails(1);
  // console.log(pet);
  // console.log(pet2);
};
