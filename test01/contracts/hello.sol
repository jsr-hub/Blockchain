pragma solidity ^0.4.24;

contract HelloWorld {
string private name;

constructor(string _name) public {
    name=_name;
}
    function getName() public view returns (string) {
        return name;
    }
    function setName(string _name) public {
        name=_name;
    }
}