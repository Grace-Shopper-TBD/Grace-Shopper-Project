import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const AdminHompage = (props) => {
  return (
          <div>
            <h1>Administrative Tasks</h1>
            <Link to='/admin/users'>Users</Link>
            <Link to='/admin/products'>Products</Link>
            <Link to = '/admin/categories'>Categories</Link>
            <Link to='/admin/orders'>Orders</Link>
          </div>
          )
}

export default AdminHompage
