const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

module.exports = async () => {
  const mongoServer = await MongoMemoryServer.create()
  process.env.MONGO_URI = mongoServer.getUri()
  console.log("MongoDB Memory Server started at URI:", process.env.MONGO_URI)

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  global.mongoServer = mongoServer
}