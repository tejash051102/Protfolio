const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const requireRole = require('../middleware/authorize')
const creativeCtrl = require('../controllers/creativeController')

// Admin creative CRUD
router.get('/creative', auth, requireRole('admin'), creativeCtrl.list)
router.get('/creative/:id', auth, requireRole('admin'), creativeCtrl.getById)
router.post('/creative', auth, requireRole('admin'), creativeCtrl.create)
router.put('/creative/:id', auth, requireRole('admin'), creativeCtrl.update)
router.delete('/creative/:id', auth, requireRole('admin'), creativeCtrl.remove)

module.exports = router
