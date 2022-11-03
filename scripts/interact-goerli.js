const { ethers } = require("ethers");
const USElection = require('../artifacts/contracts/USElection.sol/USElection.json')

const run = async function() {
    const provider = new ethers.providers.InfuraProvider("goerli", "4d5caad6cbc645eba02a8cd5dc0036bb")


    const wallet = new ethers.Wallet("348c1477aecddec26f5f729023585580dea261dff10a607a947216a41a24d778", provider);
    const balance = await wallet.getBalance();
    console.log(ethers.utils.formatEther(balance, 18))

    const contractAddress = "0x30C3dBC8d796c311eAc5839f5E5C24a33c3bcb8f"
    const electionContract = new ethers.Contract(contractAddress, USElection.abi, wallet)
    console.log(electionContract)

    const hasEnded = await electionContract.electionEnded()
    console.log("The election has ended:", hasEnded)
    const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio")
    console.log("Have results for Ohio:", haveResultsForOhio)   


    const transactionOhio = await electionContract.submitStateResult(["Ohio", 250, 150, 24]);
    const transactionReceipt = await transactionOhio.wait();
    if (transactionReceipt.status != 1) { // 1 means success
    console.log("Transaction was not successful")
    return 
    }
    
    const resultsSubmittedOhioNew = await electionContract.resultsSubmitted("Ohio")
    console.log("Results submitted for Ohio", resultsSubmittedOhioNew)
    
    const currentLeader = await electionContract.currentLeader()
    console.log("Current leader", currentLeader)    
}
    
run()