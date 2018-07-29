import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <div id='titleContainer'>
    <div id='title'>
    <h1>Totally Bomb Destinations (TBD)</h1></div></div>
      <ul className='container'>
      <div className='tripCatalogContainer'>
      <div className='tripCatalog'>
        <Link to="/products">Trip Catalog</Link>
        </div></div>
      {isLoggedIn ? (
        <div className='postLogin'>
          {/* The navbar will show these links after you log in */}
          <div className='cartImage'>
        <Link to='/orders/cart'><img src="http://icons.iconarchive.com/icons/iconsmind/outline/32/Shopping-Cart-icon.png" /></Link></div>
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          </div>
      ) : (
        <div className='preLogin'>
          {/* The navbar will show these links before you log in */}
          <div className='cartImage'>
        <Link to='/orders/cart'><img src="http://icons.iconarchive.com/icons/iconsmind/outline/32/Shopping-Cart-icon.png" /></Link></div>
          <div className='login'>
          <Link to="/login">Login</Link></div>
          <div className='signup'> <Link to="/signup">Sign Up</Link>
        </div></div>
      )}
      </ul>
      </div>
    // <hr />
  // </div>
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
