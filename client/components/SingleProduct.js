import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getProduct, fetchCart } from '../store';
import { fetchReviews, deleteReviewThunk } from '../store/reviewReducer'
import AddToCart from './AddToCartButton.js'

class SingleProduct extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount(){
        this.props.reviews(+this.props.match.params.id)
    }
    async handleClick(event) {
        event.preventDefault()
        await this.props.reviews(+this.props.match.params.id)
        this.props.history.push(`/products/${this.props.match.params.id}/addReview`)
    }
    async handleDelete (event) {
        event.preventDefault()
        const reviewId=event.target.value
        await this.props.deleteReview(reviewId)
    }
    render(){
        if(Object.keys(this.props.product).length){
            const product = this.props.product
            const reviews = this.props.review.list
            return(
                <div key={product.id}>
                    <h1>{product.title}</h1>
                    <img src={product.photo}/>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                    <p>{product.availability}</p>
                    <AddToCart product={product} />
                    <div>
                        <h3>Reviews For {product.title}</h3>
                        {
                            reviews.map((review) => (
                                <div key={review.id}>
                                    <p>{review.text}</p>
                                    {(!review.user) ? <p>Submitted By: Anonymous </p>: <p>Submitted By: {review.user.name}</p>}
                                    {((!!Object.keys(this.props.user) && review.user) && (this.props.user.id === review.user.id)) ? <button type='button' className='btn btn-danger' value={review.id} onClick={this.handleDelete}>Remove Review</button> : ''}
                                </div>
                            ))
                        }
                        <button type='submit' className="btn btn-info" onClick={this.handleClick}>Add Review</button>
                    </div>
                </div>
        )
        } else {
            return (
                <h1>...Loading</h1>
            )
        }
    }
}

const mapState = (state, {match}) => {
    console.log('coming into mapstate',state.product)
    return {
        product: state.product.list.find(product => product.id === Number(match.params.id)),
        review: state.review,
        user: state.user
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        getCart: () => {
            dispatch(fetchCart())
        },
        reviews: (id) => {
            dispatch(fetchReviews(id))
        },
        deleteReview: (reviewToBeDeleted) => {
            dispatch(deleteReviewThunk(reviewToBeDeleted))
        }
    }
}


export default connect(mapState, mapDispatch)(SingleProduct)
