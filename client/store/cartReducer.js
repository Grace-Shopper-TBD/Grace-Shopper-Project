import axios from 'axios'
import history from '..history'

const getCartLocal = function(){
    if(localStorage.lineItems){
        return JSON.parse(localStorage.lineItems)
    } else {
        return {}
    }
}

//get carts that have iscart as true and match the user id of user logged in 

// Action types
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_TO_CART = 'ADD_TO_CART'
// const CLEAR_CART = 'CLEAR_CART'
// const REMOVE_FROM_CART = 'REMOVE_FROM_CART'


//Action creators
const getCartItems = (cartItems) => ({
    type: GET_CART_ITEMS,
    cartItems
})

const addToCart = (cartItem) => ({
    type: ADD_TO_CART,
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

export const addItemCart = (cartItem) => {
    try{
        return async dispatch => {
            const { data } = await axios.put(`/api/orders/cart/${userId}`, cartItem);
            dispatch(addToCart(data))
        }
    } catch(err){
        console.log(err)
    }
}


//Reducer
export default function(state=lineItems, action){
    switch(action.type){
        case GET_CART_ITEMS: {
            return action.cartItems
        }
        case ADD_TO_CART: {
            
        }
        default: 
            return state
    }
}





