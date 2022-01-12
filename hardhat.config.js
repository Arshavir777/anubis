const { task } = require("hardhat/config");
const { ethToUsd } = require('./utils');
const { IPFS } = require('./utils/constants');

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (_, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task("info", "Get info", async (_, { ethers }) => {

  const bn = await ethers.provider.getBlockNumber();
  const network = await ethers.provider.getNetwork();
  const feeData = await ethers.provider.getFeeData();
  const balance = await ethers.provider.getBalance(process.env.PUBLIC_ADDRESS);
  const blockWithTx = await ethers.provider.getBlockWithTransactions(bn);

  console.log({
    currentBallance: ethers.utils.formatEther(balance),
    optimalGasPrice: ethers.utils.formatEther(feeData.gasPrice),
    blockWithTx,
    network
  });
});


task("ecd", "Estimate contract deployment", async (_, { ethers }) => {

  const Anubis = await ethers.getContractFactory("Anubis");
  const deploymentData = Anubis.interface.encodeDeploy();
  const gasToUse = await ethers.provider.estimateGas({ data: deploymentData });
  const eth = ethers.utils.formatEther(gasToUse);

  console.log({
    USD: ethToUsd(eth),
    ETH: eth,
  });
})

task("mint", "Estimate mint price", async (_, { ethers }) => {

  if (!process.env.CONTRACT_ADDRESS) {
    console.log('Please provide deployed contract address.');
    return;
  }

  // Get contract
  const anubis = await ethers.getContractAt(
    "Anubis",
    process.env.CONTRACT_ADDRESS
  );

  // Get existing transaction details
  // const txHash = '0xb8422af75ac710fc158bc3ece3ab6baafb1c0851196106aefd9eea9d8fcf2ecc'
  // const tx = await ethers.provider.getTransaction(txHash);

  // Mint
  const tx = await anubis.awardItem(
    "0x66898Cccb767824930a2594092d40A291e3f804f",
    IPFS
  );

  console.log({
    hash: tx.hash,
    gasPrice: ethers.utils.formatEther(tx.gasPrice) + ' ETH',
    gasLimit: tx.gasLimit.toString(),
    fee: ethers.utils.formatUnits(tx.gasPrice.mul(tx.gasLimit)) + ' ETH',
  });
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL, //Infura url with projectId
      accounts: [process.env.PRIVATE_KEY], // add the account that will deploy the contract (private key)
      // gasPrice: 300000
    },
  }
};
