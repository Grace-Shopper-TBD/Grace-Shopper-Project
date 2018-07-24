const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(async () =>{
    const Product1 = await Product.create({
      title: 'Hawaii',
      description: 'Lets get some sun!',
      price: 2000,
      quantity: 2,
      availability: 'Available'
    })
    const Product2 = await Product.create({
      title: 'Italy',
      description: 'Lets eat some pasta!',
      price: 1500,
      quantity: 2,
      availability: 'Available'
    })
  })
  describe('Class Methods', () => {
    it('should find product by name',
  async() => {
    const product = await Product.findByName('Hawaii')
    expect(product.length).to.be.equal(1);
    expect(product[0].title).to.be.equal('Hawaii');
  })
  })
})
