import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { adminCreateProject, adminUpdateProject, adminGetProject } from '../../services/projectService'
import FileUploader from '../../components/FileUploader'

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().optional(),
  longDescription: z.string().optional(),
  technologies: z.string().optional(), // comma separated
  features: z.string().optional(),
  category: z.string().optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional()
})

export default function ProjectEdit(){
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue } = useForm({ resolver: zodResolver(schema) })
  const [thumbnail, setThumbnail] = useState(null)
  const [images, setImages] = useState([])

  useEffect(()=>{
    if(id){
      adminGetProject(id).then(res => {
        const p = res.data.data
        setValue('title', p.title)
        setValue('slug', p.slug)
        setValue('description', p.description)
        setValue('longDescription', p.longDescription)
        setValue('category', p.category)
        setValue('githubUrl', p.githubUrl)
        setValue('liveUrl', p.liveUrl)
        setValue('featured', p.featured)
        setValue('order', p.order)
        if(p.thumbnail) setThumbnail({ display: p.thumbnail })
        if(p.images) setImages(p.images.map(i => ({ display: i })))
      }).catch(()=>{})
    }
  },[id, setValue])

  const onSubmit = async (data) => {
    try{
      const payload = {
        ...data,
        technologies: data.technologies ? data.technologies.split(',').map(s=>s.trim()).filter(Boolean) : [],
        features: data.features ? data.features.split(',').map(s=>s.trim()).filter(Boolean) : [],
        thumbnail: thumbnail?.display || null,
        images: images.map(i => i.display)
      }
      if(id) await adminUpdateProject(id, payload)
      else await adminCreateProject(payload)
      navigate('/admin/projects')
    }catch(err){
      alert(err.response?.data?.message || 'Save failed')
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <h2 className="text-xl font-bold">{id ? 'Edit' : 'New'} Project</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
        <input {...register('title')} placeholder="Title" className="w-full p-2 border" />
        <input {...register('slug')} placeholder="Slug (optional)" className="w-full p-2 border" />
        <input {...register('description')} placeholder="Short description" className="w-full p-2 border" />
        <textarea {...register('longDescription')} placeholder="Long description" className="w-full p-2 border h-32" />

        <div>
          <label className="block">Thumbnail</label>
          <FileUploader type="projects" slug={undefined} multiple={false} onChange={(f) => setThumbnail(f)} />
        </div>

        <div>
          <label className="block">Images</label>
          <FileUploader type="projects" multiple={true} onChange={(arr) => setImages(arr)} />
        </div>

        <input {...register('technologies')} placeholder="Technologies (comma separated)" className="w-full p-2 border" />
        <input {...register('features')} placeholder="Features (comma separated)" className="w-full p-2 border" />
        <input {...register('category')} placeholder="Category" className="w-full p-2 border" />
        <input {...register('githubUrl')} placeholder="GitHub URL" className="w-full p-2 border" />
        <input {...register('liveUrl')} placeholder="Live URL" className="w-full p-2 border" />

        <div className="flex space-x-2">
          <button type="submit" className="px-3 py-2 bg-indigo-600 text-white rounded">Save</button>
          <button type="button" onClick={()=>navigate('/admin/projects')} className="px-3 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}
