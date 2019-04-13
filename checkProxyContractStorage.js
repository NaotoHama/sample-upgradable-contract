const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
const leftPad = require('left-pad')

const ProxyContract = artifacts.require("ProxyContract");
const BusinessContract = artifacts.require("BusinessContract");
const BusinessInterface = artifacts.require("BusinessInterface");

const standardizeInput = input =>
  leftPad(web3.utils.toHex(input).replace('0x', ''), 64, '0')

module.exports = async () => {
  await web3.eth.getAccounts(async (error, accounts) => {

    try {
      // Contract取得
      var proxy_contract = await ProxyContract.deployed();
      var business_contract = await BusinessContract.deployed();
      await proxy_contract.setBusinessContract(business_contract.address);
      proxy_contract = await BusinessInterface.at(proxy_contract.address);

      // 各slotのデータ確認
      let slot0 = await proxy_contract.getSlotData("0x" + standardizeInput(0));
      console.log(`slot0 : ${web3.utils.numberToHex(slot0)}`)

      // slot1はmappingであるため、データはない
      let slot1 = await proxy_contract.getSlotData("0x" + standardizeInput(1));
      console.log(`slot1 : ${Number(slot1)}`)

      // slot1のmapping
      let slot1_account0_1stElement_location = await proxy_contract.mapLocation(1, accounts[0], 0);
      let slot1_account0_2ndElement_location = await proxy_contract.mapLocation(1, accounts[0], 1);
      let slot1_account0_3rdElement_location = await proxy_contract.mapLocation(1, accounts[0], 2);
      let slot1_account0_4thElement_location = await proxy_contract.mapLocation(1, accounts[0], 3);
      let slot1_account0_1stElement = await proxy_contract.getSlotData(web3.utils.numberToHex(slot1_account0_1stElement_location));
      let slot1_account0_2ndElement = await proxy_contract.getSlotData(web3.utils.numberToHex(slot1_account0_2ndElement_location));
      let slot1_account0_3rdElement = await proxy_contract.getSlotData(web3.utils.numberToHex(slot1_account0_3rdElement_location));
      let slot1_account0_4thElement = await proxy_contract.getSlotData(web3.utils.numberToHex(slot1_account0_4thElement_location));

      console.log(`slot1_account0_1stElement : ${web3.utils.hexToUtf8(web3.utils.numberToHex(slot1_account0_1stElement))}`)
      console.log(`slot1_account0_2ndElement : ${Number(slot1_account0_2ndElement)}`)
      console.log(`slot1_account0_3rdElement : ${Number(slot1_account0_3rdElement)}`)
      console.log(`slot1_account0_4thElement : ${Number(slot1_account0_4thElement)}`)

      return;
    } catch(error) {
      console.log(error)
    }
  })
}

