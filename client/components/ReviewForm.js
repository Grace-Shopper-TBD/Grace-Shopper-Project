import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addReview } from '../store/reviewReducer'

class ReviewForm extends Component {
  constructor() {
    super()
    this.state ={
      text: '',
      productId: 0
      }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleChange(event){
    this.setState({
      [event.target.name]:event.target.value,
      productId: +this.props.match.params.id
    })
  }
  async handleSubmit(event){
    event.preventDefault();
    const addNewReview=this.state;
    console.log('HANDLE SUBMIT', addNewReview)
    await this.props.post(addNewReview)
    this.props.history.push(`/products/${this.state.productId}`)
  }
  render(){
    const data = this.state
    return(
      <div>
      <p>Write a Review</p>
      <form onSubmit={this.handleSubmit}>
          <label htmlFor='text'>
            <input type='text' name='text' onChange={this.handleChange} value={this.state.text}/>
          </label>
        </form>
        <button type='button' className='btn btn-info' onClick={this.handleSubmit}>Post Review</button>
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  post: newReview => dispatch(addReview(newReview))
})

export default connect(null,mapDispatchToProps)(ReviewForm);
