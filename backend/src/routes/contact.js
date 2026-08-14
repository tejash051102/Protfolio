const express = require('express')
const router = express.Router()
const ContactMessage = require('../models/ContactMessage')
const { z } = require('zod')

// POST /api/contact
router.post('/', async (req, res, next) => {
  try{
    const schema = z.object({ name: z.string().min(1), email: z.string().email(), subject: z.string().optional(), message: z.string().min(10) })
    const parsed = schema.safeParse(req.body)
    if(!parsed.success) return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.format() })

    const msg = await ContactMessage.create(parsed.data)
    // TODO: send notification email if configured
    res.status(201).json({ success: true, message: 'Message received', data: msg })
  }catch(err){ next(err) }
})

module.exports = router
