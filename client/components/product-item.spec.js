import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProductList from './ProductList'
import ProductItem from './ProductItem'

enzyme.configure({ adapter: new Adapter() });


describe("Product components", () => {
    describe('ProductItem', () => {
        let productData, productWrapper
    
        beforeEach("Create <ProductItem/> wrapper", () => {
        productData = 
            {
                photo: 'http://covermyfb.com/media/covers/9151-beach.jpg',
                title: 'Italy',
                price: '1500.00',
                availability: 'Available'
            }
        
        productWrapper = shallow(<ProductItem product = {productData}/>)
        });
        
        it('renders an image', () => {
            expect(productWrapper.find('img')).to.have.length(1)
        })

        it("includes the product title as an h5", () => {
            expect(productWrapper.find("h5").text()).to.be.equal("Italy")
        })

        it("includes the product price as a paragraph", () => {
            expect(productWrapper.find("p").text()).to.be.equal('1500.00')
        })

        it('includes availability as an h3', () => {
            expect(productWrapper.find('h3').text()).to.be.equal('Available')
        })

    
    });
});