/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const agent = require('supertest')(app);

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('GET /api/users')
  describe('POST /api/users/', () => {
    it('should create a User', async () => {
      const response = agent.post('/api/users').send({email:'test@email.com'}).expect(201)
    })
  }) // end describe ('POST /api/users')
  describe('PUT /api/users/:userId', () => {
    let user;
    beforeEach(() => {
      return User.create({
        email: 'cody@email.com'
      })
        .then((createdUser) => {
        user = createdUser;
      });
    });
    it('should update a User', () => {
    return agent
    .put(`/api/users/${user.id}`)
    .send({email:'test@gmail.com'})
    .expect(200)
    .expect((res) => {
      expect(res.body.email).to.equal('test@gmail.com')
      })
    })
  })// end describe ('PUT /api/users/:userId')
  describe('DELETE /api/users/:userId', () => {
    let user;
    beforeEach(() => {
      return User.create({
        email: 'cody@email.com'
      })
        .then((createdUser) => {
        user = createdUser;
      });
    });
    it('should remove user', () => {
      let userId = user.id
      return agent
        .delete(`/api/users/${user.id}`)
        .expect(204)
        .expect( async () => {
          const deletedUser = await User.findById(userId)
          expect(deletedUser).to.be.an('undefined')
        })
    })
  })// end describe ('DELETE /api/users/:userId')
}) // end describe('User routes')
