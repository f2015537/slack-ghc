const request = require('supertest')
const app = require('../server')

describe('homepage', function () {
  it('welcomes the user', function (done) {
    request(app).get('/')
      .expect(200)
      .expect(/Hello/, done)
  })
})

describe('email form', function () {
  it('thanks the user after they enter their email', function (done) {
    this.timeout(10000)
    request(app).post('/addname')
      .send({ name: 'abc@gmail.com' })
      .expect(200)
      .expect(/Hello/, done)
  })
})
