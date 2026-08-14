import api from './api'

export const login = async (email, password) => {
  return api.post('/auth/login', { email, password })
}

export const logout = async () => {
  return api.post('/auth/logout')
}

export const me = async () => {
  return api.get('/auth/me')
}
