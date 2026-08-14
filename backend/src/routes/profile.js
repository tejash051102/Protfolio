const express = require('express')
const router = express.Router()
const Profile = require('../models/Profile')

// GET /api/profile
router.get('/', async (req, res, next) => {
  try{
    const profile = await Profile.findOne()
    res.json({ success: true, data: profile })
  }catch(err){ next(err) }
})

module.exports = router
