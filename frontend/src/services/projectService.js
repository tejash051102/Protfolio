import api from './api'

// Public
export const getProjects = (page=1, limit=10) => api.get('/projects', { params: { page, limit } })
export const getFeaturedProjects = () => api.get('/projects/featured')
export const getProjectBySlug = (slug) => api.get(`/projects/${slug}`)

// Admin
export const adminGetProjects = (page=1, limit=50) => api.get('/admin/projects', { params: { page, limit } })
export const adminGetProject = (id) => api.get(`/admin/projects/${id}`)
export const adminCreateProject = (data) => api.post('/admin/projects', data)
export const adminUpdateProject = (id, data) => api.put(`/admin/projects/${id}`, data)
export const adminDeleteProject = (id) => api.delete(`/admin/projects/${id}`)

export const uploadFile = (file, type='projects', slug='') => {
  const fd = new FormData()
  fd.append('file', file)
  return api.post(`/upload?type=${type}&slug=${slug}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
}
