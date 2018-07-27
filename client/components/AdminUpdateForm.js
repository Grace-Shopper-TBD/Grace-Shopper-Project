import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changeProduct} from '../store/productReducer'
import AdminProductForm from './AdminProductForm'


class UpdateProd extends Component {
  constructor(){
    super()
    this.submit = this.submit.bind(this)
  }
  submit(prod){
    this.props.change(prod)
  }

  render(){
    return(
           <AdminProductForm submit={this.submit} state={this.props.product} />
           )
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    change:(prod)=>dispatch(changeProduct(prod, ownProps))
  }
}

const mapProps = (state, {match})=> {
  return {
    product: state.product.list.find(prod=>prod.id=== +match.params.id)
  }
}

export default connect(mapProps,mapDispatch)(UpdateProd)
