const mongoose = require('mongoose')

const CertificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: String,
  issueDate: Date,
  credentialId: String,
  credentialUrl: String,
  image: String,
  description: String
}, { timestamps: true })

module.exports = mongoose.model('Certification', CertificationSchema)
