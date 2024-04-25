import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'

describe('Game API', () => {
  it('POST /games/:id - should record a game', async () => {
    const player = await request(app)
      .post('/players')
      .send({ name: 'Alice' })

    const res = await request(app)
      .post(`/games/${player.body._id}`)
      .send({ diceOne: 3, diceTwo: 4 }) 

    expect(res.statusCode).toEqual(201)
    expect(res.body.result).toBeTruthy()
  });

  it('GET /games/:id - should get games for a player', async () => {
    const player = await request(app)
      .post('/players')
      .send({ name: 'Bob' })

    await request(app).post(`/games/${player.body._id}`).send({ diceOne: 1, diceTwo: 5 })

    const res = await request(app).get(`/games/${player.body._id}`)
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBeTruthy()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
})