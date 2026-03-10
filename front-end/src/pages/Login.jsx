import React from 'react'
import {useForm} from 'react-hook-form'
import '../styles/login.css'

const Login = () => {

  const {register, handleSubmit, formState:{errors}} = useForm()

  const onSubmit = (data) => {
    console.log("login data" , data);
  }

  return (
    <div className="login-container flex items-center justify-center min-h-screen font-sans bg-gray-50 p-4">
      <div className="login-card w-full max-w-md p-8 bg-white rounded-2xl border border-gray-100 relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <div className="text-center mb-8 mt-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-sm text-gray-500">Sign in to your account to continue shopping</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email",{required:{value:true,message:"Email is required"}})}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all placeholder-gray-400 text-gray-900"
            />
            {errors.email?.message && <p className='text-red-500 text-sm mt-1' >{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              {...register("password",{required:{value:true,message:"Password is required"}})}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all placeholder-gray-400 text-gray-900"
            />
            {errors.password?.message && <p className='text-red-500 text-sm mt-1' >{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/30 transition-all shadow-sm"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Create an account
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
