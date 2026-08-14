const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const requireRole = require('../middleware/authorize')
const projectsCtrl = require('../controllers/admin/projectsController')
const contactCtrl = require('../controllers/admin/contactController')

// All admin routes require authenticated admin
// Projects admin CRUD
router.get('/projects', auth, requireRole('admin'), projectsCtrl.getAll)
router.get('/projects/:id', auth, requireRole('admin'), projectsCtrl.getById)
router.post('/projects', auth, requireRole('admin'), projectsCtrl.create)
router.put('/projects/:id', auth, requireRole('admin'), projectsCtrl.update)
router.delete('/projects/:id', auth, requireRole('admin'), projectsCtrl.remove)

// Contact message management
router.get('/messages', auth, requireRole('admin'), contactCtrl.list)
router.get('/messages/:id', auth, requireRole('admin'), contactCtrl.get)
router.put('/messages/:id/status', auth, requireRole('admin'), contactCtrl.updateStatus)
router.delete('/messages/:id', auth, requireRole('admin'), contactCtrl.remove)

module.exports = router
