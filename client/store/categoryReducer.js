import axios from 'axios'

// ACTION TYPES
 export const SET_CATEGORIES = 'SET_CATEGORIES'
 const LOADING_CATEGORIES = 'LOADING_CATEGORIES'
 const LOADING_PROBLEM = 'LOADING_PROBLEM'

//  INITIAL STATE

const categories = {
  list: [],
  isLoading: false,
  gotError: false
}

// ACTION CREATORS
export const setCategories = categoriesList => ({
  type: SET_CATEGORIES,
  categoriesList
})

// THUNK CREATORS
export const fetchCategories = () => async dispatch =>{
  try{
    const {data} = await axios.get('/api/categories')
    console.log('')
    dispatch(setCategories(data))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function (state = categories, action) {
  console.log('ACTION', action.type)
  switch(action.type){
    case SET_CATEGORIES: {
      return {...state, list: action.categoriesList, isLoading: false, gotError: false}
    }
    case LOADING_CATEGORIES:
      return {...state, isLoading: true}
    case LOADING_PROBLEM:
      return {...state, gotError: true}
    default:
      return state
  }
}
