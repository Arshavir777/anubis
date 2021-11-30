const { ethers } = require("hardhat");

(async () => {
  const anubis = await ethers.getContractAt(
    "Anubis",
    "0x4f6d71ca662aCf1633Be311Df8f4f262a571aff4"
  );

  await anubis.awardItem(
    "0x66898Cccb767824930a2594092d40A291e3f804f",
    "http://google.com"
  );

  const owner = await anubis.ownerOf(1);

  const balance = await anubis.balanceOf(owner);

  const tokenURI = await anubis.tokenURI(1);

  console.log({
    owner,
    balance,
    tokenURI,
  });
})();
