async function main() {
    const SKKMNFT = await ethers.getContractFactory("SKKMNFT")
  
    // Start deployment, returning a promise that resolves to a contract object
    const skkmNFT = await SKKMNFT.deploy()
  
    await skkmNFT.deployed()
  
    console.log("Contract deployed to address:", skkmNFT.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  