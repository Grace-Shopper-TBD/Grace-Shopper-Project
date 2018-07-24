import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// import potential thunks from the store


class SingleProduct extends Component {

    
    render(){
        return(
            <div>
            </div>
        )
    }
}

const mapState = (state, {match}) => ({
    product: state.products.find(product => product.id === match.params.id)
})

// there is no mapDispatch for now but can be added later for imported thunks


export default connect(mapState, null)(SingleProduct)
