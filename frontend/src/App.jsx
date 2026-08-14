import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreativeGallery from './pages/CreativeGallery'
import AdminDashboard from './pages/admin/Dashboard'
import BlogList from './pages/admin/BlogList'
import BlogEdit from './pages/admin/BlogEdit'
import AdminLogin from './pages/admin/Login'
import ProjectList from './pages/admin/ProjectList'
import ProjectEdit from './pages/admin/ProjectEdit'
import CreativeList from './pages/admin/CreativeList'
import CreativeEdit from './pages/admin/CreativeEdit'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/creative" element={<CreativeGallery/>} />

        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />

        <Route path="/admin/projects" element={<ProtectedRoute><ProjectList/></ProtectedRoute>} />
        <Route path="/admin/projects/new" element={<ProtectedRoute><ProjectEdit/></ProtectedRoute>} />
        <Route path="/admin/projects/:id" element={<ProtectedRoute><ProjectEdit/></ProtectedRoute>} />

        <Route path="/admin/blogs" element={<ProtectedRoute><BlogList/></ProtectedRoute>} />
        <Route path="/admin/blogs/new" element={<ProtectedRoute><BlogEdit/></ProtectedRoute>} />
        <Route path="/admin/blogs/:id" element={<ProtectedRoute><BlogEdit/></ProtectedRoute>} />

        <Route path="/admin/creative" element={<ProtectedRoute><CreativeList/></ProtectedRoute>} />
        <Route path="/admin/creative/new" element={<ProtectedRoute><CreativeEdit/></ProtectedRoute>} />
        <Route path="/admin/creative/:id" element={<ProtectedRoute><CreativeEdit/></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}
