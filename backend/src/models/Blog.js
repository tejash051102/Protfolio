const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  content: String,
  coverImage: String,
  category: String,
  tags: [String],
  author: String,
  published: { type: Boolean, default: false },
  publishedAt: Date
}, { timestamps: true })

module.exports = mongoose.model('Blog', BlogSchema)
