const hre = require("hardhat");
const { encryptedDataField, decryptNodeResponse, encryptDataField } = require("@swisstronik/swisstronik.js");

const sendShieldedTransaction = async (signer, destination, data, value) => {
    const rpclink = hre.network.config.url;

    const [encryptedData] = await encryptDataField(rpclink, data);

    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    });
};
async function main(){
    // The address of the deployed contract on swisstronik testnet
    const contractAddress = "0x9b635B73b505300f379723FC00E19EE4497C12e9"

    const [signer] = await hre.ethers.getSigners();

    // Creating a contract instance
    const contractFactory = await hre.ethers.getContractFactory("Storage");
    const contract = contractFactory.attach(contractAddress);

    // Send a shielded transction to set the message in the contract.
    const setDataTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData("setData",[20]), 0);
    await setDataTx.wait();

    // What should be returned is a transaction response.
    console.log("Transaction Receipt: ", setDataTx);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});