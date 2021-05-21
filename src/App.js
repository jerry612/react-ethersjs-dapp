import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./App.css"
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json"
import Token from "./artifacts/contracts/Token.sol/Token.json"

import { fetchGreeting, getBalance, setGreeting, sendCoins } from "./actions"

const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

function App() {
  const dispatch = useDispatch()
  const [greeting, setGreetingValue] = useState("")
  const [userAccount, setUserAccount] = useState("")
  const [amount, setAmount] = useState(0)

  const allState = useSelector((state) => state.main)

  const handleFetchGreeting = (address, abi) => () => {
    dispatch(fetchGreeting(address, abi))
  }

  const handleSendCoins = (tokenAddress, abi, to, amount) => () => {
    dispatch(sendCoins(tokenAddress, abi, to, amount))
  }

  const handleGetBalance = (address, abi) => () => {
    dispatch(getBalance(address, abi))
  }

  const handleSetGreeting = (address, abi, greeting) => () => {
    dispatch(setGreeting(address, abi, greeting))
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleFetchGreeting(greeterAddress, Greeter.abi)}>
          Fetch Greeting
        </button>
        <button
          onClick={handleSetGreeting(greeterAddress, Greeter.abi, greeting)}
        >
          Set Greeting
        </button>
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder={"Set Greeting"}
          value={greeting}
        />
        <br />
        <button onClick={handleGetBalance(tokenAddress, Token.abi)}>
          Get Balance
        </button>
        <button
          onClick={handleSendCoins(
            tokenAddress,
            Token.abi,
            userAccount,
            amount
          )}
        >
          Send Coins
        </button>
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder={"Account ID"}
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder={"Amount"}
          type={"number"}
        />
        <div>
          <pre>{JSON.stringify(allState, null, 2)}</pre>
        </div>
      </header>
    </div>
  )
}

export default App
