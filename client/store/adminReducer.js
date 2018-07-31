import axios from 'axios'

// ACTION TYPES
export const POPULATE_USERS = 'POPULATE_USERS'
export const DELETE_USER = 'DELETE_USER'
export const MAKE_ADMIN ='MAKE_ADMIN'
export const IS_LOADING = 'IS_LOADING'
export const GOT_ERROR = 'GOT_ERROR'

//  INITIAL STATE
const admin = {
  isLoading:false,
  error:false,
  users:[]
}

// ACTION CREATORS
const popUsers = (users) => ({
  type:POPULATE_USERS,
  users
})

const delUser = (id) => ({
  type:DELETE_USER,
  id
})

const addUser = (user)=> ({
  type:MAKE_ADMIN,
  user
})

const isLoading = ()=> ({
  type: IS_LOADING
})

const gotError = () => ({
  type:GOT_ERROR
})
// THUNK CREATORS
export const fetchUsers = ()=>async dispatch => {
  try{
    dispatch(isLoading())
    const {data} = await axios.get('/api/users')
    dispatch(popUsers(data))
  } catch (err) {
    dispatch(gotError())
    console.error(err)
  }
}

export const deleteUser = (id) => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`)
    dispatch(delUser(id))
  } catch(err) {
    dispatch(gotError())
    console.error(err)
  }
}

export const promoteUser = (id) => async dispatch => {
  try {
    let {data} = await axios.put(`/api/users/${id}`, {isAdmin:true})
    dispatch(delUser(id))
    dispatch(addUser(data))
  } catch(err) {
    dispatch(gotError())
    console.error(err)
  }
}
// REDUCER
export default function (state = admin, action) {
  switch(action.type){
    case POPULATE_USERS: {
      return {...state, users:action.users}
    }
    case DELETE_USER: {
      return {...state, users:state.users.filter(user =>  user.id !== +action.id)}
    }

    case MAKE_ADMIN: {
      return {...state, users: [...state.users, action.user]}
    }
    case IS_LOADING: {
      return {...state, isLoading:true}
    }
    case GOT_ERROR: {
      return {...state, gotError:true}
    }
    default:
      return state
  }
}
