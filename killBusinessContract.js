const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));

const ProxyContract = artifacts.require("ProxyContract");
const BusinessContract = artifacts.require("BusinessContract");
const BusinessInterface = artifacts.require("BusinessInterface");

module.exports = async () => {
  await web3.eth.getAccounts(async (error, accounts) => {
    try {
      // Contract取得
      var proxy_contract = await ProxyContract.deployed();
      var business_contract = await BusinessContract.deployed();
      await proxy_contract.setBusinessContract(business_contract.address);
      proxy_contract = await BusinessInterface.at(proxy_contract.address);

      await business_contract.kill();

      return;
    } catch(error) {
      console.log(error)
    }
  })
}

