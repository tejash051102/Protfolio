import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminDashboard from './pages/admin/Dashboard'
import BlogList from './pages/admin/BlogList'
import BlogEdit from './pages/admin/BlogEdit'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path="/admin" element={<AdminDashboard/>} />
      <Route path="/admin/blogs" element={<BlogList/>} />
      <Route path="/admin/blogs/new" element={<BlogEdit/>} />
      <Route path="/admin/blogs/:id" element={<BlogEdit/>} />
    </Routes>
  )
}
