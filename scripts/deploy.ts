import { ethers } from "hardhat";
import hre from 'hardhat';

async function deployElectionContract() {

  await hre.run('compile');
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address); // We are printing the address of the deployer
  console.log('Account balance:', (await deployer.getBalance()).toString()); // We are printing the account balance

  const USElection = await ethers.getContractFactory("USElection");
  const usElection = await USElection.deploy();
  await usElection.deployed();
  console.log("USElection deployed to:", usElection.address);
  await hre.run('print', { message: "Done!" })
}

module.exports = deployElectionContract;
