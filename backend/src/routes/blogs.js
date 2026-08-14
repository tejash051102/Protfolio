const express = require('express')
const router = express.Router()
const blogCtrl = require('../controllers/blogController')
const auth = require('../middleware/auth')
const requireRole = require('../middleware/authorize')

// Public
router.get('/', blogCtrl.list)
router.get('/:slug', blogCtrl.getBySlug)

// Admin
router.get('/admin/list', auth, requireRole('admin'), blogCtrl.adminList)
router.post('/admin', auth, requireRole('admin'), blogCtrl.create)
router.put('/admin/:id', auth, requireRole('admin'), blogCtrl.update)
router.delete('/admin/:id', auth, requireRole('admin'), blogCtrl.remove)

module.exports = router
