import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewProduct} from '../store/productReducer'
import Form from './AdminProductForm.js'

class NewProduct extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit(res){
    this.props.add(res)
  }

  render() {
    return (
            <Form submit = {this.submit} />
            )
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    add: (product) => dispatch(addNewProduct(product, ownProps))
  }
}

export default connect(null, mapDispatch)(NewProduct)
