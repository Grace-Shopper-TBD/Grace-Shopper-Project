import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchProducts } from '../store/productReducer'
import AdminProductItem from './AdminProductMini'
import {Link} from 'react-router-dom'


class AdminProducts extends Component {

  constructor() {
    super()
  }

  componentDidMount(){
    this.props.fetch()
  }

  render(){
    return(
          <div>
           <h1>Product Info</h1>
           <Link to='/admin/products/new'>Add Product</Link>
            <div>
            {this.props.products.map(product=><AdminProductItem product = {product} key={product.id}/>)}
            </div>

          </div>

           )
  }
}

const mapStateToProps = state => {
    return {
      products: state.product.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetch: ()=> dispatch(fetchProducts)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts)
