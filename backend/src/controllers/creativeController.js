const CreativeWork = require('../../models/CreativeWork')
const slugify = require('../../utils/slugify')

exports.list = async (req, res, next) => {
  try{
    const { page = 1, limit = 20, category, featured } = req.query
    const skip = (page - 1) * limit
    const filter = {}
    if(category) filter.category = category
    if(typeof featured !== 'undefined') filter.featured = featured === 'true'

    const total = await CreativeWork.countDocuments(filter)
    const items = await CreativeWork.find(filter).sort({ createdAt: -1 }).skip(Number(skip)).limit(Number(limit))
    res.json({ success: true, data: items, meta: { total, page: Number(page), limit: Number(limit) } })
  }catch(err){ next(err) }
}

exports.getById = async (req, res, next) => {
  try{
    const item = await CreativeWork.findById(req.params.id)
    if(!item) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: item })
  }catch(err){ next(err) }
}

exports.create = async (req, res, next) => {
  try{
    const body = req.body
    if(!body.slug && body.title) body.slug = slugify(body.title)
    const created = await CreativeWork.create(body)
    res.status(201).json({ success: true, data: created })
  }catch(err){ next(err) }
}

exports.update = async (req, res, next) => {
  try{
    const updated = await CreativeWork.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if(!updated) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: updated })
  }catch(err){ next(err) }
}

exports.remove = async (req, res, next) => {
  try{
    await CreativeWork.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  }catch(err){ next(err) }
}
