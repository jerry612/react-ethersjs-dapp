/* eslint-disable no-undef */
require("@nomiclabs/hardhat-waffle")
require("./tasks/faucet")
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const ACCOUNT_KEY =
  "9cdcc3bc87cf5710eefdd79a205d3e3356a1f6a259f00430483f0a4ab4ed8a52"
module.exports = {
  solidity: "0.7.3",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/7d62a2374a254557bc680d4d1ff4ddbc",
      accounts: [`0x${ACCOUNT_KEY}`],
    },
  },
}
