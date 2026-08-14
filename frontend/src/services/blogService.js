import api from './api'

export const getBlogs = (page = 1, limit = 10) => api.get('/blogs', { params: { page, limit } })
export const getBlogBySlug = (slug) => api.get(`/blogs/${slug}`)

// Admin
export const adminGetBlogs = (page=1, limit=50) => api.get('/blogs/admin/list', { params: { page, limit } })
export const adminGetBlog = (id) => api.get(`/blogs/admin/${id}`)
export const adminCreateBlog = (data) => api.post('/blogs/admin', data)
export const adminUpdateBlog = (id, data) => api.put(`/blogs/admin/${id}`, data)
export const adminDeleteBlog = (id) => api.delete(`/blogs/admin/${id}`)
