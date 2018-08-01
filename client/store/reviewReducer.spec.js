import {expect} from 'chai'
import reducer, {fetchReviews, SET_REVIEWS,GOT_NEW_REVIEW_FROM_SERVER} from './reviewReducer'
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
      "text": "It was an amazing week long trip!! I highly recommend to anyone looking into this destination!",
      "createdAt":	"2018-07-26 13:13:15.012-04",
      "updatedAt": "2018-07-26 13:13:15.041-04",
      "userId":	"2",
      "productId":	"1"
    },
    {
      "id": 2,
      "text": "I loved the hotel and entire trip!! I can't wait to go back!!",
      "createdAt":	"2018-07-26 13:13:15.011-04",
      "updatedAt": "2018-07-26 13:13:15.041-04",
      "userId":	"1",
      "productId":	"2"
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
  describe('FetchReviews', () => {
    it('eventually dispatches the Set Reviews action', async () => {
      mockAxios.onGet('/api/reviews').replyOnce(200, initialState.list)
      await store.dispatch(fetchReviews("1"))
      const actions = store.getActions()
      expect(actions[1].type).to.be.equal(SET_REVIEWS)
      expect(actions[1].reviewList[0]).to.be.deep.equal(initialState.list[0])
    })
  })
})
