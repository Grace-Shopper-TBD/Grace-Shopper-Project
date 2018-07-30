import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const UserItem = (props) => {
  console.log(props.user)
  return (
          <div>
            <h3>{props.user.email}</h3>
            <div>
              <button type= 'button' onClick = {props.del} value={props.user.id}>Delete</button>
              {!props.user.isAdmin && <button type='button' onClick = {props.promote} value={props.user.id}>Make Admin</button>}
            </div>
          </div>
          )
}

export default UserItem
