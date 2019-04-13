pragma solidity ^0.5.0;
import './BusinessInterface.sol';

contract BusinessInterface_v2 is ProxyInterface {
  function addPerson_v2(string calldata _name, uint256 _height, uint256 _weight, uint256 _age) external;
  function getPerson_v2() external view returns (string memory _name, uint256 _height, uint256 _weight, uint256 _age);
  function getSlotData(bytes32 slot_id) public view returns (uint256);
  function mapLocation(uint256 slot, uint256 key, uint256 offset) public pure returns (uint256);
  function kill() public;
}
