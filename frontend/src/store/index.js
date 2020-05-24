import { createStore, combineReducers } from 'redux'
import authReducer from './authReducer'

const reducer = combineReducers(
  authReducer
)

const store = createStore(reducer)

export default store