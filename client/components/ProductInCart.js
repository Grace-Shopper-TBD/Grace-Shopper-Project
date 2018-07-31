import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const ProductInCart = ({product, lineItem, handleClick}) => {
    if(!product){
        return null
    }
    return (
        <div>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
            <h6 className="my-0">{product.title}</h6>
            <small className="text-muted">{product.description}</small>
            </div>

            <div>
            <span className="text-muted">{product.price}</span>
            </div>
            <small className="text-muted">Quantity: {lineItem.quantity}</small>
            <button type="button" className="btn btn-info" onClick={(event) => handleClick(event, product.id)}>Remove From Cart</button>
            </li>
        </div>
    )
}

export default ProductInCart
