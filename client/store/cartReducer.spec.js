import {expect} from 'chai'
import {fetchCart, addItemToCart, GET_CART_ITEMS, ADD_TO_CART} from './cartReducer'
import reducer from './cartReducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

//just one test created for getting items in the cart, currently doesn't pass

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = {
        orders: [
            {
            status: 'PROCESSING',
            recipientName: 'Cody',
            confirmationEmail: 'cody@email.com',
            recipientAddress: '23 Puppy Street',
            isCart: false
            },
            {
            status: 'CREATED',
            recipientName: 'Jack',
            confirmationEmail: 'jack@isback.com',
            recipientAddress: '56 Apple Street',
            isCart: true
            },
            {
            status: 'CANCELLED',
            recipientName: 'Patty',
            confirmationEmail: 'patty@pat.com',
            recipientAddress: '234 fiction road',
            isCart: false   
            }

        ]
    }

    beforeEach(() => {
        mockAxios = new MockAdapter(axios)
        store = mockStore(initialState)
      })

    afterEach(() => {
        mockAxios.restore()
        store.clearActions()
    })

    describe('fetchCart', () => {
        it('gets all products within the cart', async () => {
          const fakeOrders = ['working']
          mockAxios.onGet('api/orders/cart').replyOnce(200, fakeOrders)
          await store.dispatch(fetchCart())
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(GET_CART_ITEMS)
          expect(actions[0].cartItems).to.be.deep.equal(fakeOrders)
        })
      })
    
})