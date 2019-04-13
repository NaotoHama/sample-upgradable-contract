const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
const leftPad = require('left-pad')

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

      // account[0]～account[4]のPersonデータを追加
      for(var i = 0; i < accounts.length / 2; i++){
        await proxy_contract.addPerson(`person${i}`, 170 + i, 65 + i, {from : accounts[i]})
      }

      // 全accountのデータ確認
      for(var i = 0; i < accounts.length; i++){
        proxy_contract.getPerson({from : accounts[i]})
          .then((result) => {
            console.log(`${result._name}, ${Number(result._height)}, ${Number(result._weight)}`);
          });
      }

      return;
    } catch(error) {
      console.log(error)
    }
  })
}

