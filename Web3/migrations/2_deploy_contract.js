const YieldNftTokenLock = artifacts.require("YieldNftTokenLock");

module.exports = function (deployer) {
  deployer.deploy(YieldNftTokenLock);
};
