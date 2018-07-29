import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AddToCart from './AddToCartButton.js'

const ProductItem = ({product}) => {
    if(!product){
        return null
    }
    return (
        <div className="col-md-4">
            <div >
                <div className="card mb-4 box-shadow">
                    <img src={product.photo} className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Card image cap"/>
                    <div className="card-body">
                        <div className='card-text'>
                            <p>{product.price}</p>
                            <p>{product.availability}</p>
                            <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                    <AddToCart product={product} />                                                    
                                <Link to={`/products/${product.id}`}>
                                    <button type="button" className="btn btn-block btn-sm btn-outline-secondary">View</button>
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

// <Link to={`/products/${product.id}`}><h5>{product.title}</h5></Link>

export default ProductItem