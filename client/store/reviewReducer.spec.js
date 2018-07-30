import {expect} from 'chai'
import reducer, {fetchReviews, SET_REVIEWS} from './reviewReducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe.only('thunk creators', () => {
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
    it('eventually dispatches the SET Reviews action', async () => {
      const fakeReviews = ['working']
      mockAxios.onGet('/api/reviews/').replyOnce(200, fakeReviews)
      await store.dispatch(fetchReviews())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal(SET_REVIEWS)
      expect(actions[0].reviewList).to.be.deep.equal(fakeReviews)
    })
  })
})
