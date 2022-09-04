const { ethers } = require("ethers");
require("dotenv").config(); // to import environment variables

// Read-only Access - Ethereum Mainnet
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.API_KEY}`
);

// Get Account Balances
const getBalance = async () => {
  const balance = await provider.getBalance("vitalik.eth");
  console.log(
    "Balance of vitalik.eth is",
    ethers.utils.formatEther(balance),
    "ETH"
  );
};

getBalance();
