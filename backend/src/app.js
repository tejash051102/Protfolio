const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const routes = require('./routes')
const { notFound, errorHandler } = require('./middleware/errors')
const path = require('path')

require('dotenv').config()

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(xss())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use('/api', apiLimiter)

// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use('/api', routes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
