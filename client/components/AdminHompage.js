import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const AdminHompage = (props) => {
  return (
          <div className="list-group col-2">
            <p className="list-group-item list-group-item-action active">Administrative Tasks</p>
            <Link to='/admin/users' className="list-group-item list-group-item-action">Users</Link>
            <Link to='/admin/products' className="list-group-item list-group-item-action">Products</Link>
            <Link to = '/admin/categories' className="list-group-item list-group-item-action">Categories</Link>
            <Link to='/admin/orders' className="list-group-item list-group-item-action">Orders</Link>
          </div>
          )
}

export default AdminHompage
