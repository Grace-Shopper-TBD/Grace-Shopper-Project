import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import product from './productReducer'
import category from './categoryReducer'
import review from './reviewReducer'
import cart from './cartReducer'
import admin from './adminReducer'
import orders from './ordersReducer'

const reducer = combineReducers({user, product, category, admin, cart, review, orders})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './productReducer'
export * from './reviewReducer'
export * from './adminReducer'
