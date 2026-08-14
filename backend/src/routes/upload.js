const multer = require('multer')
const express = require('express')
const router = express.Router()
const { processAndSave } = require('../services/uploadService')

// use memory storage so we can process file buffer directly
const storage = multer.memoryStorage()
const upload = multer({ storage, limits: { fileSize: (Number(process.env.MAX_UPLOAD_SIZE_MB) || 5) * 1024 * 1024 } })

// POST /api/upload?type=projects|blogs|creative|certificates|profile&slug=optional-slug
router.post('/', upload.single('file'), async (req, res, next) => {
  try{
    const type = req.query.type || 'misc'
    const slug = req.query.slug || ''
    if(!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })

    const result = await processAndSave(req.file.buffer, req.file.originalname, type, slug)
    res.json({ success: true, data: result })
  }catch(err){ next(err) }
})

module.exports = router
