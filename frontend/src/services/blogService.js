const api = require('./api')

export const getBlogs = (page = 1, limit = 10) => api.get('/blogs', { params: { page, limit } })
export const getBlogBySlug = (slug) => api.get(`/blogs/${slug}`)

// Admin
export const adminCreateBlog = (data) => api.post('/admin/blogs', data)
export const adminUpdateBlog = (id, data) => api.put(`/admin/blogs/${id}`, data)
export const adminDeleteBlog = (id) => api.delete(`/admin/blogs/${id}`)
