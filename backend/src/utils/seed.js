// Seed script to populate sample data - now requires ADMIN_EMAIL and ADMIN_PASSWORD in env

const mongoose = require('mongoose')
const Project = require('../models/Project')
const Profile = require('../models/Profile')
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
require('dotenv').config()

async function seed(){
  const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env
  if(!MONGO_URI){
    console.error('MONGO_URI not set in .env. Seed requires a DB.')
    process.exit(1)
  }
  if(!ADMIN_EMAIL || !ADMIN_PASSWORD){
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env for seeding. Refusing to run with defaults.')
    process.exit(1)
  }

  await mongoose.connect(MONGO_URI)
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

  const pw = await bcrypt.hash(ADMIN_PASSWORD, 10)
  await Admin.create({ name: 'Admin', email: ADMIN_EMAIL, password: pw })

  console.log('Seed complete')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
