import axios from 'axios'

/*
 * ACTION TYPES
 */
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS'
const LOADING_PRODUCTS = 'LOADING_PRODUCTS'
const LOADING_PROBLEM = 'LOADING_PROBLEM'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
/**
 * INITIAL STATE
 */
const products = {
  list: [],
  isLoading: false,
  gotError: false
}

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

const deleteProduct = (id => ({
  type:DELETE_PRODUCT,
  id
}))

const addProduct =(product => ({
  type:ADD_PRODUCT,
  product
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

export const changeProduct = (prod, props) => async dispatch => {
  try{
    const res = await axios.put(`/api/products/${prod.id}`, prod)
    dispatch(deleteProduct(prod.id))
    dispatch(addProduct(res.data))
    props.history.push('/admin/products')
  }
  catch(err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = products, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, list: action.productList, isLoading: false, gotError: false}
    case FILTER_PRODUCTS:{
      let newList = state.list.filter((product) => {
        let cat = product.categories
        for (let i =0; i< cat.length; i++){
          if(cat[i].name === action.filter)
            return true
        }
        return false
        })
      return {...state, list:newList}
    }
    case DELETE_PRODUCT: {
      return {...state, list: state.list.filter(prod=> prod.id!==action.id)}
    }
    case ADD_PRODUCT: {
      return {...state, list:[...state.list, action.product]}
    }
    case LOADING_PRODUCTS:
      return {...state, isLoading: true}
    case LOADING_PROBLEM:
      return {...state, gotError: true}
    default:
      return state
  }
}
