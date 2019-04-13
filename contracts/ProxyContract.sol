pragma solidity ^0.5.0;
import './BusinessContract.sol';

contract ProxyContract {
  // ビジネスコントラクトのアドレス
  address impl;

  constructor() public {
  }

  function setBusinessContract(address _address) public {
    impl = _address;
  }

  function () payable  external {
    require(msg.sig != 0x0);
    address _impl = impl;
    assembly {
      let ptr := mload(0x40)
      calldatacopy(ptr, 0, calldatasize)
      let result := delegatecall(gas, _impl, ptr, calldatasize, ptr, 0)
      let size := returndatasize
      returndatacopy(ptr, 0, size)
      switch result
      case 0 { revert(ptr, size) }
      default { return(ptr, size) }
    }
  }
}