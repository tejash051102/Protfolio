const mongoose = require('mongoose')

const CreativeWorkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  category: String,
  featured: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('CreativeWork', CreativeWorkSchema)
