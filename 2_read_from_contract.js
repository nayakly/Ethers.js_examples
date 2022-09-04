const { ethers } = require("ethers");
require("dotenv").config(); // to import environment variables

// Read-only Access - Ethereum Mainnet
provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.API_KEY}`
);

// Read via functions from the DAI Smart Contract
const contractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI Contract
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
]; // Add only functions that we'll be using

const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider); //initialize contract

const readFromContract = async () => {
  // contract.funcName(args) -> To read from a function in a smart contract

  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const balanceOf = await contract.balanceOf("vitalik.eth");

  console.log(`${name} (${symbol}) has a total supply of ${totalSupply}.
The balance of vitalik.eth is ${ethers.utils.formatEther(balanceOf)}`);

  // ethers.utils.formatEther() -> Used to convert from wei (default) to ether. Applies to tokens as well
};

readFromContract();
