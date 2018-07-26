import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({product}) => {
    if(!product){
        return null
    }
    return (
        <div>
            <img src={product.photo} id='product-photo'/>
            <div>
                <Link to={`/products/${product.id}`}><h5>{product.title}</h5></Link>
                <p>{product.price}</p>
                <h3>{product.availability}</h3>
            </div>
        </div>
    )
}

export default ProductItem