const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
const leftPad = require('left-pad')

const ProxyContract = artifacts.require("ProxyContract");
const BusinessContract = artifacts.require("BusinessContract");
const BusinessContract2 = artifacts.require("BusinessContract2");
const BusinessInterface = artifacts.require("BusinessInterface");
const BusinessInterface2 = artifacts.require("BusinessInterface2");

contract('ProxyContract', function(accounts) {
/*
  it("test delegatecall BusinessContract", async function() {
    var proxy_contract = await ProxyContract.deployed();
    var business_contract = await BusinessContract.deployed();
    await proxy_contract.setBusinessContract(business_contract.address);
    proxy_contract = await BusinessInterface.at(proxy_contract.address)

    //await proxy_contract.delegateCallBusiness("setCount(uint256)", arg);
    await proxy_contract.setCount(11);

    //let count_proxy_contract = await proxy_contract.delegateCallBusiness.call("getCount()", []);
    let count_proxy_contract = await proxy_contract.getCount();
    assert.equal(count_proxy_contract, 11, "ProxyContractのデータエラー")

    // ビジネスコントラクトに影響なし
    let count_business_contract = await business_contract.getCount();
    assert.equal(count_business_contract, 2, "BusinessContractのデータエラー")
    
  });

  it("test delegatecall BusinessContract2", async function() {
    var proxy_contract = await ProxyContract.deployed();
    var business_contract = await BusinessContract2.deployed();
    await proxy_contract.setBusinessContract(business_contract.address);
    proxy_contract = await BusinessInterface2.at(proxy_contract.address)

    //await proxy_contract.delegateCallBusiness("setPoint(uint256,uint256)", [0,100]);
    await proxy_contract.setPoint(0,100);

    //let count_proxy_contract = await proxy_contract.delegateCallBusiness.call("getPoint(uint256)", [0]);
    let count_proxy_contract = await proxy_contract.getPoint(0);
    assert.equal(count_proxy_contract, 100, "ProxyContractのデータエラー")

    // ビジネスコントラクトに影響なし
    let count_business_contract = await business_contract.getPoint(0);
    assert.equal(count_business_contract, 12345, "BusinessContract2のデータエラー")

  });

  it("test delegatecall BusinessContract2", async function() {
    var proxy_contract = await ProxyContract.deployed();
    var business_contract = await BusinessContract2.deployed();
    await proxy_contract.setBusinessContract(business_contract.address);
    proxy_contract = await BusinessInterface2.at(proxy_contract.address)

    //await proxy_contract.delegateCallBusiness("addVariable(uint256,string)", [100, "message"]);
    await proxy_contract.addVariable(100,"this is correct message.");

    //let count_proxy_contract = await proxy_contract.delegateCallBusiness.call("getVariable(uint256)", [0]);
    let data_proxy_contract = await proxy_contract.getVariable(0);
    assert.equal(data_proxy_contract['0'],100, "ProxyContractのデータエラー")
    assert.equal(data_proxy_contract['1'],"this is correct message.", "ProxyContractのデータエラー")

    // ビジネスコントラクトに影響なし
    let data_business_contract = await business_contract.getVariable(0);
    assert.equal(data_business_contract['0'],1, "BusinessContractのデータエラー")
    assert.equal(data_business_contract['1'],"message", "BusinessContractのデータエラー")

  });

  it("test upgrade BusinessContract", async function() {
    // ver1でデプロイ
    var proxy_contract = await ProxyContract.deployed();
    var business_contract = await BusinessContract.deployed();
    await proxy_contract.setBusinessContract(business_contract.address);
    proxy_contract = await BusinessInterface.at(proxy_contract.address)

    // ver1のメソッドテスト
    await proxy_contract.setCount(10000);

    let count_proxy_contract = await proxy_contract.getCount();
    assert.equal(count_proxy_contract, 10000, "ProxyContractのデータエラー")

    // ver2にアップグレード
    var business_contract2 = await BusinessContract2.deployed();
    await proxy_contract.setBusinessContract(business_contract2.address);
    proxy_contract = await BusinessInterface2.at(proxy_contract.address)

    // ver2のメソッドテスト
    await proxy_contract.setPoint(0,9999);
    await proxy_contract.addVariable(9999,"test upgrade BusinessContract.");

    let point_proxy_contract = await proxy_contract.getPoint(0);
    assert.equal(point_proxy_contract, 9999, "ProxyContractのデータエラー")

    let data_proxy_contract = await proxy_contract.getVariable(0);
    assert.equal(data_proxy_contract['0'],9999, "ProxyContractのvariableエラー")
    assert.equal(data_proxy_contract['1'],"test upgrade BusinessContract.", "BusinessContractのデータエラー")

    // ver1のデータはアップグレード後に引き継がれていることを確認
    let count_proxy_contract_ver2 = await proxy_contract.getCount();
    assert.equal(count_proxy_contract_ver2, 10000, "ProxyContractのデータエラー")
  });
*/

  it("test delegatecall BusinessContract", async function() {
    var proxy_contract = await ProxyContract.deployed();
    var business_contract = await BusinessContract.deployed();
    await proxy_contract.setBusinessContract(business_contract.address);
    proxy_contract = await BusinessInterface.at(proxy_contract.address);

    const standardizeInput = input =>
      leftPad(web3.utils.toHex(input).replace('0x', ''), 64, '0')

    let slot_0_data = await proxy_contract.get(web3.utils.numberToHex(0));
    let slot_1_data = await proxy_contract.get("0x" + standardizeInput(1));
    let slot_2_data = await proxy_contract.get("0x" + standardizeInput(2));
    let slot_3_data = await proxy_contract.get("0x" + standardizeInput(3));

    assert.equal(slot_0_data.toString(16), business_contract.address.slice(2).toLowerCase(), "slot 0 error");
    assert.equal(slot_1_data, 1, "slot 1 error");
    // mappingはslotの位置が異なる
    assert.equal(slot_2_data, 0, "slot 2 error");
    assert.equal(slot_3_data, 2, "slot 3 error");

    // slot2のmapping
    let slot_2_struct_1 = await proxy_contract.mapLocation(2, 0, 0);
    let slot_2_struct_2 = await proxy_contract.mapLocation(2, 0, 1);
    let slot_2_struct_1_data = await proxy_contract.get(web3.utils.numberToHex(slot_2_struct_1));
    let slot_2_struct_2_data = await proxy_contract.get(web3.utils.numberToHex(slot_2_struct_2));

    assert.equal(slot_2_struct_1_data, 20, "slot_2_struct_1 error");
    assert.equal(slot_2_struct_2_data, 30, "slot_2_struct_1 error");
  })
});
