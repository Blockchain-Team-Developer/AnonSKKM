require('dotenv').config();
const DEV_API_URL = process.env.DEV_API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(DEV_API_URL);

const contract = require("../src/artifacts/contracts/SKKMNFT.sol/SKKMNFT.json");
const contractAddress = "0xD19Dd20c98Ffa5466e3a0B48d07b1784d4fE0a69";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function addContractCaller(SKKMServiceAddress) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce
  
    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.addContractCaller(SKKMServiceAddress).encodeABI(),
    }
  
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .catch((err) => {
        console.log("Promise failed:", err)
      })
  }

addContractCaller("0xCC8048eF226eb2383B08949F752Cf31932d487cc")
