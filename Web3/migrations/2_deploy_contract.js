const YeildNftTokenLock = artifacts.require("YeildNftTokenLock");

module.exports = function (deployer) {
  deployer.deploy(YeildNftTokenLock);
};
