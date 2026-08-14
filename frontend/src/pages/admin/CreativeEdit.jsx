import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { adminCreateCreative, adminUpdateCreative, adminGetCreativeItem } from '../../services/creativeService'
import FileUploader from '../../components/FileUploader'

const schema = z.object({ title: z.string().min(1), description: z.string().optional(), category: z.string().optional(), featured: z.boolean().optional() })

export default function CreativeEdit(){
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue } = useForm({ resolver: zodResolver(schema) })
  const [image, setImage] = useState(null)

  useEffect(()=>{
    if(id && id !== 'new'){
      adminGetCreativeItem(id).then(res => {
        const p = res.data.data
        setValue('title', p.title)
        setValue('description', p.description)
        setValue('category', p.category)
        setValue('featured', p.featured)
        if(p.image) setImage({ display: p.image })
      }).catch(()=>{})
    }
  },[id, setValue])

  const onSubmit = async (data) => {
    try{
      const payload = { ...data, image: image?.display || null }
      if(id && id !== 'new') await adminUpdateCreative(id, payload)
      else await adminCreateCreative(payload)
      navigate('/admin/creative')
    }catch(err){ alert(err.response?.data?.message || 'Save failed') }
  }

  return (
    <div className="p-8 max-w-3xl">
      <h2 className="text-xl font-bold">{id && id !== 'new' ? 'Edit' : 'New'} Creative</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
        <input {...register('title')} placeholder="Title" className="w-full p-2 border" />
        <textarea {...register('description')} placeholder="Description" className="w-full p-2 border h-28" />
        <input {...register('category')} placeholder="Category" className="w-full p-2 border" />
        <label className="block">Featured <input type="checkbox" {...register('featured')} className="ml-2" /></label>

        <div>
          <label className="block">Image</label>
          <FileUploader type="creative" multiple={false} onChange={(f) => setImage(f)} />
        </div>

        <div className="flex space-x-2">
          <button type="submit" className="px-3 py-2 bg-indigo-600 text-white rounded">Save</button>
          <button type="button" onClick={()=>navigate('/admin/creative')} className="px-3 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}
