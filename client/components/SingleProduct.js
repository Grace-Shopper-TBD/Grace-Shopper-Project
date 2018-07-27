import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// import {fetchCart} from '../store'

class SingleProduct extends Component {
    constructor(props){
        super(props)
    }

    
    render(){
        const product = this.props.product
        if(product){
            return(
                <div>
                    <h1>{product.title}</h1>
                    <img src={product.photo}/>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                    <p>{product.availability}</p>
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

    return {
        product: state.product.list.find(product => product.id === Number(match.params.id))
    }
}

// const mapDispatch = (dispatch, ownProps) => {
//     return {
//         getCart(){
//             dispatch(fetchCart())
//         }       
//         //and then maybe an action called getCart to dispatch a getCart thunk
//     }
// }


export default connect(mapState, null)(SingleProduct)
