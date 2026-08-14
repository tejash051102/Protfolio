const express = require('express')
const router = express.Router()
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try{
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if(!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' })
    const match = await bcrypt.compare(password, admin.password)
    if(!match) return res.status(401).json({ success: false, message: 'Invalid credentials' })

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    res.json({ success: true, message: 'Logged in' })
  }catch(err){ next(err) }
})

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ success: true, message: 'Logged out' })
})

// GET /api/auth/me
router.get('/me', async (req, res) => {
  const token = req.cookies.token
  if(!token) return res.status(401).json({ success: false, message: 'Not authenticated' })
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
    const admin = await Admin.findById(payload.id).select('-password')
    res.json({ success: true, data: admin })
  }catch(err){ res.status(401).json({ success: false, message: 'Invalid token' }) }
})

module.exports = router
