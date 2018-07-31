import axios from 'axios'

/*
 * ACTION TYPES
 */
export const SET_REVIEWS = 'SET_REVIEWS'
const LOADING_REVIEWS = 'LOADING_REVIEWS'
const LOADING_PROBLEM = 'LOADING_PROBLEM'
const GOT_NEW_REVIEW_FROM_SERVER = 'GOT_NEW_REVIEW_FROM_SERVER'
const DELETE_REVIEW  = 'DELETE_REVIEW'
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

export const loadingReviews = () => ({
	type: LOADING_REVIEWS
})

export const gotNewReviewFromServer = newReviewAdded => ({
  type: GOT_NEW_REVIEW_FROM_SERVER,
  newReviewAdded
})

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
})


/**
 * THUNK CREATORS
 */

export const fetchReviews = (productId) => async dispatch => {
  try {
    const id = +productId
    const {data} = await axios.get('/api/reviews')
    const productReviews = data.filter(review=>+review.productId===id)
    dispatch(setReviews(productReviews))
    return data
  } catch (err) {
    console.error(err)
  }
}

export const addReview = newReview => async dispatch => {
  try{
    const { data } = await axios.post('/api/reviews', newReview)
    dispatch(gotNewReviewFromServer(data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteReviewThunk = review => async dispatch => {
  try{
    const {data} = await axios.delete(`/api/reviews/${review}`)
    dispatch(deleteReview(review))
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
    case DELETE_REVIEW:
      return {...state,list: state.list.filter(review=>review.id!==+action.reviewId)}
    case LOADING_REVIEWS:
      return {...state, isLoading: true}
    case LOADING_PROBLEM:
      return {...state, gotError: true}
    default:
      return state
  }
}
