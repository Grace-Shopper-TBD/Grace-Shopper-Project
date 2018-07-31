import React, {Component} from 'react'
import LineItem from './LineItem'
import {updateOrderThunk} from '../store/ordersReducer'
import {connect} from 'react-redux'

const status = ['CREATED', 'PROCESSING', 'COMPLETED']

class Order extends Component {
  constructor(){
    super()
    this.handleClick=this.handleClick.bind(this)
  }

  handleClick(evt){
      let newOrder = {id:this.props.order.id, status:evt.target.value}
      this.props.update(newOrder)
      this.props.order.status = evt.target.value
      this.forceUpdate()
  }

  render() {
    let {order} = this.props
    let statusIndex = status.indexOf(order.status)
    let nextStatus = status[statusIndex+1]
    return (
            <div>
              <h4>Order Status: {order.status}</h4>
              {order.user && <h4>User: {order.user.name}</h4>}
              <h4>Address:</h4>

              <h5>{order.recipientName}</h5>
              <h5>{order.recipientAddress}</h5>
              {order.products.map((prod)=><LineItem item={prod} key={prod.id} />)}
              {this.props.admin && order.status !== 'CANCELLED' && order.status !== 'COMPLETED' && (
                <div>
                  <button type='button' value= 'CANCELLED' onClick = {this.handleClick}>CANCEL</button>
                  <button type = 'button' value={nextStatus} onClick = {this.handleClick}>{nextStatus}</button>
                </div>
                )}
            </div>
              )
  }
}

const mapDispatch = dispatch => {
  return {
    update: (order)=>dispatch(updateOrderThunk(order))
  }
}

export default connect(null, mapDispatch)(Order)
