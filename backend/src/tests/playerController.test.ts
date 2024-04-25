import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'

describe('Player API', () => {
  it('POST /players - should create a new player', async () => {
    const res = await request(app)
      .post('/players')
      .send({
        name: 'John Doe',
        isAnonymous: false
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('name', 'John Doe')
  })

  it('GET /players - should retrieve all players', async () => {
    const res = await request(app).get('/players')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
})