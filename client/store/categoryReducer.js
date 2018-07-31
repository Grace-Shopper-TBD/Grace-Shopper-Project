import axios from 'axios'

// ACTION TYPES
 export const SET_CATEGORIES = 'SET_CATEGORIES'
 const LOADING_CATEGORIES = 'LOADING_CATEGORIES'
 const LOADING_PROBLEM = 'LOADING_PROBLEM'
 const DELETE_CATEGORY ='DELETE_CATEGORY'
 const ADD_CATEGORY = 'ADD_CATEGORY'

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

const deleteCategory = id => ({
  type:DELETE_CATEGORY,
  id
})

const addCategory = cat => ({
  type:ADD_CATEGORY,
  cat
})

const isLoading = ()=> ({
  type: LOADING_CATEGORIES
})

const error = () => ({
  type:LOADING_PROBLEM
})

// THUNK CREATORS
export const fetchCategories = () => async dispatch =>{
  try{
    dispatch(isLoading())
    const {data} = await axios.get('/api/categories')
    dispatch(setCategories(data))
  } catch (err) {
    dispatch(error())
    console.error(err)
  }
}

export const changeCategory = (cat) => async dispatch => {
  try{
    const {data} = await axios.put(`/api/categories/${cat.id}`, cat)
    dispatch(deleteCategory(cat.id))
    dispatch(addCategory(cat))
  } catch(err) {
    dispatch(error())
    console.error(err)
  }
}

export const addCategoryToDatabase = (cat) => async dispatch => {
  try{
    const {data} = await axios.post('/api/categories', cat)
    dispatch(addCategory(data))
  } catch(err) {
    dispatch(error())
    console.error(err)
  }
}

export const deleteCategoryFromDatabase = (id) => async dispatch => {
  try{
    const {data} = await axios.delete(`/api/categories/${id}`)
    dispatch(deleteCategory(id))
  } catch(err) {
    dispatch(error())
    console.error(err)
  }
}

// REDUCER
export default function (state = categories, action) {
  switch(action.type){
    case SET_CATEGORIES: {
      return {...state, list: action.categoriesList, isLoading: false, gotError: false}
    }
    case LOADING_CATEGORIES:
      return {...state, isLoading: true}
    case LOADING_PROBLEM:
      return {...state, gotError: true}
    case ADD_CATEGORY:
      return {...state, list: [...state.list, action.cat]}
    case DELETE_CATEGORY:
      return {...state, list: state.list.filter(cat=>cat.id!==action.id)}
    default:
      return state
  }
}
