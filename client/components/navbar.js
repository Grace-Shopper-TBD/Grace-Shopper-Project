import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import store, {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav id='navbar' className="navbar navbar-expand-md navbar-light fixed-top" style={{'backgroundColor': '#82c9b8'}}>
      <a className='navbar-brand' href='/'>TBD</a>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            {/*The code below is not very DRY but when the navbar item Trip Catalog is not included in each condition
              the navbar items stack on top of each other
            */}
            {isLoggedIn ? (
              <span>
              {/* The navbar will show these links after you log in */}
                <ul className="navbar-nav mr-auto">

                  <li className='nav-item'>
                    <Link className="nav-link" to="/products">Trip Catalog</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/user">Home</Link>
                  </li>
                  
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleClick}>Logout</a>
                  </li>
                </ul>
              </span>
              
          ) : (
            <span>
            {/* The navbar will show these links before you log in */}
              <ul className="navbar-nav mr-auto">
                  <li className='nav-item'>
                    <Link className="nav-link" to="/products">Trip Catalog</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
              </ul>
            </span>
          )}
        </div>         

      <ul className= "navbar-nav mr-auto">
        
          <ul className= "navbar-nav mr-auto">
            <li>
              <Link  className="navbar-link" to='/orders/cart'><img src="http://icons.iconarchive.com/icons/iconsmind/outline/32/Shopping-Cart-icon.png" /></Link>
              <span>       </span>
              <span>{store.getState().cart.cart.length}</span>
              </li>
          </ul>
      </ul>
      </nav>
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
