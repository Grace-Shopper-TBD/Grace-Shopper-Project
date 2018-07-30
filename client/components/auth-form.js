import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, handleSubmit, displayName, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name} className='form-signin'>
      <div className='container'>
        <i className="fa fa-globe-americas fa-cog"></i>
      </div>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
        </div>
        <div>          
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div className="g-signin2" data-onsuccess="onSignIn">
        <a href="/auth/google">{displayName} with Google</a>      
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
