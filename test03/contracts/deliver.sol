pragma solidity ^0.4.2;

contract Deliver {

    struct Product{
        uint sid;
        uint rid;
        string name;
        uint quantity;
    }

    mapping(uint => Product) public products;

    uint public productsCount;

    function Deliver () public {
        addProduct("Product 1");
        //addProduct("Product 2");
    }


    function addProduct (string _name) private {
        productsCount ++;
        products[productsCount] = Product(productsCount,productsCount+1, _name, 5);
    }
}