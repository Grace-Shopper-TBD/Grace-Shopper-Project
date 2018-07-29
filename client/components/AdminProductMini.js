import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { delProduct } from '../store/productReducer'
import {connect} from 'react-redux'

class AdminProductItem extends Component (){
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this)
    }
    // handleClick(evt){
    //     this.props.delete(this.props.product.id)
    // }

    render() {
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
                    <button type='button' >x</button>
                </div>
            </Link>
        )
    }
}

const mapDispatch = (dispatch)=>{
    return {
        //delete:(id)=>dispatch(delProduct(id))
    }
}

export default connect(null, mapDispatch) (AdminProductItem)
