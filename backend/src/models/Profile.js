const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  subtitle: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  github: String,
  linkedin: String,
  instagram: String,
  resumeUrl: String,
  profileImage: String,
  availability: String
}, { timestamps: true })

module.exports = mongoose.model('Profile', ProfileSchema)
