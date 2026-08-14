const ContactMessage = require('../../models/ContactMessage')

exports.list = async (req, res, next) => {
  try{
    const messages = await ContactMessage.find().sort({ createdAt: -1 })
    res.json({ success: true, data: messages })
  }catch(err){ next(err) }
}

exports.get = async (req, res, next) => {
  try{
    const msg = await ContactMessage.findById(req.params.id)
    if(!msg) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: msg })
  }catch(err){ next(err) }
}

exports.updateStatus = async (req, res, next) => {
  try{
    const { status } = req.body
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { status }, { new: true })
    res.json({ success: true, data: msg })
  }catch(err){ next(err) }
}

exports.remove = async (req, res, next) => {
  try{
    await ContactMessage.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  }catch(err){ next(err) }
}
