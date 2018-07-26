import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// import potential thunks from the store

class SingleProduct extends Component {
    
    render(){
        console.log('product going into SingleProduct',this.props.product)
        return(
            <div>
                <h1>hello</h1>
            </div>
        )
    }
}

const mapState = (state, {match}) => {
    console.log('this is the match', match)
    return {
        product: state.product.list.find(product => product.id === match.params.id)
    }
}

// there is no mapDispatch for now but can be added later for imported thunks


export default connect(mapState, null)(SingleProduct)
