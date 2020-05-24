import { createStore, combineReducers } from 'redux'
import authReducer from './authReducer'
import loginDialogReducer from './loginDialogReducer'

const reducer = combineReducers({
  auth: authReducer,
  loginDialog: loginDialogReducer
})

const store = createStore(reducer)

export default store