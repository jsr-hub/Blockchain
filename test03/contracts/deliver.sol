pragma solidity ^0.4.2;

contract Deliver {

    struct Product{

        uint pid;
        string name;
        uint quantity;
    }
    
    mapping(address => bool) public senders;

    mapping(uint => Product) public products;

    uint public productsCount;

    function Deliver () public {
        addProduct("Product 1");
    }


    function addProduct (string _name) private {
        productsCount ++;
        products[productsCount] = Product(productsCount, _name, 5);
    }

    function send (uint _productId) public {
 
       senders[msg.sender] = true;
       products[_productId].quantity ++;
    }
}