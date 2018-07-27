import axios from 'axios'

/*
 * ACTION TYPES
 */
export const SET_REVIEWS = 'SET_REVIEWS'
const LOADING_REVIEWS = 'LOADING_REVIEWS'
const LOADING_PROBLEM = 'LOADING_PROBLEM'
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


/**
 * THUNK CREATORS
 */

export const fetchReviews = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/reviews/')
    dispatch(setReviews(data))
    return data
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = reviews, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return {...state, list: action.reviewList, isLoading: false, gotError: false}
    case LOADING_REVIEWS:
      return {...state, isLoading: true}
    case LOADING_PROBLEM:
      return {...state, gotError: true}
    default:
      return state
  }
}
