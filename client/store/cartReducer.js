import axios from 'axios'
import history from '..history'


// Action types
const GET_LINE_ITEMS = 'GET_LINE_ITEMS'
const GET_LINE_ITEM = 'GET_LINE_ITEM'
// const CLEAR_CART = 'CLEAR_CART'
// const ADD_TO_CART = 'ADD_TO_CART'
// const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
//delete from cart?


//Action creators
const receiveLineItems = (lineItems) => ({
    type: GET_LINE_ITEMS,
    lineItems
})

const receiveLineItem = (lineItem) => ({
    type: GET_LINE_ITEM,
    lineItem
})

//Thunks



//Reducer




