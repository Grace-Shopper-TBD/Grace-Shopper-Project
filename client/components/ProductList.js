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
            <main role="main">
                <div className="album py-5 bg-light">
                    <div className='container'>
                        <h1>All Vacations</h1>
                        {
                            products.map((product) => (
                                <div key={product.id}>
                                    <ProductItem product={product}/>
                                </div>
                            ))
                        }
                    </div>        
                </div>       
            </main>        
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