import axios from 'axios'


/**
 * ACTION TYPES
 */
const ORDER_LOADING = 'ORDER_LOADING'
const GOT_ERROR = "GOT_ERROR"
const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'
const CREATE_NEW_ORDER = 'CREATE_NEW_ORDER'
/**
 * INITIAL STATE
 */
 const initialState= {
  list:[],
  isLoading: false,
  gotError: false
 }

/**
 * ACTION CREATORS
 */
export const loadingOrders = () => ({
  type:ORDER_LOADING,
})

export const orderError = () => ({
  type:GOT_ERROR,
})

const getOrders = (orders) => ({
  type:GET_ORDERS,
  orders
})

const updateOrder = (order) => ({
  type:UPDATE_ORDER,
  order
})

const createNewOrder = order => ({ 
  type: CREATE_NEW_ORDER, 
  order 
})

/**
 * THUNK CREATORS
 */

export const getAllOrders = () => async(dispatch) => {
    try {
        const {data} = await axios.get(`/api/orders/`)
        dispatch(getOrders(data))
    } catch(err) {
        console.error(err)
    }
}

export const updateOrderThunk = (order) => async(dispatch) => {
  try {
    const {data} = await axios.put(`/api/orders/${order.id}`, order)
    //dispatch(updateOrder(data))
  } catch(err) {
    console.error(err)
  }
}

export const makeNewOrder = (order) => {
  return async(dispatch) => {
    try {
      const res = await axios.post('/api/orders/checkout', order)
      const data = res.data
      console.log('data in makeNewOrder', data)
      console.log('res in makeNewOrder', res)
      dispatch(createNewOrder(data))
    } catch(err){
      console.log('error in makeNewOrder reducer', err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ORDER_LOADING:
      return {...state, isLoading:true}
    case GOT_ERROR:
      return {...state, gotError: false}
    case GET_ORDERS:
      return {...state, list: action.orders}
    case UPDATE_ORDER:
      let deletes = state.list.filter((thing)=> action.order.id !== thing.id)
      return {...state, list:[...deletes, action.order]}
    case CREATE_NEW_ORDER:
    //
      const newState = state
      newState.list.push(action.order)
      return newState
    default:
      return state
  }
}
