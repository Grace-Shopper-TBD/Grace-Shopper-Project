import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserOrders} from '../store/ordersReducer'
import Order from './Order'

class Orders extends Component {
  constructor(){
    super()
  }

  componentDidMount(){
    this.props.fetch(this.props.user.id)
  }

  render(){
    console.log(this.props)
    if(this.props.orders.length){
      return (
              <div>
              <h2>Orders</h2>
              {this.props.orders.map((order) => <Order order = {order} key={order.id} admin = {false}/>)}
              </div>
              )
    }
    else return (
                 <h1>No Orders Available</h1>
                 )
  }
}
const mapState = (state)=>{
  return {
    orders: state.orders.list,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetch: (id)=> dispatch(getUserOrders(id)),
  }
}

export default connect(mapState, mapDispatch)(Orders)
