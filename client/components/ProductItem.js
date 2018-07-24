import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({products}) => {
    if(!products){
        return null
    }

    return (
        products.map(product => {
            return(
                <div key={product.id}>
                    <img src={product.photo} id='product-photo'/>
                    <div>
                        <h5><Link to={`/products/${product.id}`}>{product.title}</Link></h5>
                        <p>{product.price}</p>
                        <p>{product.availability}</p>
                    </div>
                </div>
            )
        })
    )
}

export default ProductItem