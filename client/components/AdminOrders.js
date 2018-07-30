import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store/ordersReducer'
import Order from './Order'

class AdminOrders extends Component {
  constructor(){
    super()
  }

  componentDidMount(){
    this.props.fetch()
  }

  render(){
    if(this.props.orders){
      return (
              <div>
              <h2>Orders</h2>
              {this.props.orders.map((order) => <Order order = {order} key={order.id} admin = {true}/>)}
              </div>
              )
    }
  }
}
const mapState = (state)=>{
  return {
    orders: state.orders.list
  }
}

const mapDispatch = dispatch => {
  return {
    fetch: ()=> dispatch(getAllOrders()),
  }
}

export default connect(mapState, mapDispatch)(AdminOrders)
