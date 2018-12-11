var Deliver = artifacts.require("./Deliver.sol");

contract("Deliver", function(accounts) {
    var DeliveryInstance;

    it("initializes with one product", function() {
        return Deliver.deployed().then(function(instance) {
            return instance.productsCount();
        }).then(function(count) {
            assert.equal(count, 1);
        });
    });

    it("it initializes the products with the correct values", function() {
        return Deliver.deployed().then(function(instance) {
            DeliveryInstance = instance;
            return DeliveryInstance.products(1);
        }).then(function(product) {
            assert.equal(product[0], 1, "contains the correct sid");
            assert.equal(product[1], 2, "contains the correct rid");
            assert.equal(product[2], "Product 1", "contains the correct name");
            assert.equal(product[3], 5, "contains the correct quantity");
            return DeliveryInstance.products(2);
        });
    });
});
