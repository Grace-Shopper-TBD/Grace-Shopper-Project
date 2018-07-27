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
        console.log('product going into SingleProduct',product)
        return(
            <div>
                <h1>Title here</h1>
                <img src=''/>
                <p>price here</p>
                <p>description here</p>
                <p>availability</p>
            </div>
        )
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
