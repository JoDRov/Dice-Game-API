import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { router as playerRoutes } from './routes'

const app = express()
app.use(bodyParser.json())
app.use(playerRoutes)

const mongoURI = process.env.MONGO_URI
if (!mongoURI) {
  console.error('MongoDB URI is not defined.')
  process.exit(1)
}

mongoose.connect(mongoURI, {
  socketTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err))

export default app

console.log(`MongoDB URI: ${process.env.MONGO_URI}`)