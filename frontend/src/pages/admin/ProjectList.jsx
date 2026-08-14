import React, { useEffect, useState } from 'react'
import { adminGetProjects } from '../../services/projectService'
import { Link } from 'react-router-dom'

export default function ProjectList(){
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    adminGetProjects().then(res => setProjects(res.data.data)).catch(()=>{})
  },[])

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Projects</h2>
        <Link to="/admin/projects/new" className="px-3 py-1 bg-green-600 text-white rounded">New</Link>
      </div>
      <ul className="mt-4">
        {projects.map(p => (
          <li key={p._id} className="border-b py-2 flex justify-between">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-500">{p.description}</div>
            </div>
            <div className="space-x-2">
              <Link to={`/admin/projects/${p._id}`} className="text-indigo-600">Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
