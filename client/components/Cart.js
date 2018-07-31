import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ProductInCart from './ProductInCart';
import { fetchCart, loadingCart, changeQuantity } from '../store/cartReducer'
import { fetchProducts } from '../store/productReducer'

class Cart extends Component {
	constructor(){
		super()
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount(){
		this.props.loadCart()
		this.props.setProducts()
		this.props.fetchCart()
	}

	handleChange(event, quantity, productId) {
		event.preventDefault()
		console.log("quantity", quantity)
		this.props.changeQuantity(productId, quantity)
	}

	render(){
		const lineItems = this.props.cart.cart
	    const products = this.props.products
		

	    if (this.props.cart.isLoading) {
	    	return (<h1>Loading...</h1>)
	    }

	    if (this.props.cart.gotError) {
	    	return (<h1>Oh Noes!</h1>)
	    }

	    return (
	        <div className='container'>
				<h1>Your orders</h1>
				<Link to='/orders/checkout'>
					<button type="button" className="btn btn-info">Proceed To Checkout</button>
				</Link>
	            <ul>
	            { lineItems.map(lineItem => 
	            	(
	            		<div key={lineItem.productId}>
	            		<ProductInCart product={products.find(product => product.id === lineItem.productId)} lineItem={lineItem} />
	            		<form>
					      <label>Quantity</label>
					      <select name='quantity' onChange={(event) => this.handleChange(event, event.target.value, lineItem.productId)}>
					        <option value={lineItem.quantity}>{lineItem.quantity}</option>
					        {
					          [...Array(products.find(product => product.id === lineItem.productId).quantity+1).keys()].map(num => <option key={num} value={num}>{num}</option>)
					        }
						  </select>						  
						</form>
	            		</div>

	            	)
	    		)}
	            </ul>
	        </div>
	    )
	}
    
}

const mapStateToProps = state => {
	return {
		cart: state.cart,
		products: state.product.list
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchCart: () => dispatch(fetchCart()),
		loadCart: () => dispatch(loadingCart()),
		setProducts: () => dispatch(fetchProducts()),
		changeQuantity: (productId, quantity) => dispatch(changeQuantity(productId, quantity))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)