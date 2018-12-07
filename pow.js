const SHA256 = require("crypto-js/sha256");  

class Block {
    constructor(timestamp, data, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = 0;
        this.hash = this.calculateHash();
        
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }

}
class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 6;
    }

    createGenesisBlock() {
        return new Block("2017-01-01" ,"Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){

       newBlock.previousHash = this.getLatestBlock().hash;
       newBlock.mineBlock(this.difficulty);
       //newBlock.hash = newBlock.calculateHash();
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

let shreycoin = new Blockchain();

console.log('Mining block 1......');
shreycoin.addBlock(new Block( "10/07/2018", { amount: 4}));

console.log('Mining block 2......');
shreycoin.addBlock(new Block( "12/07/2018", { amount: 12}));
