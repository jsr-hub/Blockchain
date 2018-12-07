const hello = artifacts.require('./Mycontract');

const helloSettings = {
    counter: 0
}

module.exports = function(deployer){
    deployer.deploy(hello,helloSettings.counter);
};