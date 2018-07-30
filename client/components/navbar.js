import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav id='navbar' className="navbar navbar-default navbar-fixed-top">
      <div className='container-fluid'>
      <div className='navbar-header'>
      <a className='navbar-brand' href='#'>Totally Bomb Destinations (TBD)</a></div>
        <ul className="nav navbar-nav">
        <li class='active'>
        <Link className="navbar-link" to="/products">Trip Catalog</Link>
        </li>
        </ul>
        <ul className= "nav navbar-nav navbar-right">
      {isLoggedIn ? (
        <span>
          {/* The navbar will show these links after you log in */}
          <ul>
          <li>
          <Link className="navbar-link" to="/home">Home</Link>
          </li>
          <li>
          <a className="navbar-link" href="#" onClick={handleClick}>
            Logout
          </a>
          </li>
          </ul>
        </span>
      ) : (
        <span>
          {/* The navbar will show these links before you log in */}
          <ul className= "nav navbar-nav navbar-right">
          <li>
          <Link className="navbar-link" to="/login">Login</Link>
          </li>
          <li>
          <Link className="navbar-link" to="/signup">Sign Up</Link>
          </li>
          </ul>
        </span>
      )}
      <ul className= "nav navbar-nav navbar-right">
      <li>
        <Link  className="navbar-link" to='/orders/cart'><img src="http://icons.iconarchive.com/icons/iconsmind/outline/32/Shopping-Cart-icon.png" /></Link>
        </li>
        </ul>
      </ul>
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
