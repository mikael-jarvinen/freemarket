import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import loginDialogReducer from './loginDialogReducer'

const reducer = combineReducers({
  auth: authReducer,
  loginDialog: loginDialogReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store