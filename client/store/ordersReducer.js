import axios from 'axios'


/**
 * ACTION TYPES
 */
const ORDER_LOADING = 'ORDER_LOADING'
const GOT_ERROR = "GOT_ERROR"
const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'
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
    default:
      return state
  }
}
