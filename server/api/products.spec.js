/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const agent = request(app)

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const title = 'Oregon Trail Adventure'
    const description = 'try not to get dysentary'
    const price = '100.00'
    const availability = 'Available'

    beforeEach(() => {
      return Product.create({title, description, price, availability})
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal(title)
      expect(res.body[0].description).to.be.equal(description)
      expect(res.body[0].price).to.be.equal(price)
      expect(res.body[0].availability).to.be.equal(availability)
    })
  })
  describe('POST /api/products/', () => {
    it('should create a new product', () => {
      return agent.post('/api/products')
      .send({title:'working', description:"hey"})
      .expect(200)
      .expect(res => {
        expect(res.body.title).to.equal('working')
      })
    })
  })
  describe ('PUT /api/products/', () => {
    let product;
    beforeEach(()=> {
      return Product.create({title: 'working', description:'hey'})
     .then(createdCat => {
      product=createdCat
    })
   })
    it('should update a category', () => {
      return agent
      .put(`/api/products/${product.id}`)
      .send({title:'works'})
      .expect(200)
      .expect(res => {
        expect(res.body.title).to.equal('works')
      })
    })
  })
})
