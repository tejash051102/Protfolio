const mongoose = require('mongoose')

const SecurityLabSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  description: String,
  content: String,
  resources: [String]
}, { timestamps: true })

module.exports = mongoose.model('SecurityLab', SecurityLabSchema)
