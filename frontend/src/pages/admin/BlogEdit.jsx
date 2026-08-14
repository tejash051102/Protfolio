import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { adminCreateBlog, adminUpdateBlog, adminGetBlogs, adminGetBlog } from '../../services/blogService'
import FileUploader from '../../components/FileUploader'
import ReactMarkdown from 'react-markdown'

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.string().optional(), // comma separated
  author: z.string().optional(),
  published: z.boolean().optional()
})

export default function BlogEdit(){
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, watch } = useForm({ resolver: zodResolver(schema) })
  const [cover, setCover] = useState(null)
  const content = watch('content')

  useEffect(()=>{
    if(id){
      adminGetBlog(id).then(res => {
        const b = res.data.data
        setValue('title', b.title)
        setValue('slug', b.slug)
        setValue('excerpt', b.excerpt)
        setValue('content', b.content)
        setValue('category', b.category)
        setValue('tags', b.tags ? b.tags.join(',') : '')
        setValue('author', b.author)
        setValue('published', b.published)
        if(b.coverImage) setCover({ display: b.coverImage })
      }).catch(()=>{})
    }
  },[id, setValue])

  const onSubmit = async (data) => {
    try{
      const payload = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(s=>s.trim()).filter(Boolean) : [],
        coverImage: cover?.display || null
      }
      if(id) await adminUpdateBlog(id, payload)
      else await adminCreateBlog(payload)
      navigate('/admin/blogs')
    }catch(err){
      alert(err.response?.data?.message || 'Save failed')
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <h2 className="text-xl font-bold">{id ? 'Edit' : 'New'} Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
        <input {...register('title')} placeholder="Title" className="w-full p-2 border" />
        <input {...register('slug')} placeholder="Slug (optional)" className="w-full p-2 border" />
        <input {...register('excerpt')} placeholder="Excerpt" className="w-full p-2 border" />

        <div>
          <label className="block">Cover Image</label>
          <FileUploader type="blogs" multiple={false} onChange={(f) => setCover(f)} />
        </div>

        <div>
          <textarea {...register('content')} placeholder="Content (Markdown)" className="w-full p-2 border h-48" />
          <div className="mt-2">
            <h3 className="text-sm font-semibold">Preview</h3>
            <div className="border p-2 bg-white">
              <ReactMarkdown>{content || ''}</ReactMarkdown>
            </div>
          </div>
        </div>

        <input {...register('category')} placeholder="Category" className="w-full p-2 border" />
        <input {...register('tags')} placeholder="Tags (comma separated)" className="w-full p-2 border" />
        <input {...register('author')} placeholder="Author" className="w-full p-2 border" />

        <div className="flex items-center space-x-3">
          <label className="flex items-center"> <input {...register('published')} type="checkbox" className="mr-2" /> Publish</label>
          <button type="submit" className="px-3 py-2 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  )
}
