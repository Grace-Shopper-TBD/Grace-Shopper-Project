import {expect} from 'chai'
import {fetchCart, addItemToCart, GET_CART_ITEMS, ADD_TO_CART} from './cartReducer'
import reducer from './cartReducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
    let store
    let mockAxios

    
})