import React, { useEffect, useState } from 'react'
import { getCreative } from '../services/creativeService'

export default function CreativeGallery(){
  const [items, setItems] = useState([])

  useEffect(()=>{
    getCreative(1,50).then(res => setItems(res.data.data)).catch(()=>{})
  },[])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Creative Portfolio</h1>
      <div className="grid grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item._id} className="border p-2">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="mt-2">
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm text-gray-500">{item.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
