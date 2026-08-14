import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminDashboard from './pages/admin/Dashboard'
import BlogList from './pages/admin/BlogList'
import BlogEdit from './pages/admin/BlogEdit'
import AdminLogin from './pages/admin/Login'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/admin/login" element={<AdminLogin/>} />

        <Route path="/admin" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />
        <Route path="/admin/blogs" element={<ProtectedRoute><BlogList/></ProtectedRoute>} />
        <Route path="/admin/blogs/new" element={<ProtectedRoute><BlogEdit/></ProtectedRoute>} />
        <Route path="/admin/blogs/:id" element={<ProtectedRoute><BlogEdit/></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}
