pragma solidity ^0.4.1;

contract Mycontract {
    uint256 counter;
    function add() public {
        counter++;
    }
    function subtract() public {
        counter--;
    }
    function getcounter() public constant returns(uint256) {
        return counter;
    }
}