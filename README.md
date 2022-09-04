# Ethers.js by Example
Learn to use **ethers.js** from examples

## Setting Up
### 1. Clone/Download the Repository


### 2. Create a <code>.env</code> file
1. Sign-up for a node provider (like [Infura](https://infura.io "Infura")) to get your <code>API_KEY</code>
2. Set up a burner wallet to get your <code>WALLET_ADDRESS</code> and <code>PRIVATE_KEY</code>
```
API_KEY = "API key"
WALLET_ADDRESS = "address of burner wallet"
PRIVATE_KEY = "private key of burner wallet"
```

### 3. Install Dependencies
```
$ npm install
```

## Running Ethers.js scripts
1. Get Goerli test ETH from [Ethereum Faucet](https://goerlifaucet.com "Ethereum Faucet")
2. Get Goerli test LINK tokens from [Chainlink Faucet](https://faucets.chain.link/goerli "Chainlink Faucet")
3. Run any script by typing <code>node [script_name]</code> in the terminal. For example, running <code>1_account_balance.js</code>would be
```
$ node 1_account_balance.js
```