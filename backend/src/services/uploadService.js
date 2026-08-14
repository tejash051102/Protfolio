const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')

const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp']
const DEFAULT_MAX_MB = Number(process.env.MAX_UPLOAD_SIZE_MB) || 5

function ensureDir(dir){
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

async function processAndSave(buffer, originalName, type = 'misc', slug = ''){
  const ext = path.extname(originalName).toLowerCase()
  if(!ALLOWED_EXT.includes(ext)) throw new Error('Invalid file extension')

  if(buffer.length > DEFAULT_MAX_MB * 1024 * 1024) throw new Error('File too large')

  const uploadsRoot = path.join(__dirname, '..', '..', 'uploads')
  const targetDir = path.join(uploadsRoot, type)
  ensureDir(targetDir)

  // metadata check
  const meta = await sharp(buffer).metadata()
  if(!meta.width || !meta.height) throw new Error('Invalid image')
  if(meta.width < 50 || meta.height < 50) throw new Error('Image dimensions too small')

  const id = uuidv4()
  const baseName = `${slug ? slug + '-' : ''}${id}-${Date.now()}`

  const outDisplayWebp = `${baseName}.webp`
  const outThumbWebp = `${baseName}-thumb.webp`
  const outDisplayJpg = `${baseName}.jpg`
  const outThumbJpg = `${baseName}-thumb.jpg`

  const displayPathWebp = path.join(targetDir, outDisplayWebp)
  const thumbPathWebp = path.join(targetDir, outThumbWebp)
  const displayPathJpg = path.join(targetDir, outDisplayJpg)
  const thumbPathJpg = path.join(targetDir, outThumbJpg)

  // create display (1200px wide) and thumbnail (400px wide)
  await sharp(buffer).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(displayPathWebp)
  await sharp(buffer).resize({ width: 400, withoutEnlargement: true }).webp({ quality: 80 }).toFile(thumbPathWebp)

  // create JPEG fallbacks
  await sharp(buffer).resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 80 }).toFile(displayPathJpg)
  await sharp(buffer).resize({ width: 400, withoutEnlargement: true }).jpeg({ quality: 80 }).toFile(thumbPathJpg)

  // Return paths relative to /uploads
  return {
    display: `/uploads/${type}/${outDisplayWebp}`,
    thumb: `/uploads/${type}/${outThumbWebp}`,
    displayFallback: `/uploads/${type}/${outDisplayJpg}`,
    thumbFallback: `/uploads/${type}/${outThumbJpg}`
  }
}

module.exports = { processAndSave }
