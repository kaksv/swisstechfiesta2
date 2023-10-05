// import hardhat and swisstronikJs functions
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

const sendShieldedTransaction = async (provider, destination, data) => {
    const rpclink = hre.network.config.url;
    const [encryptedData, usedEncryptedKey] = await encryptedDataField(rpclink, data);

    const response = await provider.call({
        to: destination,
        data: encryptedData,
    });
    // Decrypt the call result using Swisstronikjs function decryptNodeResponse()
    return await decryptNodeResponse(rpclink, response, usedEncryptedKey);
};

async function main(){
    // Address of the deployed contract
    const contractAddress = "0x9b635B73b505300f379723FC00E19EE4497C12e9";
    const [signer] = await hre.ethers.getSigners();

    const contractFactory = await hre.ethers.getContractAtFromArtifact("Storage");
    const contract = contractFactory.attach(contractAddress);

    const functionName = "getData";
    const responseMessage = await sendShieldedQuery(signer.provider, contractAddress, contract.interface.encodeFunctionData(functionName));

    // Decode the uint8Array response into a readable string
    console.log("Decoded response:", contract.interface.decodeFunctionResult(functionName, responseMessage)[0])
}