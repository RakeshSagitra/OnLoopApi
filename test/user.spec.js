// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const { expect } = require('chai')
// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe, it, before } = require('mocha')
const should = require('should')
const { deleteAllUsers, getLearnContent, getLearnContentTags } = require('../app/helper/user')
const { start } = require('../server')

const test = async () => {
  // Empty Users collection before test

  const server = await start()
  chai.use(chaiHttp)

  describe('Users', () => {
    before(async () => {
      await deleteAllUsers()
    })

    // Post New User
    let newUserId
    const newUser = {
      name: 'Mark',
      email: 'mark@yopmail.com',
      phone: 8923239811
    }

    const updatedUser = {
      name: 'Steve',
      email: 'steve@yopmail.com',
      phone: 2321352355
    }

    describe('/POST Create new user', () => {
      it('it should create a new user', (done) => {
        chai.request(server)
          .post('/api/v1/users')
          .send(newUser)
          .end((err, res) => {
            if (err) {
              console.log(err.stack)
            }
            should(res).have.property('status', 200)
            should(res.body).be.of.type('object').with.property('data').with.property('userRefId')
            newUserId = res.body.data.userRefId
            done()
          })
      })
    })

    describe('/GET Fetch all users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
          .get('/api/v1/users')
          .end((err, res) => {
            if (err) {
              console.log(err.stack)
            }
            should(res).have.property('status', 200)
            should(res.body).be.of.type('object').with.property('data').eqls([
              {
                id: newUserId,
                ...newUser
              }
            ])
            done()
          })
      })
    })

    describe('/GET Fetch single user', () => {
      it('it should GET and verify newly created user data with help of user_id', (done) => {
        chai.request(server)
          .get(`/api/v1/users/${newUserId}`)
          .end((err, res) => {
            if (err) {
              console.log(err.stack)
            }
            should(res).have.property('status', 200)
            should(res.body).be.of.type('object').with.property('data')

            // Verify Fetched User data
            const fetchedUser = res.body.data
            should(fetchedUser).be.of.type('object').with.property('id').eqls(newUserId)
            should(fetchedUser).be.of.type('object').with.property('name').eqls(newUser.name)
            should(fetchedUser).be.of.type('object').with.property('email').eqls(newUser.email)
            should(fetchedUser).be.of.type('object').with.property('phone').eqls(newUser.phone)

            done()
          })
      })
    })

    describe('/PATCH Update new user', () => {
      it('it should update the user with help of id', (done) => {
        chai.request(server)
          .patch(`/api/v1/users/${newUserId}`)
          .send(updatedUser)
          .end((err, res) => {
            if (err) {
              console.log(err.stack)
            }
            should(res).have.property('status', 200)
            should(res.body).be.of.type('object').with.property('data').with.property('updatedUser')
            done()
          })
      })

      it('it should GET and verify updated user data with help of user_id', (done) => {
        chai.request(server)
          .get(`/api/v1/users/${newUserId}`)
          .end((err, res) => {
            if (err) {
              console.log(err.stack)
            }
            should(res).have.property('status', 200)
            should(res.body).be.of.type('object').with.property('data')

            // Verify Fetched User data
            const fetchedUser = res.body.data
            should(fetchedUser).be.of.type('object').with.property('id').eqls(newUserId)
            should(fetchedUser).be.of.type('object').with.property('name').eqls(updatedUser.name)
            should(fetchedUser).be.of.type('object').with.property('email').eqls(updatedUser.email)
            should(fetchedUser).be.of.type('object').with.property('phone').eqls(updatedUser.phone)

            done()
          })
      })
    })

    describe('/DELETE Delete updated user', () => {
      it('it should delete the user with help of id', (done) => {
        chai.request(server)
          .delete(`/api/v1/users/${newUserId}`)
          .end((err, res) => {
            if (err) {
              console.log(err.stack)
            }
            should(res).have.property('status', 200)
            should(res.body).be.of.type('object').with.property('data').with.property('deletedUser')
            done()
          })
      })
      it('it should fetch all users and check it\'s length', (done) => {
        chai.request(server)
          .get('/api/v1/users')
          .end((err, res) => {
            if (err) {
              console.log(err.stack)
            }
            should(res).have.property('status', 200)
            should(res.body).be.of.type('object').with.property('data').eqls([])
            done()
          })
      })
      it('it should get not found error after fetching user with user_id', (done) => {
        chai.request(server)
          .get(`/api/v1/users/${newUserId}`)
          .end((err, res) => {
            if (err) {
              console.log(err.stack)
            }
            should(res).have.property('status', 404)
            done()
          })
      })
    })
  })

  describe('User Learn Content', () => {
    before(async () => {
      await deleteAllUsers()
    })

    // Post New User
    let newUserId
    const newUser = {
      name: 'Mark',
      email: 'mark@yopmail.com',
      phone: 8923239811
    }

    let learnContentId

    const learnContent = {
      url: 'https://www.twitter.com',
      user_id: '',
      tags: [
        {
          iso: 'honey',
          piso: 'sunny'
        },
        {
          triso: 'koney',
          nino: 'funny'
        }
      ]
    }

    describe('/POST Create new user', () => {
      it('it should create a new user', (done) => {
        chai.request(server)
          .post('/api/v1/users')
          .send(newUser)
          .end((err, res) => {
            if (err) {
              console.log(err.stack)
            }
            should(res).have.property('status', 200)
            should(res.body).be.of.type('object').with.property('data').with.property('userRefId')
            newUserId = res.body.data.userRefId
            done()
          })
      })
    })

    describe('/POST User Learn Content', () => {
      it('it should update the user with learn content', (done) => {
        chai.request(server)
          .post('/api/v1/users/learn-content')
          .send({
            ...learnContent,
            user_id: newUserId
          })
          .end((err, res) => {
            if (err) {
              console.log(err.stack)
            }
            should(res).have.property('status', 200)
            should(res.body).be.of.type('object').with.property('data').with.property('learnContentDocId')
            should(res.body).be.of.type('object').with.property('data').with.property('tags')

            learnContentId = res.body.data.learnContentDocId
            done()
          })
      })

      it('it should verify user learn content on firestore', async () => {
        const learnContent = await getLearnContent({
          userId: newUserId,
          learnContentId
        })
        should(learnContent).be.of.type('object').with.property('url').eqls(learnContent.url)
      })

      it('it should verify user learn content tags on firestore', async () => {
        const learnContentTags = await getLearnContentTags({
          userId: newUserId,
          learnContentId
        })
        expect(learnContentTags).to.eql(learnContent.tags)
      })
    })
  })
}

test()
