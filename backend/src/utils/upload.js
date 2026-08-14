const multer = require('multer')
const path = require('path')
const sharp = require('sharp')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/uploads/')
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

module.exports = { upload, sharp }
