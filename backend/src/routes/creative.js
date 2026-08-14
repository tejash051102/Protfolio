const express = require('express')
const router = express.Router()
const creativeCtrl = require('../controllers/creativeController')

// Public
router.get('/', creativeCtrl.list)
router.get('/:id', creativeCtrl.getById)

module.exports = router
