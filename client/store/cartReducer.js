import axios from 'axios'
import history from '../history'

//Initial State
const initialState = {
    quantity: 0,
    price: 0,
    productId: 0,
    orderId: 0
}

// Action types
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

//Action creators
const getCartItems = (cartItems) => ({
    type: GET_CART_ITEMS,
    cartItems
})

const addToCart = (cartItem) => ({
    type: ADD_TO_CART,
    cartItem
})

const updateCart = (cart) => ({
    type: UPDATE_CART,
    cart
})

const remove = (cartItem) => ({
    type: REMOVE_FROM_CART,
    cartItem
})

//Thunks

export const fetchCart = () => {
    try {
        return async dispatch => {
        const res = await axios.get('/api/orders/cart')
        dispatch(getCartItems(res.data))
        }
    } catch(err) {
        console.log(err)
    }  
}

export const addItemToCart = (cartItem) => {
    try{
        return async dispatch => {
            const { data } = await axios.put(`/api/orders/cart/`, cartItem);
            dispatch(addToCart(data))
        }
    } catch(err){
        console.log(err)
    }
}

export const changeQuantity = (productId, lineItem) => {
    try {
        return async(dispatch) => {
            const response = await axios.put(`/api/orders/cart/${productId}`, lineItem)
            const updated = response.data
            dispatch(updateCart(updated))
        }
    } catch(err){
        console.log(err)
    }
}

export const removeFromCart = (productId) => {
    try{
        return async(dispatch) => {
            return axios.delete(`/api/orders/cart/${productId}`)
            dispatch(remove(productId))
        }
    } catch(err){
        console.log(err)
    }
}


//Reducer
export default function(state=initialState, action){
    switch(action.type){
        case GET_CART_ITEMS: {
            return action.cartItems
        }
        case ADD_TO_CART: {
            return {...state, cart: [...state, action.cartItem]}
        }
        case UPDATE_CART: {
            state.map(product => product.id===action.product.id ? action.cart : cart)
            // I don't think above is correct, perhaps cart where product is declared?
        }
        case REMOVE_FROM_CART: {
            state.filter(product => product.id !== action.product.id)
        }
        default: 
            return state
    }
}





