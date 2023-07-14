const NFTYToken = artifacts.require("NFTYToken");

module.exports = function (deployer) {
  deployer.deploy(NFTYToken);
};
