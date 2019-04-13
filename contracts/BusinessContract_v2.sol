pragma solidity ^0.5.0;

contract BusinessContract_v2 {
  // プロキシコントラクトの変数のslot割り当て
  address impl;

  struct Person {
    string name;
    uint256 height;
    uint256 weight;
    uint256 age;
  }

  mapping (address => Person) persons;

  constructor() public {
  }

  function addPerson_v2(string calldata _name, uint256 _height, uint256 _weight, uint256 _age) external {
    persons[msg.sender] = Person(_name, _height, _weight, _age);
  }

  function getPerson_v2() external view returns (string memory _name, uint256 _height, uint256 _weight, uint256 _age) {
    return (
      persons[msg.sender].name,
      persons[msg.sender].height,
      persons[msg.sender].weight,
      persons[msg.sender].age
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
