import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"
import ActionTypes from "../actions/types"
import { ethers } from "ethers"

// Get Balance
export function* getBalanceSaga({ payload }) {
  const { token, abi } = payload
  if (typeof window.ethereum !== "undefined") {
    try {
      const [account] = yield call(requestAccount)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(token, abi, provider)
      const balance = yield contract.balanceOf(account)
      yield put({
        type: ActionTypes.GET_BALANCE_ACTION,
        payload: balance.toString(),
      })
    } catch (error) {
      console.log("function*getBalanceSaga ~ error", error)
    }
  }
}

export function* sendCoinsSaga({ payload }) {
  const { tokenAddress, abi, to: userAccount, amount } = payload

  try {
    if (typeof window.ethereum !== "undefined") {
      yield call(requestAccount)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(tokenAddress, abi, signer)
      const transaction = yield contract.transfer(userAccount, amount)
      yield transaction.wait()
      yield put({
        type: ActionTypes.SEND_COINS_ACTION,
        payload: "Sent!",
      })
      console.log(`${amount} Coins successfully sent to ${userAccount}`)
    }
  } catch (error) {
    console.log("Error - sendCoinsSaga", error)
  }
}

// Fetch Greeting

export function* fetchGreetingSaga({ payload }) {
  const { token, abi } = payload
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(token, abi, provider)

    try {
      const data = yield contract.greet()
      yield put({ type: ActionTypes.FETCH_GREETING_ACTION, payload: data })
    } catch (error) {
      console.log("Error (SAGA): ", error)
    }
  }
}

// Set Greeting

export function* setGreetingSaga({ payload }) {
  const { token, abi, greeting } = payload
  if (!greeting) yield
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(token, abi, signer)
      const transaction = yield contract.setGreeting(greeting)
      // setGreetingValue("") // Create Action ?
      yield transaction.wait()

      yield put({ type: ActionTypes.SET_GREETING_ACTION, payload: greeting })
    } catch (error) {
      console.log("function*setGreetingSaga ~ error", error)
    }
  }
}

// Request Account

const requestAccount = async () =>
  window.ethereum.request({
    method: "eth_requestAccounts",
  })

export function* requestAccountSaga(action) {
  try {
    const [account] = yield call(requestAccount)
    yield put({ type: ActionTypes.REQUEST_ACCOUNT_ACTION, payload: account })
  } catch (error) {
    console.log(error)
  }
}

export function* watchRequestAccountSaga() {
  yield takeEvery(ActionTypes.REQUEST_ACCOUNT_SAGA, requestAccountSaga)
}

export function* watchFetchGreetingSaga() {
  yield takeEvery(ActionTypes.FETCH_GREETING_SAGA, fetchGreetingSaga)
}

export function* watchGetBalanceSaga() {
  yield takeLatest(ActionTypes.GET_BALANCE_SAGA, getBalanceSaga)
}

export function* watchSetGreetingSaga() {
  yield takeEvery(ActionTypes.SET_GREETING_SAGA, setGreetingSaga)
}

export function* watchSendCoinsSaga() {
  yield takeEvery(ActionTypes.SEND_COINS_SAGA, sendCoinsSaga)
}

export default function* rootSaga() {
  // Combine sagas with
  yield all([
    call(watchRequestAccountSaga),
    call(watchFetchGreetingSaga),
    call(watchGetBalanceSaga),
    call(watchSetGreetingSaga),
    call(watchSendCoinsSaga),
  ])
}
