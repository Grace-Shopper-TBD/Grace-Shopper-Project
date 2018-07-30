import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const ProductInCart = ({product, lineItem}) => {
    if(!product){
        return null
    }
    return (
        
                // <div>
                //     <div >
                //     <div className="card mb-4 box-shadow">
                //     <div className="card-body">
                //         <img src={product.photo} className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Card image cap"/>
                //                 <div className='card-text'>
                //                     <p>{product.title}</p>
                //                     <p>${product.price}</p>
                //                     <div className="d-flex justify-content-between align-items-center">
                //                         <div className="btn-group">                                                                                       
                //                             <Link to={`/products/${product.id}`}>
                //                                 <button type="button" className="btn btn-dark">View</button>
                //                             </Link>
                //                         </div>
                //                     </div>
                //                 </div>                        
                //             </div>
                //         </div>        
                //     </div>        
                // </div>
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
            </li>
        </div>
    )
}

export default ProductInCart
