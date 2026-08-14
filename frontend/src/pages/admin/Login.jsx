import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})

export default function AdminLogin(){
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try{
      await login(data.email, data.password)
      navigate(from, { replace: true })
    }catch(err){
      // login() will throw if API returns error; show generic message
      alert(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <div className="mb-2">
          <input className="w-full p-2 border" placeholder="Email" {...register('email')} />
          {errors.email && <div className="text-red-600 text-sm">{errors.email.message}</div>}
        </div>
        <div className="mb-4">
          <input className="w-full p-2 border" placeholder="Password" type="password" {...register('password')} />
          {errors.password && <div className="text-red-600 text-sm">{errors.password.message}</div>}
        </div>
        <button disabled={isSubmitting} className="w-full p-2 bg-indigo-600 text-white rounded">{isSubmitting ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  )
}
