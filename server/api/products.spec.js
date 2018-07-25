/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

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
  }) // end describe('/api/users')
}) // end describe('User routes')