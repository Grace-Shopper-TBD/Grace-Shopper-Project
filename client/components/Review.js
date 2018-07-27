import React, {Component} from 'react'
import { connect } from 'react-redux'
import {fetchReviews} from '../store/reviewReducer'
import store from '../store'

const Reviews = props => {
  console.log('REVIEWS props!', props.reviews)
  // const reviewsData = props.fetchReviewsThunk()
  return (
    <div>
      <p>Hello World!</p>
      {/* {reviews.map(review=> {
        console.log('MAP', review)
        return (
          <div key={review.id}>
            {review.text}
          </div>
        )
      })} */}
    </div>
  )
}







const mapStateToProps = state => ({
  reviews: state.review.list
})

const mapDispatchToProps = dispatch => ({
  fetchReviewsThunk: () => dispatch(fetchReviews())
})


// export default connect(null,mapDispatchToProps)(Reviews)

export default Reviews
