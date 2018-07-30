import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changeCategory, deleteCategoryFromDatabase} from '../store/categoryReducer'

class Category extends Component {
  constructor(){
    super()
    this.state= {
      clicked: false,
      name:''
    }
    this.editClick = this.editClick.bind(this)
    this.deleteClick = this.deleteClick.bind(this)
    this.changeClick = this.changeClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount(){
    this.setState({name:this.props.category.name})
  }

  handleChange(evt){
    this.setState({name:evt.target.value})
  }

  editClick(){
    this.setState({clicked:true})
  }

  deleteClick(){
    this.props.delete(this.props.category.id)
  }
  changeClick(){
    this.props.change({name:this.state.name, id:this.props.category.id})
    this.setState({clicked:false})

  }

  render(){
    return(
           <div>
           {this.state.clicked ? (<div>
                <input type='text' name='category' value={this.state.name} onChange={this.handleChange} />
                <button type='button' onClick={this.changeClick}>submit</button>
               </div>) : (<div>
                 <h3>{this.state.name}</h3>
                 <button type='button' onClick={this.editClick}>edit</button>
              </div>)
             }
             <button type='button' onClick={this.deleteClick}>x</button>
            </div>
           )
  }
}

const mapDispatch = (dispatch) =>{
  return {
    delete: (id) => dispatch(deleteCategoryFromDatabase(id)),
    change: (cat) => dispatch(changeCategory(cat))
  }
}

export default connect(null,mapDispatch)(Category)
