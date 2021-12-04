const hre = require("hardhat")

async function main(){
    const SKKMService = await hre.ethers.getContractFactory("SKKMService")
    const skkmService = await SKKMService.deploy('0xD19Dd20c98Ffa5466e3a0B48d07b1784d4fE0a69');

    await skkmService.deployed()

    console.log("SKKM Service deployed to:", skkmService.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });