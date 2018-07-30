import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AddToCart from './AddToCartButton.js'

const ProductItem = ({product}) => {
    if(!product){
        return null
    }
    return (
        <Link to={`/products/${product.id}`}>
            <img src={product.photo} id='product-photo'/>
            <div>
                <h5>{product.title}</h5>
                <p>{product.price}</p>
                <h3>{product.availability}</h3>
                <AddToCart product={product} />
            </div>
        </Link>
    )
}

export default ProductItem
