const hre = require("hardhat")

async function main(){
    const SKKMService = await hre.ethers.getContractFactory("SKKMService")
    const skkmService = await SKKMService.deploy('0xE68d5779409c45bDA72aE72E7992dc6476F2D693');

    await skkmService.deployed()

    console.log("SKKM Service deployed to:", skkmService.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });