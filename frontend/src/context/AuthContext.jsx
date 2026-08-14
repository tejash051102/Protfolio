import React, { createContext, useContext, useEffect, useState } from 'react'
import * as authAPI from '../services/authService'

const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    try{
      const res = await authAPI.me()
      if(res.data && res.data.success) setUser(res.data.data)
      else setUser(null)
    }catch(err){ setUser(null) }
    setLoading(false)
  }

  useEffect(()=>{ refresh() }, [])

  const login = async (email, password) => {
    const res = await authAPI.login(email, password)
    if(res.data && res.data.success) await refresh()
    return res
  }

  const logout = async () => {
    await authAPI.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}
