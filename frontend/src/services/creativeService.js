import api from './api'

// Public
export const getCreative = (page=1, limit=20, filters={}) => api.get('/creative', { params: { page, limit, ...filters } })
export const getCreativeItem = (id) => api.get(`/creative/${id}`)

// Admin
export const adminGetCreative = (page=1, limit=50) => api.get('/admin/creative', { params: { page, limit } })
export const adminGetCreativeItem = (id) => api.get(`/admin/creative/${id}`)
export const adminCreateCreative = (data) => api.post('/admin/creative', data)
export const adminUpdateCreative = (id, data) => api.put(`/admin/creative/${id}`, data)
export const adminDeleteCreative = (id) => api.delete(`/admin/creative/${id}`)
