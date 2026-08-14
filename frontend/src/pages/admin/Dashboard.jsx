import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard(){
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="mt-4 space-x-2">
        <Link to="/admin/projects" className="px-3 py-2 bg-indigo-600 text-white rounded">Projects</Link>
        <Link to="/admin/blogs" className="px-3 py-2 bg-indigo-600 text-white rounded">Blogs</Link>
        <Link to="/admin/messages" className="px-3 py-2 bg-indigo-600 text-white rounded">Messages</Link>
      </div>
    </div>
  )
}
