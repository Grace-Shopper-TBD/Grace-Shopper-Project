import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchUsers, deleteUser, promoteUser } from '../store/adminReducer'
import UserItem from './UserBlock'

class AdminUsers extends Component {

  constructor(){
    super()
    this.deleteButton = this.deleteButton.bind(this)
    this.promote = this.promote.bind(this)

   }

  deleteButton(evt){
    this.props.delete(evt.target.value)
  }

  promote(evt){
    this.props.promote(evt.target.value)
  }

  componentWillMount(){
    this.props.fetch()
  }

  render(){
    return(
          <div>
           <h1>User Info</h1>
           {this.props.users.map(user=><UserItem user= {user} key={user.id} del={this.deleteButton} promote ={this.promote}/>)}
          </div>

           )
  }
}

const mapStateToProps = state => {
    return {
      users: state.admin.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetch: () => dispatch(fetchUsers()),
      delete: (id) => dispatch(deleteUser(id)),
      promote: (id) => dispatch(promoteUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
