import React, {Component} from 'react'
import {connect} from 'react-redux'

class ProductForm extends Component {
  constructor(){
    super()
    this.state ={
      title:'',
      price:0.00,
      quantity:0,
      photo:'',
      description:''

    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  componentDidMount(){
    console.log(this.props)
    if (this.props.state){
      this.setState({...this.props.state})
    }
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.submit(this.state)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render(){

    return (
          <form id="productForm" onSubmit={this.handleSubmit}>
            <label>Title</label>
            <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
            <label>Description</label>
            <input type='text' name='description' value={this.state.description} onChange={this.handleChange} />
            <label>Quantity</label>
            <input type='text' name='quantity' value={this.state.quantity} onChange={this.handleChange} />
            <label>Price</label>
            <input type='text' name='price' value={
              this.state.price} onChange={this.handleChange} />
            <label>image Url</label>
            <input type='text' name='photo' value={this.state.photo} onChange={this.handleChange}/>
            <button type='submit'>Submit</button>
          </form>

            )
  }
}

const mapState = (state) => {
  return {
    list:state.product.list
  }
}

export default connect(mapState)(ProductForm)
