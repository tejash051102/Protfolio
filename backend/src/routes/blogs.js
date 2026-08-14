const express = require('express')
const router = express.Router()
const blogCtrl = require('../controllers/blogController')

// Public
router.get('/', blogCtrl.list)
router.get('/:slug', blogCtrl.getBySlug)

module.exports = router
