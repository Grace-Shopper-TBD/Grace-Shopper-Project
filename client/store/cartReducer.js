import history from '..history'


// Action types
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
//delete from cart?

// Initial State
let currentCart;
    //localStorage.getItem accesses data in the store
    if(localStorage.getItem('cart')){
        currentCart = JSON.parse(localStorage.getItem('cart'))
    } else {
        currentCart = []
    }

//



