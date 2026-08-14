const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const projectRoutes = require('./projects')
const profileRoutes = require('./profile')

router.use('/auth', authRoutes)
router.use('/projects', projectRoutes)
router.use('/profile', profileRoutes)

module.exports = router
