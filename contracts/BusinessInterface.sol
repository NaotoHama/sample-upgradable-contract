pragma solidity ^0.5.0;
import './ProxyInterface.sol';

contract BusinessInterface is ProxyInterface {
  function addPerson(string calldata _name, uint256 _height, uint256 _weight) external;
  function getPerson() external view returns (string memory _name, uint256 _height, uint256 _weight);
  function getSlotData(bytes32 slot_id) public view returns (uint256);
  function mapLocation(uint256 slot, uint256 key, uint256 offset) public pure returns (uint256);
  function kill() public;
}
