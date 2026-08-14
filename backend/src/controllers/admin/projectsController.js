const Project = require('../../models/Project')
const slugify = require('../../utils/slugify')

exports.getAll = async (req, res, next) => {
  try{
    const { page = 1, limit = 20, search, category, featured } = req.query
    const skip = (page - 1) * limit
    const filter = {}
    if(search) filter.title = { $regex: search, $options: 'i' }
    if(category) filter.category = category
    if(typeof featured !== 'undefined') filter.featured = featured === 'true'

    const total = await Project.countDocuments(filter)
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 }).skip(Number(skip)).limit(Number(limit))
    res.json({ success: true, data: projects, meta: { total, page: Number(page), limit: Number(limit) } })
  }catch(err){ next(err) }
}

exports.getById = async (req, res, next) => {
  try{
    const project = await Project.findById(req.params.id)
    if(!project) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: project })
  }catch(err){ next(err) }
}

exports.create = async (req, res, next) => {
  try{
    const body = req.body
    if(!body.slug) body.slug = slugify(body.title)
    // ensure unique slug
    const exists = await Project.findOne({ slug: body.slug })
    if(exists) body.slug = `${body.slug}-${Date.now()}`

    const project = await Project.create(body)
    res.status(201).json({ success: true, data: project })
  }catch(err){ next(err) }
}

exports.update = async (req, res, next) => {
  try{
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if(!project) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: project })
  }catch(err){ next(err) }
}

exports.remove = async (req, res, next) => {
  try{
    await Project.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  }catch(err){ next(err) }
}
