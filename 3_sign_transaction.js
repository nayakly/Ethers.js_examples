const { ethers } = require("ethers");
require("dotenv").config(); // to import environment variables

// Write Access - Ethereum Goerli Testnet
const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/${process.env.API_KEY}`
);

// Sign Transaction to send ether via code (on Goerli Testnet)
const sender = process.env.WALLET_ADDRESS; // test wallet
const receiver = "0xedaf4083f29753753d0cd6c3c50aceb08c87b5bd"; // alchemy faucet
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // connect wallet

const signTxn = async () => {
  //Sender's and receiver's balance before transfer
  const senderBalanceBefore = await provider.getBalance(sender);
  const receiverBalanceBefore = await provider.getBalance(receiver);

  // Sign transaction to send ether from sender to receiver
  const txn = await wallet.sendTransaction({
    to: receiver,
    value: ethers.utils.parseEther("0.001"),
  });
  // ethers.utils.parseEther() -> converts ether to wei (because function takes in wei)

  //wait for transaction to be mined
  await txn.wait();

  //log details of transaction
  console.log("Txn complete", txn);

  //Sender's and receiver's balance after transfer
  const senderBalanceAfter = await provider.getBalance(sender);
  const receiverBalanceAfter = await provider.getBalance(receiver);

  //Show sender's and receiver's balance before/after transfer

  console.log(
    `Sender balance before/after txn (incl. gas): ${ethers.utils.formatEther(
      senderBalanceBefore
    )} -> ${ethers.utils.formatEther(senderBalanceAfter)} (${
      ethers.utils.formatEther(senderBalanceAfter) -
      ethers.utils.formatEther(senderBalanceBefore)
    } ETH)`
  );

  console.log(
    `Faucet balance before/after txn (incl. other txns made during this time): ${ethers.utils.formatEther(
      receiverBalanceBefore
    )} -> ${ethers.utils.formatEther(receiverBalanceAfter)} (${
      ethers.utils.formatEther(receiverBalanceAfter) -
      ethers.utils.formatEther(receiverBalanceBefore)
    } ETH)`
  );
};

signTxn();
