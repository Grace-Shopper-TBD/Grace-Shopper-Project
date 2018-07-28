import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
//import any thunks

const Cart = (props) => {
    const products = props.products

    return (
        <div className='container'>
            <h1>This is the cart</h1>
        </div>
    )
    
}

export default Cart