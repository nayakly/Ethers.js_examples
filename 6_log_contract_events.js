const { ethers } = require("ethers");
require("dotenv").config(); // to import environment variables

// Read-only Access - Ethereum Mainnet
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.API_KEY}`
);

// Log contract events from Uniswap Contract
//Note: Only functions with an event defined in the solidity contract code can be logged
const ERC20_ABI = [
  "event Transfer(address indexed from, address indexed to, uint amount)",
]; // Add only functions that we'll be using
const contractAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"; // Uniswap Contract
const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider); //initialize contract

const getContractEvents = async () => {
  const block = await provider.getBlockNumber();

  // Search for transfers of UNI tokens, filter by last 10 blocks
  const transferEvents = await contract.queryFilter(
    "Transfer",
    block - 10,
    block
  );
  console.log(
    "Transfer Events of UNI tokens in the last 10 blocks",
    transferEvents
  );
};

getContractEvents();
