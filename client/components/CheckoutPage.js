
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchCart, loadingCart} from '../store/cartReducer'
import { fetchProducts } from '../store/productReducer'
// import thunks for new order and clear cart
// we also need to invoke handleSubmit within the form
import Checkout from './Checkout';
import ProductInCart from './ProductInCart'

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
      const user = this.props.user
      console.log('line items in the order', lineItems)
      return (
          <div className="contact-page">
            <div id="contactUsMap" className="big-map"></div>

            <div className="main main-raised contact-content">
              <div className="container">
                <h2 className="title">Complete Your Order</h2>

                <div className="row">
                  <div className="col-md-4 order-md-2 mb-4">
                      <h4 className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted">Your cart</span>
                      <span className="badge badge-secondary badge-pill">{lineItems.quantity}</span>
                      </h4>
                      {
                        lineItems && lineItems.map((lineItem) => (
                          <div key={lineItem.productId} className="info info-horizontal icon icon-primary">
                            <ProductInCart product={products.find(product => product.id === lineItem.productId)} />
                            <div className="material-icons">
                            </div>

                              <div className="description">
                              <p>
                                Quantity: {lineItem.quantity} <br />
                              </p>
                            </div>  
                          </div>
                        ))
                      }
                  </div>                
                </div>

              
                <div className="col-md-6 col-md-offset-2">
                  <p className="description">Enter your details below! Your vacation is just a click away<br />
                  </p>
                    
                  <form role="form" id="contact-form" method="post">
                    <div className="form-group label-floating">
                      <label className="control-label">Recipient Name</label>
                      <input type="text" name="recipientName" className="form-control" placeholder="Name"/>
                    </div>

                    <div className="form-group label-floating">
                      <label className="control-label">Confirmation Email</label>
                      <input type="email" name="confirmationEmail" className="form-control" placeholder="Email"/>
                      </div>
                    <br/>

                    <div className="form-group label-floating">
                    <label className="control-label">Recipient Address</label>
                    <input type="text" name="recipientAddress" className="form-control" placeholder="Address"/>
                    </div>
                    <br/>
                  
                  </form>
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
            // dispatch(makeNewOrder(userid, order)) we need the thunk for a creating a new order before we can invoke handleSubmit
        },
        fetchCart(){
          dispatch(fetchCart())
        },
        loadCart(){
          dispatch(loadingCart())
        },
        setProducts(){
          dispatch(fetchProducts())
        },
        successPayment() {
            alert('Payment Successful');
            dispatch(clearCart())
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