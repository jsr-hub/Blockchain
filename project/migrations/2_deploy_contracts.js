var hodor= artifacts.require('./hodor.sol');
const con={
    greet:"Sanjay_Raju"
}
module.exports=function(deployer){
    deployer.deploy(hodor,con.greet); 
};