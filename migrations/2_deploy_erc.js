var TokenERC721 = artifacts.require("TokenERC721");

module.exports = function(deployer) {
  deployer.deploy(TokenERC721);
};
