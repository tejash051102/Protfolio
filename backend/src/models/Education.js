const mongoose = require('mongoose')

const EducationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  startDate: Date,
  endDate: Date,
  description: String,
  order: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Education', EducationSchema)
