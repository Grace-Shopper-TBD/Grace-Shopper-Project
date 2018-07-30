import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const AdminProductItem = ({product}) => {
    if(!product){
        return null
    }
    return (
        <Link to={`/admin/products/${product.id}`}>
            <img src={product.photo} id='product-photo'/>
            <div>
                <h5>{product.title}</h5>
                <h6>Click to Update</h6>
                <p>${product.price}</p>
                <h3>stock: {product.quantity}</h3>
            </div>
        </Link>
    )
}

export default AdminProductItem
