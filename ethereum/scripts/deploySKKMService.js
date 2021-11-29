const hre = require("hardhat")

async function main(){
    const SKKMService = await hre.ethers.getContractFactory("SKKMService")
    const skkmService = await SKKMService.deploy();

    await skkmService.deployed()

    console.log("SKKM Service deployed to:", skkmService.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });