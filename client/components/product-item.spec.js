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

        it("includes the product title as an p", () => {
            expect(productWrapper.find("p").first().text()).to.be.equal("Italy")
        })

        it("includes the product quantity as an h3 tag", () => {
            expect(productWrapper.find("h3").text()).to.be.equal(' Left')
        })
    });
});
