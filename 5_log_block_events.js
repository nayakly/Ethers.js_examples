const { ethers } = require("ethers");
require("dotenv").config(); // to import environment variables

// Read-only Access - Ethereum Mainnet
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.API_KEY}`
);

// Log block events
const getBlockEvents = async () => {

    const block = await provider.getBlockNumber()
    console.log(`Block Number: ${block}`)

    const blockInfo = await provider.getBlock(block)
    console.log(blockInfo)

    const {transactions} = await provider.getBlockWithTransactions(block)
    console.log(`Logging first transaction in block:`)
    console.log(transactions[0])
}

getBlockEvents()


