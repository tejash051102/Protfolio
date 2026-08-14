const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  longDescription: String,
  thumbnail: String,
  images: [String],
  technologies: [String],
  features: [String],
  category: String,
  githubUrl: String,
  liveUrl: String,
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Project', ProjectSchema)
