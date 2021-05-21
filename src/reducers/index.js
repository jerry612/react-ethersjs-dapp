import { combineReducers } from "redux"
import ActionTypes from "../actions/types"

const initialState = {
  requested: false,
  account: "",
  greeting: "",
  balance: "",
  sent: "",
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_ACCOUNT_ACTION:
      return {
        ...state,
        requested: true,
        account: action.payload,
      }
    case ActionTypes.FETCH_GREETING_ACTION:
      return {
        ...state,
        greeting: action.payload,
      }
    case ActionTypes.GET_BALANCE_ACTION:
      return {
        ...state,
        balance: action.payload,
      }

    case ActionTypes.SET_GREETING_ACTION:
      return {
        ...state,
        greeting: action.payload,
      }
    case ActionTypes.SEND_COINS_ACTION:
      return {
        ...state,
        sent: action.payload,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  main: reducer,
})

export default rootReducer
