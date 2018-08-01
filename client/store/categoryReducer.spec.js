import {expect} from 'chai'
import {fetchCategories, SET_CATEGORIES} from './categoryReducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)


describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {category:{list:[]}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })
  describe('Fetch Categories', () => {
    it('eventually dispatches the set categories action', async () => {
      const fakeCategories = ['working']
      mockAxios.onGet('/api/categories').replyOnce(200, fakeCategories)
      await store.dispatch(fetchCategories())
      const actions = store.getActions()
      expect(actions[1].type).to.be.equal(SET_CATEGORIES)
      expect(actions[1].categoriesList).to.be.deep.equal(fakeCategories)
    })
  })
})
