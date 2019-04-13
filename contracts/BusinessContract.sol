pragma solidity ^0.5.0;

contract BusinessContract {
  // プロキシコントラクトの変数のslot割り当て
  address impl;

  struct Person {
    string name;
    uint256 height;
    uint256 weight;
  }

  mapping (address => Person) persons;

  constructor() public {
  }

  function addPerson(string calldata _name, uint256 _height, uint256 _weight) external {
    persons[msg.sender] = Person(_name, _height, _weight);
  }

  function getPerson() external view returns (string memory _name, uint256 _height, uint256 _weight) {
    return (
      persons[msg.sender].name,
      persons[msg.sender].height,
      persons[msg.sender].weight
    );
  }

  function getSlotData(bytes32 slot_id) public view returns (uint256){
    uint r;
    assembly {
      r := sload(slot_id) //we load the slot number i
    }
    return uint(r);
  }

  function mapLocation(uint256 slot, uint256 key, uint256 offset) public pure returns (uint256) {
    return uint256(keccak256(abi.encodePacked(key, slot))) + offset;
  }

  function kill() public {
    selfdestruct(msg.sender);
  }
}