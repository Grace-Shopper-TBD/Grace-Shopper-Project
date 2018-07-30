import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getFilteredProducts, fetchProducts } from '../store/productReducer'
import { fetchCategories } from '../store/categoryReducer'

class Sidebar extends Component {

	constructor(){
	 	super()
	 	this.handleChange = this.handleChange.bind(this)
	 }

	componentDidMount(){
		this.props.fetchCategories()
	}

	async handleChange(event){
		event.persist()
		await event.target.value === 'All' ? this.props.fetchProducts() : this.props.filterProducts(event.target.value)
		this.props.history.push(`/products?category=${event.target.value}`)
	}

	render(){
		const categories = this.props.categories.list
		const { isLoading, gotError } = this.props.categories

		if (isLoading) {
			return ( <h1>Loading...</h1> )
		}

		if (gotError) {
			return ( <h1>Oh no!</h1> )
		}

		return (
				<form>
			      <label>Filter By Category</label>
			      <select name='categoryName' onChange={this.handleChange} >
			        <option value='All'>All</option>
			        {
			          categories.map(category => (
			            <option key={category.id} value={category.id}>{category.name}</option>
			          ))
			        }
			      </select>
				</form>
			)
		}
}

const mapStateToProps = (state, ownProps) => {
		return {
			categories: state.category,
			...ownProps
		}
}

const mapDispatchToProps = dispatch => {
		return {
			fetchCategories: () => dispatch(fetchCategories()),
			filterProducts: (categoryId) => dispatch(getFilteredProducts(categoryId)),
			fetchProducts: () => dispatch(fetchProducts())
		}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))
