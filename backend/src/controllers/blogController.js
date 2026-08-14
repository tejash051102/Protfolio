const Blog = require('../../models/Blog')
const slugify = require('../../utils/slugify')

exports.list = async (req, res, next) => {
  try{
    const { page = 1, limit = 10, search, category, tag } = req.query
    const skip = (page - 1) * limit
    const filter = { published: true }
    if(search) filter.$or = [ { title: { $regex: search, $options: 'i' } }, { excerpt: { $regex: search, $options: 'i' } } ]
    if(category) filter.category = category
    if(tag) filter.tags = tag

    const total = await Blog.countDocuments(filter)
    const blogs = await Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip(Number(skip)).limit(Number(limit))
    res.json({ success: true, data: blogs, meta: { total, page: Number(page), limit: Number(limit) } })
  }catch(err){ next(err) }
}

exports.getBySlug = async (req, res, next) => {
  try{
    const blog = await Blog.findOne({ slug: req.params.slug, published: true })
    if(!blog) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: blog })
  }catch(err){ next(err) }
}

// Admin controllers
exports.adminList = async (req, res, next) => {
  try{
    const { page = 1, limit = 20, search } = req.query
    const skip = (page - 1) * limit
    const filter = {}
    if(search) filter.title = { $regex: search, $options: 'i' }

    const total = await Blog.countDocuments(filter)
    const blogs = await Blog.find(filter).sort({ createdAt: -1 }).skip(Number(skip)).limit(Number(limit))
    res.json({ success: true, data: blogs, meta: { total, page: Number(page), limit: Number(limit) } })
  }catch(err){ next(err) }
}

exports.create = async (req, res, next) => {
  try{
    const body = req.body
    if(!body.slug) body.slug = slugify(body.title)
    // ensure unique slug
    let slug = body.slug
    let exists = await Blog.findOne({ slug })
    if(exists) slug = `${slug}-${Date.now()}`
    body.slug = slug

    if(body.published && !body.publishedAt) body.publishedAt = new Date()

    const created = await Blog.create(body)
    res.status(201).json({ success: true, data: created })
  }catch(err){ next(err) }
}

exports.update = async (req, res, next) => {
  try{
    const updates = req.body
    if(updates.slug){
      const exists = await Blog.findOne({ slug: updates.slug, _id: { $ne: req.params.id } })
      if(exists) updates.slug = `${updates.slug}-${Date.now()}`
    } else if(updates.title){
      // optionally regenerate slug if not provided
      updates.slug = slugify(updates.title)
      const exists = await Blog.findOne({ slug: updates.slug, _id: { $ne: req.params.id } })
      if(exists) updates.slug = `${updates.slug}-${Date.now()}`
    }

    if(typeof updates.published !== 'undefined' && updates.published && !updates.publishedAt) updates.publishedAt = new Date()

    const updated = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    if(!updated) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: updated })
  }catch(err){ next(err) }
}

exports.remove = async (req, res, next) => {
  try{
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  }catch(err){ next(err) }
}
