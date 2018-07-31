/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest-session')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const testSession = require('supertest-session')(app);

describe('User routes', () => {
  beforeEach(() => {
    return db.sync()
  })

  // beforeEach(() => {
  //   return User.create({
  //     email: 'shoshanarosenfield.com',
  //     isAdmin:true,
  //     password: 'graceshoppertbd123'
  //   })
  // })

  // describe('GET /api/users/', () => {
  //   const userCredentials = {
  //     email: 'cody@email.com',
  //     password: '123'
  //   }

  //   let authenticatedSession=testSession;
  //   before((done) => {
  //      authenticatedSession
  //       .post('/login')
  //       .send(userCredentials)
  //       .end((err, res) => {
  //         done();
  //       })
  //   });


  //   // console.log('AUTHENTICATED USER',authenticatedSession)

  //   it('GET /api/users', (done) => {
  //     console.log("********")
  //     authenticatedSession.get('/api/users')
  //     .expect(200)
  //     // .expect((res) => {
  //     //   console.log("HELLO RES", res)
  //     //   res.body.to.be.an('array')
  //     // })
  //     .end((err, res) => {
  //       console.log("WOE")
  //       done()
  //     })
  //   })
  // }) // end describe('GET /api/users')

  describe('POST /api/users/', () => {
    it('should create a User', async () => {
      const response = testSession.post('/api/users').send({email:'test@email.com'}).expect(201)
    })
  }) // end describe ('POST /api/users')
}) // end describe('User routes')
