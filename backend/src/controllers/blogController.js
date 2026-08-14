const Blog = require('../../models/Blog')

exports.list = async (req, res, next) => {
  try{
    const { page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit
    const blogs = await Blog.find().sort({ createdAt: -1 }).skip(Number(skip)).limit(Number(limit))
    res.json({ success: true, data: blogs })
  }catch(err){ next(err) }
}

exports.getBySlug = async (req, res, next) => {
  try{
    const blog = await Blog.findOne({ slug: req.params.slug })
    if(!blog) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: blog })
  }catch(err){ next(err) }
}

// Admin controllers
exports.create = async (req, res, next) => {
  try{
    const body = req.body
    const created = await Blog.create(body)
    res.status(201).json({ success: true, data: created })
  }catch(err){ next(err) }
}

exports.update = async (req, res, next) => {
  try{
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
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
