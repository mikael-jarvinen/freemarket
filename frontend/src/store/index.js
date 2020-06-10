import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import listingsReducer from './listingsReducer'
import usersReducer from './usersReducer'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

const createReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    listings: listingsReducer,
    users: usersReducer
  })

export const history = createBrowserHistory()

const store = createStore(
  createReducer(history),
  composeWithDevTools(
    applyMiddleware(thunk, routerMiddleware(history))
  )
)

export default store