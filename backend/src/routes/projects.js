const express = require('express')
const router = express.Router()
const Project = require('../models/Project')

// GET /api/projects
router.get('/', async (req, res, next) => {
  try{
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: projects })
  }catch(err){ next(err) }
})

// GET /api/projects/featured
router.get('/featured', async (req, res, next) => {
  try{
    const projects = await Project.find({ featured: true }).sort({ order: 1 })
    res.json({ success: true, data: projects })
  }catch(err){ next(err) }
})

// GET /api/projects/:slug
router.get('/:slug', async (req, res, next) => {
  try{
    const project = await Project.findOne({ slug: req.params.slug })
    if(!project) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: project })
  }catch(err){ next(err) }
})

module.exports = router
