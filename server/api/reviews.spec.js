const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')
const agent = request(app)

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/reviews/', () => {
    const text = `I loved Hawaii!! I can't wait to go back`

    beforeEach(() => {
      return Review.create({text})
    })

    it('GET /api/reviews', async () => {
      const res = await request(app)
        .get('/api/reviews')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].text).to.be.equal(text)
    })
  })
  describe('POST /api/reviews/', () => {
    it('should create a new review', () => {
      return agent.post('/api/reviews')
      .send({text:'I love Italy! It was a beautiful hotel and we ate lots of amazing pasta!'})
      .expect(201)
    })
  })
})

