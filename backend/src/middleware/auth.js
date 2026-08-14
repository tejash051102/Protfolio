const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1]
  if(!token) return res.status(401).json({ success: false, message: 'Not authenticated' })
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
    req.user = payload
    next()
  }catch(err){ res.status(401).json({ success: false, message: 'Invalid token' }) }
}
