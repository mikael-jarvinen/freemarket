import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import loginFormReducer from './loginFormReducer'
import registerFormReducer from './registerFormReducer'
import addListingDialogReducer from './addListingDialogReducer'

const reducer = combineReducers({
  auth: authReducer,
  loginForm: loginFormReducer,
  registerForm: registerFormReducer,
  addListingDialog: addListingDialogReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store