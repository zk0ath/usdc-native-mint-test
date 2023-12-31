// 1. The script imports the Web3 library.
const {Web3} = require('web3');

// 2. Input the INFURA endpoint. 
const infuraEndpoint = 'https://goerli.infura.io/v3/4c37e93cc84e40da842023ea58ad6003'; //Insert the INFURA Network Endpoint

// 3. The script initializes the web3 instance using the INFURA endpoint
const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));

// 4. Input USDC token contract for Ethereum.
const tokenAddress = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F';  //USDC TokenAddress

// 5. The script invokes the ABI (Application Binary Interface). This is a representation of the smart contract's functions and how to call them.
const minTokenAbi = [{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}]

// 6. The script uses the ABI and the token address to create a new contract instance. 
const contract = new web3.eth.Contract(minTokenAbi, tokenAddress)

// 7. Input the addresses and the private key; specify number of tokens to send
const fromAddress = '0xd81419502DdB10adBe25542EfDA48ABB55979eF4' // Input the origin wallet address
const toAddress = '0x295dbF0cE64d5f5A2eB58e0a041479214A8DB28A' // Input the destination wallet address
const privatekey = '5572a3cf339013dd86f7b8d5053bc5ec0726ad8646e95b547fd8cc9b9a51a956' // Input the private key of the sender's wallet, required to sign the transaction

const amount = 20.00; // Specify the number of USDC tokens to send

async function main() {
// 8. The script checks how many decimals the USDC token uses which is usually 6.
    const decimals = await contract.methods.decimals().call()

// 9. The script checks the balance of the sender's address.
    const balance = await contract.methods.balanceOf(fromAddress).call()

// 10. The script calculates the actual amount in the smallest unit (10 USDC would be 10000000 in its smallest unit).
    

// 11. The script encodes the transfer function call for the USDC contract.
    let data = contract.methods.transfer(toAddress, value).encodeABI()

// 12. The script creates the transaction object.
    const transaction = {
        'to': tokenAddress,
        'gas': Web3.utils.toHex(100000),
        'data': data
    };

// 13. The script signs the transaction with the sender's private key.
    const signedTx = await web3.eth.accounts.signTransaction(transaction, privatekey)

// 14. The script broadcasts the signed transaction to the Ethereum network.
    return web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
        if (!error) {
            console.log("Tx Hash: ", hash);
        } else {
            console.log("Error sending Tx:", error)
        }
    });

}

// 15. The script calls the main function and prints the receipt once it's done.
main().then(receipt => console.log("Tx Receipt:", receipt))
