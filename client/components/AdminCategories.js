import React, {Component} from 'react'
import {connect} from 'react-redux'
import Category from './SingleCategory'
import {fetchCategories, addCategoryToDatabase} from '../store/categoryReducer'

class Categories extends Component {
  constructor(){
    super()
    this.state={
      clicked:false,
      box:''
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.addLine=this.addLine.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }
  handleChange(evt){
    this.setState({box:evt.target.value})
  }
  componentDidMount(){
    this.props.fetch()
  }

  handleAdd(evt){
    evt.preventDefault()
    this.props.add({name:this.state.box})
    console.log(this.state.box)
    this.setState({clicked:false, box:''})

  }

  addLine(){
    this.setState({clicked: !this.state.clicked})
  }

  render(){
    if(this.props.categories){
      return (
              <div>
              <h2>Categories</h2>
              {this.props.categories.map((cat) => <Category category = {cat} key={cat.id} />)}
              {this.state.clicked &&  (
            <form onSubmit={this.handleAdd}>
            <input type='text' name='new' value={this.state.box} onChange={this.handleChange}/>
            <button type='submit'>submit</button>
            </form>
            )
            }
            <button type='button' onClick={this.addLine}>{this.state.clicked ? 'x':'add'}</button>

              </div>
              )
    }
  }
}
const mapState = (state)=>{
  return {
    categories: state.category.list
  }
}

const mapDispatch = dispatch => {
  return {
    fetch: ()=> dispatch(fetchCategories()),
    add: (cat)=>dispatch(addCategoryToDatabase(cat))
  }
}

export default connect(mapState, mapDispatch)(Categories)
