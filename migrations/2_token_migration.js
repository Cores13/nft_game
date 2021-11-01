const Token = artifacts.require("NFT_Contract");

module.exports = async function (deployer) {
  await deployer.deploy(Token, "Catcher", "CTCH");
  let tokenInstance = await Token.deployed();
  await tokenInstance.mint(100, 200, 60000);
  await tokenInstance.mint(200, 100, 30000);
  let pet = await tokenInstance.getTokenDetails(0);
  let pet2 = await tokenInstance.getTokenDetails(1);
  console.log(pet);
  console.log(pet2);
};
