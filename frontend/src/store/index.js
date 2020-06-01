import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import loginFormReducer from './loginFormReducer'
import registerFormReducer from './registerFormReducer'

const reducer = combineReducers({
  auth: authReducer,
  loginForm: loginFormReducer,
  registerForm: registerFormReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store