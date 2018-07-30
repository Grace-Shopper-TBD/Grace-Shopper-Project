import React, { Component } from 'react'
import { connect } from 'react-redux';
import { filterProducts, fetchProducts } from '../store/productReducer'
import { fetchCategories } from '../store/categoryReducer'

class Sidebar extends Component {

	constructor(){
	 	super()
	 	this.state = {
	 		categoryName : ''
	 	}
	 	this.handleChange = this.handleChange.bind(this)
	 }

	componentDidMount(){
		this.props.fetchCategories()
	}

	async handleChange(event){
		event.persist()
		await this.props.fetchProducts()
		await this.setState({
			categoryName: event.target.value
		})
		this.state.categoryName === 'All' ? this.props.fetchProducts() : this.props.filterProducts(this.state.categoryName)
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
			            <option key={category.id} value={category.name}>{category.name}</option>
			          ))
			        }
			      </select>
				</form>
			)
		}
}

const mapStateToProps = state => {
		return {
			categories: state.category
		}
}

const mapDispatchToProps = dispatch => {
		return {
			fetchCategories: () => dispatch(fetchCategories()),
			filterProducts: (categoryName) => dispatch(filterProducts(categoryName)),
			fetchProducts: () => dispatch(fetchProducts())
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
