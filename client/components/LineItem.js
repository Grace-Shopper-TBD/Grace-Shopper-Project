import React, {Component} from 'react'

const LineItem = ({item}) => {
  return (
        <div>
          <h6>{item.title}</h6>
          <h6>quantity:{item.lineItem.quantity}</h6>
          <h6>price: {item.lineItem.price} </h6>
        </div>
          )
}

export default LineItem
