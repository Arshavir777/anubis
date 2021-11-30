const {ethers} = require("hardhat");

async function main() {
  const Anubis = await ethers.getContractFactory("Anubis");
  const anubis = await Anubis.deploy();
  console.log("Anubis deployed to:", anubis.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
