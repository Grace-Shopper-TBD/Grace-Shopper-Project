/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Category = db.model('category')
const agent = request(app)

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/categories/', () => {
    const romance = "Romance Vacation"

    beforeEach(() => {
      return Category.create({
        name: romance
      })
    })

    it('GET /api/categories', async () => {
      const res = await agent
        .get('/api/categories')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(romance)
    })
  })

  describe('POST /api/categories/', () => {
    it('should create a new category', () => {
      return agent.post('/api/categories')
      .send({name:'working'})
      .expect(200)
      .expect(res => {
        expect(res.body.name).to.equal('working')
      })
    })
  })
  describe ('PUT /api/categories/', () => {
    let category;
    beforeEach(()=> {
      return Category.create({name: 'working'})
     .then(createdCat => {
      category=createdCat
    })
   })
    it('should update a category', () => {
      return agent
      .put(`/api/categories/${cat.id}`)
      .send({name:'works'})
      .expect(200)
      .expect(res => {
        expect(res.body.name).to.equal('works')
      })
    })
  })
  describe('DELETE /api/categories/:id', () => {
    let cat
    beforeEach(() => {
      return Category.create({
        name: 'working'
      }) .then(createdCat => {
        cat = createdCat
      })
    })
    it('should remove category', () => {
      return agent.delete(`/api/categories/${cat.id}`)
      .expect(204)
      .expect( async () => {
        const deletedCat = await Category.findById(catId)
        expect(deletedCat).to.be.an('undefined')
      })
    })
  })
})
