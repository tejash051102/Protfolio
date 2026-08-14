import React, { useEffect, useState } from 'react'
import { getBlogs } from '../../services/blogService'
import { Link } from 'react-router-dom'

export default function BlogList(){
  const [blogs, setBlogs] = useState([])

  useEffect(()=>{
    getBlogs().then(res => setBlogs(res.data.data)).catch(()=>{})
  },[])

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Blogs</h2>
        <Link to="/admin/blogs/new" className="px-3 py-1 bg-green-600 text-white rounded">New</Link>
      </div>
      <ul className="mt-4">
        {blogs.map(b => (
          <li key={b._id} className="border-b py-2 flex justify-between">
            <div>
              <div className="font-semibold">{b.title}</div>
              <div className="text-sm text-gray-500">{b.excerpt}</div>
            </div>
            <div className="space-x-2">
              <Link to={`/admin/blogs/${b._id}`} className="text-indigo-600">Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
