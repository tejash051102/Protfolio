const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const projectsCtrl = require('../controllers/admin/projectsController')
const contactCtrl = require('../controllers/admin/contactController')

// Projects admin CRUD
router.get('/projects', auth, projectsCtrl.getAll)
router.get('/projects/:id', auth, projectsCtrl.getById)
router.post('/projects', auth, projectsCtrl.create)
router.put('/projects/:id', auth, projectsCtrl.update)
router.delete('/projects/:id', auth, projectsCtrl.remove)

// Contact message management
router.get('/messages', auth, contactCtrl.list)
router.get('/messages/:id', auth, contactCtrl.get)
router.put('/messages/:id/status', auth, contactCtrl.updateStatus)
router.delete('/messages/:id', auth, contactCtrl.remove)

module.exports = router
