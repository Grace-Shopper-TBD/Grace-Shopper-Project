import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ProductItem from './ProductItem';

//make sure to import any thunks here! We may add a mapDispatch later

const ProductList = ({products}) => {
    console.log('these are the products in ProductList', products)
    if(!products){
        return (
            <div>
            <h2>There are no vacations available!</h2>
            </div>
        )
    }
    
    return (
        <div>
                <div className='container'>
                    <div className='row mb-2'>
                    {
                        products.map((product) => (
                            <div key={product.id}>
                                <ProductItem product={product}/>
                            </div>
                        ))
                    }
                    </div>
                </div>                                     
        </div>
    )
}

const mapState = (state) => {
    return {
    products: state.product.list,
    isLoading: state.product.isLoading,
    gotError: state.product.gotError
}}



export default connect(mapState,null)(ProductList)