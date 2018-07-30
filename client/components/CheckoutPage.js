
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import thunks for new order and clear cart
import Checkout from './Checkout';

const CheckoutPage = (props) => {
    const {handleSubmit, successPayment} = props
    const cart = props.cart
    const products = props.products
    //find method for getting particular products

    return (
        <div className="container">
            <div className="py-5 text-center">
                <h2>Checkout form</h2>
            </div>

            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your cart</span>
                    <span className="badge badge-secondary badge-pill">3</span>
                    </h4>

                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">Product name</h6>
                                <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$12</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">Second product</h6>
                                <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$8</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">Third item</h6>
                                <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$5</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between bg-light">
                            <div className="text-success">
                                <h6 className="my-0">Promo code</h6>
                                <small>EXAMPLECODE</small>
                            </div>
                            <span className="text-success">-$5</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>$20</strong>
                            </li>
                        </ul>

                        <form className="card p-2">
                            <div className="input-group">
                            <input type="text" className="form-control" placeholder="Promo code"/>
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-secondary">Redeem</button>
                            </div>
                            </div>
                        </form>


                        
                </div>


            </div>
        </div>

    )

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
                items: cart.map((element, index) => ({
                    product: element.product, 
                    quantity: element.quantity, 
                    price: element.product.price
                })),
                recipientName, confirmationEmail, recipientAddress, recipientPhone, specialInstructions
            }
            // dispatch(makeNewOrder(userid, order)) or whatever the thunk is called for making a new order
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
		products: state.product.list
	}
}

export default connect(mapState, null)(CheckoutPage)