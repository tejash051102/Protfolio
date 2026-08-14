const mongoose = require('mongoose')

module.exports = async function connect(){
  if(!process.env.MONGO_URI) return
  await mongoose.connect(process.env.MONGO_URI)
}
