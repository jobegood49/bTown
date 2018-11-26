import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

const middleware = []

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

// console.log(store.getState(), 'this is the state')

export default store
