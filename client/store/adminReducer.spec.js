import {expect} from 'chai'
import { fetchUsers, POPULATE_USERS } from './adminReducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)


describe.only('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {admin: {
    user:[]
  }}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })
  describe('Fetch Users', () => {
    it('eventually dispatches the popUser action', async () => {
      const fakeUsers = ['working']
      mockAxios.onGet('/api/users').replyOnce(200, fakeUsers)
      await store.dispatch(fetchUsers())
      const actions = store.getActions()
      console.log(actions)
      expect(actions[0].type).to.be.equal(POPULATE_USERS)
      expect(actions[0].users).to.be.deep.equal(fakeUsers)
    })
  })

})
