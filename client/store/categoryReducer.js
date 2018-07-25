import axios from 'axios'

/*
 * ACTION TYPES
 */

 export const SET_CATEGORIES = 'SET_CATEGORIES';

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
    dispatch(setCategories(data))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function (state = categories, action) {
  switch(action.type){
    case SET_CATEGORIES: {
      return {...state, list: action.categoriesList, isLoading: false, gotError: false}
    }
    default:
      return state
  }
}
