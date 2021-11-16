// ethereum/scripts/deploy.js
const { ethers } = require("hardhat");



async function main() {
  const EmotionalShapes = await ethers.getContractFactory("EmotionalShapes");
  const emotionalShapes = await EmotionalShapes.deploy();

  console.log("EmotionalShapes deployed:", emotionalShapes.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });