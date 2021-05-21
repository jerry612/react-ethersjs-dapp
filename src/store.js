import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducers"
import rootSaga from "./sagas"

// const saga = createSagaMiddleware()

// const enhancer = composeEnhancers(applyMiddleware(saga))
// const store = createStore(rootReducer, enhancer)

// saga.run(rootSaga)
// export default store
export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  const enhancers = [middlewareEnhancer]
  const composedEnh = composeEnhancers(...enhancers)
  const store = createStore(rootReducer, initialState, composedEnh)

  sagaMiddleware.run(rootSaga)

  return store
}
