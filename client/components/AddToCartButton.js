import React, { Component }  from 'react'
import {connect} from 'react-redux'
import { addItemToCart } from '../store/cartReducer'

class AddToCartButton extends Component {
	constructor(){
		super()
		this.state = {
			clicked: false
		}
		this.handleClick = this.handleClick.bind(this)
	}

	async handleClick(event, product){
		event.preventDefault()
		await this.props.addItemToCart(product)
		this.setState({
			clicked: true
		})
	}

	render(){
		return (
				<div>
				<button type="button" className="btn btn-info" disable={!this.props.product.quantity} onClick={(event) => this.handleClick(event, this.props.product)}>Add To Cart</button>
				{ this.state.clicked && <div className='cart-notif'>Added To Cart!</div> }
				</div>
			)
	}
}

const mapDispatch = dispatch => {
	return {
		addItemToCart: (product) => dispatch(addItemToCart(product))
	}
}

export default connect(null, mapDispatch)(AddToCartButton)