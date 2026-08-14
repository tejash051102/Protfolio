const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const projectRoutes = require('./projects')
const profileRoutes = require('./profile')
const adminRoutes = require('./admin')
const contactRoutes = require('./contact')

router.use('/auth', authRoutes)
router.use('/projects', projectRoutes)
router.use('/profile', profileRoutes)
router.use('/admin', adminRoutes)
router.use('/contact', contactRoutes)

module.exports = router
