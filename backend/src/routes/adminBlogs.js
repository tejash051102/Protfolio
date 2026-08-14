const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const blogCtrl = require('../controllers/blogController')

// Admin blog CRUD
router.post('/blogs', auth, blogCtrl.create)
router.put('/blogs/:id', auth, blogCtrl.update)
router.delete('/blogs/:id', auth, blogCtrl.remove)

module.exports = router
