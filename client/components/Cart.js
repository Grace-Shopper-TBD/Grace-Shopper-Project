import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ProductItem from './ProductItem';
import { fetchCart, loadingCart } from '../store/cartReducer'
import { fetchProducts } from '../store/productReducer'
//import any thunks

class Cart extends Component {
	componentDidMount(){
		this.props.loadCart()
		this.props.setProducts()
		this.props.fetchCart()
	}

	render(){
		const lineItems = this.props.cart.cart
	    const products = this.props.products
		console.log('line item quantity', lineItems.quantity)
		

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
	            		<ProductItem product={products.find(product => product.id === lineItem.productId)} />
	            		<form>
					      <label>Quantity</label>
					      <select name='quantity'>
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
		setProducts: () => dispatch(fetchProducts())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)