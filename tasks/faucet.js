/* eslint-disable no-undef */

const fs = require("fs")

// This file is only here to make interacting with the Dapp easier,
// feel free to ignore it if you don't need it.

task("faucet", "Sends ETH and tokens to an address")
  .addPositionalParam(
    "tokenAddress",
    "The address of the token that will transferred"
  )
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async ({ tokenAddress, receiver }) => {
    if (network.name === "hardhat") {
      console.warn(
        "You are running the faucet task with Hardhat network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      )
    }

    const token = await ethers.getContractAt("Token", tokenAddress)
    const [sender] = await ethers.getSigners()

    const tx = await token.transfer(receiver, 100)
    await tx.wait()

    const tx2 = await sender.sendTransaction({
      to: receiver,
      value: ethers.constants.WeiPerEther,
    })
    await tx2.wait()

    console.log(`Transferred 1 ETH and 100 tokens to ${receiver}`)
  })
