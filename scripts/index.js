const { ethers } = require("hardhat");

const main = async () => {

    const provider = new ethers.providers.JsonRpcProvider();

    const bn = await provider.getBlockNumber()

    console.log({bn});
}

main();