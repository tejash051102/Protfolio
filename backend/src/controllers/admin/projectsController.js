const Project = require('../../models/Project')

exports.getAll = async (req, res, next) => {
  try{
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: projects })
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
