import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ProductItem from './ProductItem';
//make sure to import any thunks here! We may add a mapDispatch later

const ProductList = ({products}) => {
    console.log('incoming products', products)
    if(!products){
        return (
            <div>
            <h2>There are no vacations available!</h2>
            </div>
        )
    }

    return (
        <div>
            <h1>All Vacations</h1>
            <ProductItem products={products}/>
        </div>
    )
}

const mapState = (state) => {
    console.log('this is the state for the component', state.product.list)
    return {
    products: state.product.list,
    isLoading: state.product.isLoading,
    gotError: state.product.gotError
}}



export default connect(mapState,null)(ProductList)