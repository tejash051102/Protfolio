const express = require('express')
const router = express.Router()
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { z } = require('zod')

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) })

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try{
    const parsed = loginSchema.safeParse(req.body)
    if(!parsed.success) return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.format() })

    const { email, password } = parsed.data
    const admin = await Admin.findOne({ email })
    if(!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' })
    const match = await bcrypt.compare(password, admin.password)
    if(!match) return res.status(401).json({ success: false, message: 'Invalid credentials' })

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }

    res.cookie('token', token, cookieOptions)
    res.json({ success: true, message: 'Logged in' })
  }catch(err){ next(err) }
})

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' })
  res.json({ success: true, message: 'Logged out' })
})

// GET /api/auth/me
router.get('/me', async (req, res) => {
  const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1])
  if(!token) return res.status(401).json({ success: false, message: 'Not authenticated' })
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
    const admin = await Admin.findById(payload.id).select('-password')
    if(!admin) return res.status(401).json({ success: false, message: 'User not found' })
    res.json({ success: true, data: admin })
  }catch(err){ res.status(401).json({ success: false, message: 'Invalid token' }) }
})

module.exports = router
