import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard(){
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const doLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div>
          <span className="mr-4">{user ? `Signed in as ${user.email}` : ''}</span>
          <button onClick={doLogout} className="px-3 py-2 bg-red-600 text-white rounded">Logout</button>
        </div>
      </div>
      <div className="mt-4 space-x-2">
        <button onClick={() => navigate('/admin/projects')} className="px-3 py-2 bg-indigo-600 text-white rounded">Projects</button>
        <button onClick={() => navigate('/admin/blogs')} className="px-3 py-2 bg-indigo-600 text-white rounded">Blogs</button>
        <button onClick={() => navigate('/admin/messages')} className="px-3 py-2 bg-indigo-600 text-white rounded">Messages</button>
      </div>
    </div>
  )
}
