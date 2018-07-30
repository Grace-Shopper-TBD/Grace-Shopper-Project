import React, {Component} from 'react'
import { Link } from 'react-router-dom'

const LineItem = ({item}) => {
  return (
        <Link to = {`/products/${item.id}`}>
          <h6>{item.title}</h6>
          <h6>quantity:{item.lineItem.quantity}</h6>
          <h6>price: {item.lineItem.price} </h6>
        </Link>
          )
}

export default LineItem
