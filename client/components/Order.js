import React, {Component} from 'react'
import LineItem from './LineItem'


class Order extends Component {
  render() {
    let {order} = this.props
    return (
            <div>
              <h4>Order Status: {order.status}</h4>
              <h4>Address:</h4>
              <h5>{order.recipientName}</h5>
              <h5>{order.recipientAddress}</h5>
              {order.products.map((prod)=><LineItem item={prod} key={prod.id} />)}
            </div>
              )
  }
}

export default Order
