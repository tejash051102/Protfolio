const jwt = require('jsonwebtoken')

module.exports = function(requiredRole){
  return function(req, res, next){
    if(!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' })
    if(requiredRole && req.user.role !== requiredRole) return res.status(403).json({ success: false, message: 'Forbidden' })
    next()
  }
}
