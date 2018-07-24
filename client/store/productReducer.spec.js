import {expect} from 'chai'
import {fetchProducts, filterProducts, SET_PRODUCTS} from './productReducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {product:[]}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('FetchStudents', () => {
    it('eventually dispatches the SET Students action', async () => {
      const fakeProducts = ['working']
      mockAxios.onGet('/api/products/').replyOnce(200, fakeProducts)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      console.log(actions)
      expect(actions[0].type).to.be.equal(SET_PRODUCTS)
      expect(actions[0].productList).to.be.deep.equal(fakeProducts)
    })
  })
})
