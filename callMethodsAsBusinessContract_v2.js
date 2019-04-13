const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
const leftPad = require('left-pad')

const ProxyContract = artifacts.require("ProxyContract");
const BusinessContract_v2 = artifacts.require("BusinessContract_v2");
const BusinessInterface_v2 = artifacts.require("BusinessInterface_v2");

module.exports = async () => {
  await web3.eth.getAccounts(async (error, accounts) => {

    try {
      // Contract取得
      var proxy_contract = await ProxyContract.deployed();
      var business_contract_v2 = await BusinessContract_v2.deployed();
      await proxy_contract.setBusinessContract(business_contract_v2.address);
      proxy_contract = await BusinessInterface_v2.at(proxy_contract.address);

      // account[5]～account[9]のPersonデータを追加
      for(var i = accounts.length / 2; i < accounts.length; i++){
        tx = await proxy_contract.addPerson_v2(`person${i}`, 170 + i, 65 + i, 20 + i, {from : accounts[i]})
      }

      // 全accountのデータ確認
      for(var i = 0; i < accounts.length; i++){
        proxy_contract.getPerson_v2({from : accounts[i]})
          .then((result) => {
            console.log(`${result._name}, ${Number(result._height)}, ${Number(result._weight)}, ${Number(result._age)}`);
          });
      }

      return;

    } catch(error) {
      console.log(error)
    }

  })
}

