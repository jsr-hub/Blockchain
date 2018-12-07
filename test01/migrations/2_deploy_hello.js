const hello = artifacts.require('./HelloWorld');

const helloSettings = {
    name: "Shrey"
}

module.exports = function(deployer){
    deployer.deploy(hello,helloSettings.name);
};