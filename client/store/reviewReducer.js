import axios from 'axios'

/*
 * ACTION TYPES
 */
export const SET_REVIEWS = 'SET_REVIEWS'
const LOADING_REVIEWS = 'LOADING_REVIEWS'
const LOADING_PROBLEM = 'LOADING_PROBLEM'
const GOT_NEW_REVIEW_FROM_SERVER = 'GOT_NEW_REVIEW_FROM_SERVER'
/**
 * INITIAL STATE
 */
const reviews = {
  list: [],
  isLoading: false,
  gotError: false
}

/**
 * ACTION CREATORS
 */
export const setReviews = (reviewList => ({
  type: SET_REVIEWS,
  reviewList
}))

export const gotNewReviewFromServer = newReviewAdded => ({
  type: GOT_NEW_REVIEW_FROM_SERVER,
  newReviewAdded
})

/**
 * THUNK CREATORS
 */

export const fetchReviews = (productId) => async dispatch => {
  try {
    const id = +productId
    const {data} = await axios.get('/api/reviews')
    const productReviews = data.filter(review=>review.productId===id)
    dispatch(setReviews(productReviews))
    return data
  } catch (err) {
    console.error(err)
  }
}

export const addReview = newReview => async dispatch => {
  try{
    console.log('TEST',newReview)
    const id=newReview.productId
    const {data} = await axios.post('/api/reviews', newReview)
    dispatch(gotNewReviewFromServer(data))
    // console.log('DATA',data)
    // const productReviews = data.filter(review=>review.productId===id)
    // dispatch(setReviews(productReviews))
  } catch (error) {
    console.error(error)
  }
}
/**
 * REDUCER
 */
export default function(state = reviews, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return {...state, list: action.reviewList, isLoading: false, gotError: false}
    case GOT_NEW_REVIEW_FROM_SERVER:
      return {...state, list: state.list.concat(action.newReviewAdded), isLoading: false, gotError: false}
    case LOADING_REVIEWS:
      return {...state, isLoading: true}
    case LOADING_PROBLEM:
      return {...state, gotError: true}
    default:
      return state
  }
}
