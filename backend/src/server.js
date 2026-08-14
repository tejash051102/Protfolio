const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 5000

async function connectDB(){
  if(!process.env.MONGO_URI){
    console.warn('MONGO_URI not set. Skipping DB connection for scaffold.')
    return
  }
  await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected')
}

connectDB().catch(err => console.error(err))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
