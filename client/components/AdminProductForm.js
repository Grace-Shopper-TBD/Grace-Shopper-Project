//if we have time
//add categories
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
            <div className="form-group">
              <label>Title</label>
              <input type='text' name='title' className="form-control" value={this.state.title} onChange={this.handleChange} placeholder="Enter Title"/>
              <label>Description</label>
              <input type='text' name='description' className="form-control" value={this.state.description} onChange={this.handleChange} placeholder="Enter A Description"/>
              <label>Quantity</label>
              <input type='text' name='quantity' className="form-control" value={this.state.quantity} onChange={this.handleChange}/>
              <label>Price</label>
              <input type='text' name='price' className="form-control" value={
                this.state.price} onChange={this.handleChange} />
              <label>image Url</label>
              <input type='text' name='photo' vclassName="form-control" alue={this.state.photo} onChange={this.handleChange}/>
              <div className="container">
                <button type='submit' className="btn btn-primary">Submit</button>                          
              </div>
            </div>
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
