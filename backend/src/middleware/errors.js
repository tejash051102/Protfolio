function notFound(req, res, next){
  res.status(404).json({ success: false, message: 'Not Found' })
}

function errorHandler(err, req, res, next){
  console.error(err)
  res.status(500).json({ success: false, message: err.message || 'Server Error' })
}

module.exports = { notFound, errorHandler }
