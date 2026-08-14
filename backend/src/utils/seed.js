// Seed script to populate sample data

const mongoose = require('mongoose')
const Project = require('../models/Project')
const Profile = require('../models/Profile')
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
require('dotenv').config()

async function seed(){
  if(!process.env.MONGO_URI){
    console.error('MONGO_URI not set in .env. Seed requires a DB.')
    process.exit(1)
  }
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected')

  await Project.deleteMany({})
  await Profile.deleteMany({})
  await Admin.deleteMany({})

  const projects = [
    {
      title: 'StudentHub',
      slug: 'studenthub',
      description: 'Student Registration & Management System',
      technologies: ['React','Node','MongoDB'],
      featured: true
    },
    {
      title: 'DriveSure',
      slug: 'drivesure',
      description: 'Car Insurance Management System',
      technologies: ['React','Express','MongoDB']
    }
  ]

  await Project.insertMany(projects)

  await Profile.create({ name: 'Tejash Sharma', title: 'Full-Stack Developer & Cyber Security Student', bio: 'Replace with real bio.' })

  const pw = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'changeme', 10)
  await Admin.create({ name: 'Admin', email: process.env.ADMIN_EMAIL || 'admin@example.com', password: pw })

  console.log('Seed complete')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
