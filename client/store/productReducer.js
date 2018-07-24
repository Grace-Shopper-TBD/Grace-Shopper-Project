import axios from 'axios'

/*
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
const FILTER_PRODCUTS = 'FILTER_PRODCUTS'

/**
 * INITIAL STATE
 */
const products = []

/**
 * ACTION CREATORS
 */
const setProducts = (products => {
  type: SET_PRODUCTS,
  products
})

export const filterProducts = (filter => {
  type: FILTER_PRODCUTS,
  filter
})
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
      return products
    case FILTER_PRODCUTS:
      return state.filter((product) => product[category].contains(filter))
    default:
      return state
  }
}
