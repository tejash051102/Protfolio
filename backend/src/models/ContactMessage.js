const mongoose = require('mongoose')

const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  status: { type: String, enum: ['new','read','replied','archived'], default: 'new' }
}, { timestamps: true })

module.exports = mongoose.model('ContactMessage', ContactMessageSchema)
