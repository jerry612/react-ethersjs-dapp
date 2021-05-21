import ActionTypes from "./types"

export const requestAccount = () => ({
  type: ActionTypes.REQUEST_ACCOUNT_SAGA,
})

export const setGreeting = (token, abi, greeting) => {
  return {
    type: ActionTypes.SET_GREETING_SAGA,
    payload: {
      token,
      abi,
      greeting,
    },
  }
}

export const fetchGreeting = (token, abi) => {
  return {
    type: ActionTypes.FETCH_GREETING_SAGA,
    payload: {
      token,
      abi,
    },
  }
}
export const sendCoins = (tokenAddress, abi, to, amount) => {
  return {
    type: ActionTypes.SEND_COINS_SAGA,
    payload: {
      tokenAddress,
      abi,
      to,
      amount,
    },
  }
}

export const getBalance = (token, abi) => {
  return {
    type: ActionTypes.GET_BALANCE_SAGA,
    payload: {
      token,
      abi,
    },
  }
}
