const ProxyContract = artifacts.require("ProxyContract");
const BusinessContract = artifacts.require("BusinessContract");
const BusinessContract_v2 = artifacts.require("BusinessContract_v2");

module.exports = function(deployer) {
  deployer.deploy(ProxyContract);
  deployer.deploy(BusinessContract);
  deployer.deploy(BusinessContract_v2);
};
