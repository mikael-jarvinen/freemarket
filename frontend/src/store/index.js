import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import loginFormReducer from './loginFormReducer'
import registerFormReducer from './registerFormReducer'
import addListingDialogReducer from './addListingDialogReducer'
import { connectRouter, routerMiddleware } from 'connected-react-router'

const createReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    loginForm: loginFormReducer,
    registerForm: registerFormReducer,
    addListingDialog: addListingDialogReducer
  })

export const history = createBrowserHistory()

const store = createStore(
  createReducer(history),
  applyMiddleware(thunk, routerMiddleware(history))
)

export default store