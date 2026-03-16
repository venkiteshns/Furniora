import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { handleLogin } from '../services/user'
import '../styles/login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../store/authSlice'

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [exist, setExist] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const user = await handleLogin(data);
    if (!user.found) {
      setExist("Couldn't find an account with this email. Please try again!");
      return;
    } else if (!user.isValid) {
      setExist("Password seems to be incorrect . Please try again!");
      return;
    }
    setExist(null)
    if (!userInfo) {
      dispatch(setCredentials({ ...user.user }));
    }
    navigate('/', { replace: true })
  }

  return (
    <div className="login-container flex items-center justify-center min-h-screen font-sans bg-gray-50 p-4">
      <div className="login-card w-full max-w-md p-8 bg-white rounded-2xl border border-gray-100 relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>

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
              {...register("email", { required: { value: true, message: "Email is required" } })}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 outline-none transition-all placeholder-gray-400 text-gray-900"
            />
            {errors.email?.message && <p className='text-red-500 text-sm mt-1' >{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: { value: true, message: "Password is required" } })}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 outline-none transition-all placeholder-gray-400 text-gray-900 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiOutlineEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password?.message && <p className='text-red-500 text-sm mt-1' >{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-900/30 transition-all shadow-sm"
          >
            Sign In
          </button>
        </form>
        <div className='text-center mt-4' >
          {exist && <p className='text-red-500 text-sm mt-1'>{exist}</p>}
        </div>
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <NavLink to="/signup" className="font-medium text-gray-900 hover:text-gray-700 transition-colors">
            Create an account
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default Login
