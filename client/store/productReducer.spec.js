import {expect} from 'chai'
import {fetchProducts, filterProducts, SET_PRODUCTS, FILTER_PRODUCTS} from './productReducer'
import reducer from './productReducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {list:[
    {
        "id": 1,
        "title": "Hawaii",
        "description": "Lets get some sun!",
        "price": "2000.00",
        "quantity": 2,
        "photo": "http://covermyfb.com/media/covers/9151-beach.jpg",
        "availability": "Available",
        "createdAt": "2018-07-24T21:30:17.769Z",
        "updatedAt": "2018-07-24T21:30:17.769Z",
        "categories": [
            {
                "id": 1,
                "name": "Romantic Getaway",
                "createdAt": "2018-07-24T21:30:17.780Z",
                "updatedAt": "2018-07-24T21:30:17.780Z",
                "product_categories": {
                    "createdAt": "2018-07-24T21:30:17.799Z",
                    "updatedAt": "2018-07-24T21:30:17.799Z",
                    "productId": 1,
                    "categoryId": 1
                }
            }
        ]
    },
    {
        "id": 2,
        "title": "Italy",
        "description": "Lets eat some pasta!",
        "price": "1500.00",
        "quantity": 2,
        "photo": "http://covermyfb.com/media/covers/9151-beach.jpg",
        "availability": "Available",
        "createdAt": "2018-07-24T21:30:17.769Z",
        "updatedAt": "2018-07-24T21:30:17.769Z",
        "categories": [
            {
                "id": 2,
                "name": "Family Vacation",
                "createdAt": "2018-07-24T21:30:17.781Z",
                "updatedAt": "2018-07-24T21:30:17.781Z",
                "product_categories": {
                    "createdAt": "2018-07-24T21:30:17.803Z",
                    "updatedAt": "2018-07-24T21:30:17.803Z",
                    "productId": 2,
                    "categoryId": 2
                }
            }
        ]
    }
]}

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
      expect(actions[0].type).to.be.equal(SET_PRODUCTS)
      expect(actions[0].productList).to.be.deep.equal(fakeProducts)
    })
  })

  describe('FiltersStudents', () => {
    const action = filterProducts("Family Vacation")
    it('has a working action creater', ()=> {
      expect(action).to.deep.equal({type: FILTER_PRODUCTS, filter: 'Family Vacation' })
    })
     const newState = reducer(initialState, action)
    it('filters students by category', () => {
      expect(newState.list).to.deep.equal([{
        "id": 2,
        "title": "Italy",
        "description": "Lets eat some pasta!",
        "price": "1500.00",
        "quantity": 2,
        "photo": "http://covermyfb.com/media/covers/9151-beach.jpg",
        "availability": "Available",
        "createdAt": "2018-07-24T21:30:17.769Z",
        "updatedAt": "2018-07-24T21:30:17.769Z",
        "categories": [
            {
                "id": 2,
                "name": "Family Vacation",
                "createdAt": "2018-07-24T21:30:17.781Z",
                "updatedAt": "2018-07-24T21:30:17.781Z",
                "product_categories": {
                    "createdAt": "2018-07-24T21:30:17.803Z",
                    "updatedAt": "2018-07-24T21:30:17.803Z",
                    "productId": 2,
                    "categoryId": 2
                }
            }
        ]
    }])
    })
   })
})
