
pragma solidity ^0.4.24;

contract hodor {
   
    address owner;
    string greet;
    

    constructor (string greeter) public
    { 
        greet=greeter;
        owner=msg.sender;
        
    }

    function greeting() public constant returns (string ) {
        return greet;
    }
    function setgreet(string check) public
    {
         greet=check;
    }
}
