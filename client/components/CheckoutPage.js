
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchCart, loadingCart} from '../store/cartReducer'
import { fetchProducts } from '../store/productReducer'
import {makeNewOrder} from '../store/ordersReducer'
import Checkout from './Checkout';
import ProductInCart from './ProductInCart'

class CheckoutPage extends Component {
  
  constructor(){
      super()
      this.state = {
          recipientName: '',
          confirmationEmail: '',
          recipientAddress: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
      }
      
      
      componentDidMount(){
        this.props.fetchCart(),
        this.props.setProducts(),
        this.props.loadCart()
      }

      handleChange(evt){
        this.setState({
          [evt.target.name]: evt.target.value
        })
      }

      
      handleSubmit(evt){
          evt.preventDefault()
          this.props.makeNewOrder(this.state)
      }
      
      render(){
      const lineItems = this.props.cart.cart
      const products = this.props.products
      const user = this.props.user
      const { successPayment } = this.props
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
                      <ul className="list-group mb-3">
                        {
                          lineItems && lineItems.map((lineItem) => (
                            <div key={lineItem.productId} className="info info-horizontal icon icon-primary">
                              <ProductInCart product={products.find(product => product.id === lineItem.productId)} lineItem={lineItem}/> 
                            </div>
                          ))
                        }
                        
                        <li className="list-group-item d-flex justify-content-between bg-light">
                          <div className="text-success">
                            <h6 className="my-0">Promo code</h6>
                            <small>
                            <input type="text" name="discount" className="form-control" placeholder="Discount"/>
                            </small>
                          </div>
                          <span className="text-success">20% Off</span>
                        </li>

                      </ul>
                  </div>                
                </div>

              
                <div className="col-md-6 col-md-offset-2">
                  <p className="description">Enter your details below! Your vacation is just a click away<br />
                  </p>
                    
                  <form onSubmit={this.handleSubmit} role="form" id="contact-form" method="post">
                    <div className="form-group label-floating">
                      <label className="control-label">Recipient Name</label>
                      <input type="text" name="recipientName" className="form-control" placeholder="Name" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group label-floating">
                      <label className="control-label">Confirmation Email</label>
                      <input type="email" name="confirmationEmail" className="form-control" placeholder="Email" onChange={this.handleChange}/>
                      </div>
                    <br/>

                    <div className="form-group label-floating">
                    <label className="control-label">Recipient Address</label>
                    <input type="text" name="recipientAddress" className="form-control" placeholder="Address" onChange={this.handleChange}/>
                    </div>
                    <br/>

                    <Checkout
                    name={'Confirm purchase'}
                    description={"This is only a test page, enter 4242 4242 4242 4242 for credit card"}
                    amount={lineItems.map(lineItem => lineItem.price * lineItem.quantity).reduce((a,b) => a+b, 0)}
                    successPayment={successPayment}
                    />
                  
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
        makeNewOrder(order){
          dispatch(makeNewOrder(order))
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