
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchCart, loadingCart} from '../store/cartReducer'
import { fetchProducts } from '../store/productReducer'
// import thunks for new order and clear cart
import Checkout from './Checkout';
import ProductItem from './ProductItem'

class CheckoutPage extends Component {


    componentDidMount(){
      this.props.fetchCart(),
      this.props.setProducts(),
      this.props.loadCart()
    }

    render(){
      const lineItems = this.props.cart.cart
      console.log('just the cart', this.props.cart)
      const products = this.props.products
      console.log('line items in the order', lineItems)
      return (
          <div className="contact-page">
            <div id="contactUsMap" className="big-map"></div>

            <div className="main main-raised contact-content">
              <div className="container">
                <h2 className="title">Complete Your Order</h2>

                <div className="col-md-4">
                    {
                      lineItems && lineItems.map((lineItem) => (
                        <div key={lineItem.productId} className="info info-horizontal icon icon-primary">
                          <ProductItem product={products.find(product => product.id === lineItem.productId)} />
                          <div className="material-icons">
                          <img src={products.photo} alt="..." width="150" />
                          </div>

                            <div className="description">
                            <h4 className="info-title">{lineItem.price}</h4>
                            <p>
                              Quantity: {lineItem.quantity} <br />
                            </p>
                          </div>  
                        </div>
                      ))
                    }
                </div>
              
              </div>
            </div>
          </div>
  
      )
    }


}

const mapDispatch = (dispatch) => {
    return {
        handleSubmit(evt, userid, cart){
            evt.preventDefault()
            //submit cart data into the user's orders
            let {recipientName, confirmationEmail, recipientAddress, recipientPhone, specialInstructions} = evt.target;
            [recipientName, confirmationEmail, recipientAddress, recipientPhone, specialInstructions] = [recipientName, confirmationEmail, recipientAddress, recipientPhone, specialInstructions].map(x => x.value)
            let order = {
                status: 'CREATED', 
                isCart: false,
                recipientName, confirmationEmail, recipientAddress
            }
            // dispatch(makeNewOrder(userid, order)) or whatever the thunk is called for making a new order
        },
        successPayment() {
            alert('Payment Successful');
            dispatch(clearCart())
          },
        fetchCart(){
          dispatch(fetchCart())
        },
        loadCart(){
          dispatch(loadingCart())
        },
        setProducts(){
          dispatch(fetchProducts())
        }
    }
}

const mapState = state => {
	return {
		cart: state.cart,
    products: state.product.list,
    user: state.user
	}
}

export default connect(mapState, mapDispatch)(CheckoutPage)