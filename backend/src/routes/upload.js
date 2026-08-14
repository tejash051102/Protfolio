const multer = require('multer')
const path = require('path')
const sharp = require('sharp')
const fs = require('fs')

const uploadDir = 'backend/uploads'
if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`)
  }
})

function fileFilter(req, file, cb){
  const allowed = /jpeg|jpg|png|webp/
  const ext = path.extname(file.originalname).toLowerCase()
  if(allowed.test(ext)) cb(null, true)
  else cb(new Error('Invalid file type'))
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } })

const express = require('express')
const router = express.Router()

router.post('/', upload.single('file'), async (req, res, next) => {
  try{
    if(!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })
    // Optimize using sharp
    const outPath = path.join(req.file.destination, `opt_${req.file.filename}`)
    await sharp(req.file.path).resize(1200).toFile(outPath)
    // remove original
    fs.unlinkSync(req.file.path)
    const publicPath = `/uploads/${path.basename(outPath)}`
    res.json({ success: true, data: { path: publicPath } })
  }catch(err){ next(err) }
})

module.exports = router
