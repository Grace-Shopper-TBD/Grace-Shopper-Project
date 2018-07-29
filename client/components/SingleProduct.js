import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getProduct } from '../store';
import AddToCart from './AddToCartButton.js'

class SingleProduct extends Component {
    
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log('props in cdm',this.props)
        this.props.singleProduct(+this.props.match.params.id)
    }

    
    render(){
        if(Object.keys(this.props.product).length){
            const product = this.props.product
            // const user = this.props.user
            return(
                <div>
                    <h1>{product.title}</h1>
                    <img src={product.photo}/>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                    <p>{product.availability}</p>
                    <AddToCart product={product} />
                    <div>
                        <h3>Reviews For {product.title}</h3>
                        {
                            product.reviews.map((review) => (
                                <div key={product.id}>
                                   
                                    <p>{review.text}</p>
                                </div>                         
                            ))
                        }
                    </div>
                </div>          
        )
        } else {
            return (
                <h1>...Loading</h1>

            )
        }
    }
}

const mapState = (state, {match}) => {
    console.log('all users', state.user)
    console.log('all products', state.product)
    return {
        product: state.product.singleProduct,
        // user: state.user.find(user => user.id === state.product.singleProduct.reviews.userId)
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        singleProduct(id){
            dispatch(getProduct(id))
        }
    }
}


export default connect(mapState, mapDispatch)(SingleProduct)
