// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.

const { ethers, run, network } = require("hardhat");

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying contract...");
    const SimpleStorage = await SimpleStorageFactory.deploy();
    await SimpleStorage.deployed();
    console.log(`depolyed contract address is ${SimpleStorage.address}`);

    //verify contract
    if (network.config.chainId === 11155111 && process.env.API_KEY) {
        await SimpleStorage.deployTransaction.wait(6);
        await verify(SimpleStorage.address, []);
    }

    //interact with contract
    const currentvalue = await SimpleStorage.retrieve();
    console.log(`Current value is:${currentvalue}`);
    const transactionResponse = await SimpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedvalue = await SimpleStorage.retrieve();
    console.log(`Updated value is:${updatedvalue}`);
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verfied")) {
            console.log("Already verfied!");
        } else {
            console.log(e);
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
