import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AdminHome from './AdminHompage'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const {name} = props



  return (
    <div class="d-flex">
    <div className="list-inline mx-auto justify-content-center">
      <h3>Welcome, {name}!</h3>
      {props.isAdmin && <AdminHome /> }
      <Link to= '/orders' className="list-group-item list-group-item-action">Personal Orders</Link>
    </div>    
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name,
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
