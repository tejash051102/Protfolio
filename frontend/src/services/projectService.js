import api from './api'

export const getProjects = () => api.get('/projects')
export const getFeaturedProjects = () => api.get('/projects/featured')
export const getProjectBySlug = (slug) => api.get(`/projects/${slug}`)
