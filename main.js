const SHA256 = require("crypto-js/sha256");  

class Block {
    constructor(timestamp, name , m1 , m2 , m3 , endorse ,previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.name = name;
        this.m1 = m1;
        this.m2 = m2;
        this.m3 = m3;
        this.endorse=endorse;
        this.hash = this.calculateHash();
        
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.m1) + JSON.stringify(this.m2) + JSON.stringify(this.m3)).toString();
    }

}
class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block("2017-01-01" ,"Genesis Block", "0" , "0" , "0" , "0" ,"0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){

       newBlock.previousHash = this.getLatestBlock().hash;
       newBlock.hash = newBlock.calculateHash();
       this.chain.push(newBlock);

    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }

}

let chain1 = new Blockchain();
 //shreycoin.addBlock(new Block( "12/07/2018", { amount: 12}));

var readline = require('readline-sync');

var n = readline.question("Enter the number of students :");
for(let i=0; i<n; i++)
{
    var name1 = readline.question("Enter the name of student :");
    var mark1 = readline.question("Enter the mark 1 :");
    var mark2 = readline.question("Enter the mark 2 :");
    var mark3 = readline.question("Enter the mark 3 :");
    var y = readline.question("Do you want to endorse this student ?");
    chain1.addBlock(new Block( "10/07/2018", name1 , mark1 , mark2 , mark3 , y));
     

}
var n1 = readline.question("Enter the student name to be found:");
//console.log(chain1.chain[2].name);
for(let i=1; i<n; i++)
{
    if(chain1.chain[i].name === n1)
    {
        console.log('Found');
        if(chain1.chain[i].endorse === "1")
        {
            console.log(chain1.chain[i].m1);
            console.log(chain1.chain[i].m2);
            console.log(chain1.chain[i].m3);
        }
        else
        {
            console.log('Not endorsed');
        }
    }
}
//console.log('Is blockchain valid? ' + shreycoin.isChainValid());
//console.log(JSON.stringify(chain1, null, 4)); 