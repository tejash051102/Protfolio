import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { adminCreateBlog, adminUpdateBlog, getBlogs } from '../../services/blogService'

export default function BlogEdit(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '' })

  useEffect(()=>{
    if(id){
      // fetch single blog via admin list (simple)
      getBlogs(1,100).then(res => {
        const b = res.data.data.find(x => x._id === id)
        if(b) setForm(b)
      }).catch(()=>{})
    }
  },[id])

  const save = async () => {
    try{
      if(id) await adminUpdateBlog(id, form)
      else await adminCreateBlog(form)
      navigate('/admin/blogs')
    }catch(err){ console.error(err) }
  }

  return (
    <div className="p-8 max-w-3xl">
      <h2 className="text-xl font-bold">{id ? 'Edit' : 'New'} Blog</h2>
      <div className="mt-4 space-y-3">
        <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="Title" className="w-full p-2 border" />
        <input value={form.slug} onChange={e=>setForm({...form, slug: e.target.value})} placeholder="Slug" className="w-full p-2 border" />
        <input value={form.excerpt} onChange={e=>setForm({...form, excerpt: e.target.value})} placeholder="Excerpt" className="w-full p-2 border" />
        <textarea value={form.content} onChange={e=>setForm({...form, content: e.target.value})} placeholder="Content" className="w-full p-2 border h-48" />
        <div>
          <button onClick={save} className="px-3 py-2 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  )
}
