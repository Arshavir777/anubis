const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Anubis", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Anubis = await ethers.getContractFactory("Anubis");
    const anubis = await Anubis.deploy();

    await anubis.awardItem(
      "0x2546bcd3c84621e976d8185a91a922ae77ecec30",
      "http://google.com"
    );

    const owner = await anubis.ownerOf(1);

    const balance = await anubis.balanceOf(owner);

    const tokenURI = await anubis.tokenURI(1);

    console.log({
      owner,
      balance,
      tokenURI
    });

    await anubis.deployed();
  });
});
