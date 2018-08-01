import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

const LineItem = (props) => {
  const item = props.item
  if (props.product){
    return (
          <Link to = {`/products/${item.productId}`}>
            <h6>{props.product.title}</h6>
            <h6>quantity:{item.quantity}</h6>
            <h6>price: {item.price} </h6>
          </Link>
          )
  }
  return (null)
}

const mapState = (state, props) => {
  return {
    product: state.product.list.find(product => product.id === props.item.productId)
  }
}
export default connect(mapState)(LineItem)
