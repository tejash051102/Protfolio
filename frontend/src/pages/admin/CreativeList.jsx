import React, { useEffect, useState } from 'react'
import { adminGetCreative } from '../../services/creativeService'
import { Link } from 'react-router-dom'

export default function CreativeList(){
  const [items, setItems] = useState([])

  useEffect(()=>{
    adminGetCreative().then(res => setItems(res.data.data)).catch(()=>{})
  },[])

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Creative Works</h2>
        <Link to="/admin/creative/new" className="px-3 py-1 bg-green-600 text-white rounded">New</Link>
      </div>
      <ul className="mt-4">
        {items.map(p => (
          <li key={p._id} className="border-b py-2 flex justify-between">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-500">{p.category}</div>
            </div>
            <div className="space-x-2">
              <Link to={`/admin/creative/${p._id}`} className="text-indigo-600">Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
