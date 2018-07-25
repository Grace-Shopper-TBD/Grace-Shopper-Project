import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// import potential thunks from the store

const SingleProduct = ({product}) => {
    console.log('is SingleProduct even showing up?', product)

        return(
            <div>
                <h1>{product.title}</h1>
            </div>
        )
    
}

const mapState = (state, {match}) => ({
    product: state.products.find(product => product.id === match.params.id)
})

// there is no mapDispatch for now but can be added later for imported thunks


export default connect(mapState, null)(SingleProduct)
