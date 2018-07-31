import axios from 'axios'
import history from '../history'

//Initial State
const initialState = {
    cart: [],
    isLoading: false,
    gotError: false
}

// Action types
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const UPDATE_CART = 'UPDATE_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CART_ERROR = "CART_ERROR"
const LOADING_CART = "LOADING_CART"

//Action creators
const getCartItems = (cartItems) => ({
    type: GET_CART_ITEMS,
    cartItems
})

const cartError = () => ({
	type: CART_ERROR
})

export const loadingCart = () => ({
	type: LOADING_CART
})

const updateCart = (cart) => ({
    type: UPDATE_CART,
    cart
})

const remove = (productId) => ({
    type: REMOVE_FROM_CART,
    productId
})

//Thunks

export const fetchCart = () => async dispatch => {
    try {
        dispatch(loadingCart())
        const res = await axios.get('/api/orders/cart')
        dispatch(getCartItems(res.data))
    } catch(err) {
        dispatch(gotError())
        console.log(err)
    }
}

export const addItemToCart = (cartItem) => async dispatch => {
    try {
        const { data } = await axios.post(`/api/orders`, cartItem)
        dispatch(updateCart(data))
    } catch(err){
        dispatch(cartError())
    }
}

export const changeQuantity = (productId, quantity) => async(dispatch) => {
    try {
        const response = await axios.put(`/api/orders/cart/${productId}`, { "quantity": quantity })
        const updated = response.data
        dispatch(updateCart(updated))
    } catch(err) {
        dispatch(cartError())
    }
}

export const removeFromCart = (productId) => async(dispatch) => {
    try{
        await axios.delete(`/api/orders/cart/${productId}`)
        dispatch(remove(productId))
    } catch(err){
        dispatch(cartError())
    }
}


//Reducer
export default function(state=initialState, action){
    switch(action.type) {
        case GET_CART_ITEMS: {
            return {...state, cart:action.cartItems, isLoading: false, gotError: false }
        }
        case UPDATE_CART: {
            return {...state, cart: action.cart, isLoading: false, gotError: false}
        }
        case REMOVE_FROM_CART: {
            return {...state, cart: state.cart.filter(product => product.id !== action.productId), isLoading: false, gotError: false }
        }
        case CART_ERROR: {
        	return {...state, gotError: true }
        }
        case LOADING_CART: {
        	return {...state, isLoading: true }
        }
        default:
            return state
    }
}





