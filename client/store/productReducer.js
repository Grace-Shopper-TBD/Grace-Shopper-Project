import axios from 'axios'

/*
 * ACTION TYPES
 */
export const SET_PRODUCTS = 'SET_PRODUCTS'
const FILTER_PRODUCTS = 'FILTER_PRODUCTS'

/**
 * INITIAL STATE
 */
const products = []

/**
 * ACTION CREATORS
 */
const setProducts = (productList => ({
  type: SET_PRODUCTS,
  productList
}))

export const filterProducts = (filter => ({
  type: FILTER_PRODUCTS,
  filter
}))


/**
 * THUNK CREATORS
 */

export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products/')
    dispatch(setProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = products, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.productList
    case FILTER_PRODUCTS:
      return state.filter((product) => product[category].contains(action.filter))
    default:
      return state
  }
}
