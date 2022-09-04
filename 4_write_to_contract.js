const { ethers } = require("ethers");
require("dotenv").config(); // to import environment variables

// Write Access - Ethereum Goerli Testnet
const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/${process.env.API_KEY}`
);

// Write via functions to the Chainlink Smart Contract (on Goerli Testnet)
const sender = process.env.WALLET_ADDRESS; // test wallet
const receiver = "0x4281ecf07378ee595c564a59048801330f3084ee"; // chainlink faucet
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // connect wallet

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
]; // Add only functions that we'll be using
const contractAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; //Chainlink Contract
const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider); //initialize contract

// Sign Transaction to send tokens via code on Goerli Testnet
const WriteToContract = async () => {
  //Sender's and receiver's balance before transfer
  const senderBalanceBefore = await contract.balanceOf(sender);
  const receiverBalanceBefore = await contract.balanceOf(receiver);

  //connect wallet to contract
  const contractToWallet = contract.connect(wallet);

  // Use the transfer function of the smart contract to send LINK from sender to receiver
  const txn = await contractToWallet.transfer(
    receiver,
    ethers.utils.parseEther("0.5")
  );

  //wait for transaction to be mined
  await txn.wait();

  //log details of transaction
  console.log("Transaction complete", txn);

  //Sender's and receiver's balance after transfer
  const senderBalanceAfter = await contract.balanceOf(sender);
  const receiverBalanceAfter = await contract.balanceOf(receiver);

  //Show sender's and receiver's balance before/after transfer

  console.log(
    `Sender balance before/after txn: ${ethers.utils.formatEther(
      senderBalanceBefore
    )} -> ${ethers.utils.formatEther(senderBalanceAfter)} (${
      ethers.utils.formatEther(senderBalanceAfter) -
      ethers.utils.formatEther(senderBalanceBefore)
    } LINK)`
  );

  console.log(
    `Faucet balance before/after txn (incl. other txns made during this time): ${ethers.utils.formatEther(
      receiverBalanceBefore
    )} -> ${ethers.utils.formatEther(receiverBalanceAfter)} (${
      ethers.utils.formatEther(receiverBalanceAfter) -
      ethers.utils.formatEther(receiverBalanceBefore)
    } LINK)`
  );
};

WriteToContract();
