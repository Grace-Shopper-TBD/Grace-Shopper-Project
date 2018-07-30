import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AddToCart from './AddToCartButton.js'

const ProductItem = ({product}) => {
    if(!product){
        return null
    }
    return (
        <div>
            <div >
            <div className="card mb-4 box-shadow">
            <div className="card-body">
                <img src={product.photo} className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Card image cap"/>
                        <div className='card-text'>
                            <p>{product.title}</p>
                            <p>${product.price}</p>
                            <p>{product.availability}</p>
                            <h3>{product.quantity} Left</h3>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <AddToCart product={product} />
                                    <Link to={`/products/${product.id}`}>
                                        <button type="button" className="btn btn-dark">View</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
