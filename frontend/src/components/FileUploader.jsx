import React, { useCallback, useState } from 'react'
import axios from 'axios'

export default function FileUploader({ type = 'misc', slug = '', multiple = false, onChange }){
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (e) => {
    e.preventDefault()
    const dt = e.dataTransfer
    const fileList = dt?.files || e.target.files
    if(!fileList) return
    const toUpload = multiple ? Array.from(fileList) : [fileList[0]]

    setUploading(true)
    const uploaded = []
    for(const file of toUpload){
      try{
        const fd = new FormData()
        fd.append('file', file)
        const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/upload?type=${type}&slug=${slug}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (p) => {
            // Could set progress state per file
          }
        })
        if(res.data && res.data.success) uploaded.push(res.data.data)
      }catch(err){
        console.error('Upload failed', err)
        alert(err.response?.data?.message || 'Upload failed')
      }
    }
    setUploading(false)
    setFiles(prev => multiple ? [...prev, ...uploaded] : uploaded)
    if(onChange) onChange(multiple ? [...files, ...uploaded] : uploaded[0])
  }, [type, slug, multiple, onChange, files])

  const removeAt = (index) => {
    const next = [...files]
    next.splice(index,1)
    setFiles(next)
    if(onChange) onChange(next)
  }

  return (
    <div>
      <div onDrop={onDrop} onDragOver={(e)=>e.preventDefault()} className="border-dashed border-2 p-4 text-center">
        <input type="file" multiple={multiple} onChange={onDrop} className="mb-2" />
        <div>Drag & drop files here or click to select</div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {files.map((f, idx) => (
          <div key={idx} className="border p-1">
            <img src={f.thumb || f.display || f.displayFallback} alt="preview" className="w-full h-24 object-cover" />
            <div className="flex justify-between mt-1">
              <div className="text-xs">{f.display ? 'Uploaded' : 'Pending'}</div>
              <button onClick={() => removeAt(idx)} className="text-red-600 text-xs">Remove</button>
            </div>
          </div>
        ))}
      </div>
      {uploading && <div className="mt-2">Uploading...</div>}
    </div>
  )
}
