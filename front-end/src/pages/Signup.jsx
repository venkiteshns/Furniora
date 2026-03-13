import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { handleSignup } from '../services/user'
import {setCredentials} from '../store/authSlice.js'
import '../styles/signup.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Signup = () => {

  const [exist,setExist] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {register,handleSubmit,watch, formState:{errors}} = useForm();

  const { userInfo } = useSelector((state) => state.auth);

  const onSubmit = async(data) => {
    let user = await handleSignup(data)
    if(typeof user === 'string'){
      setExist(true)
      return;
    }
    setExist(false)
    dispatch(setCredentials({ ...user }));
    navigate('/',{ replace: true })
  }

  return (
     <div className="signup-container flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans bg-gray-50">
      <div className="signup-card w-full max-w-md p-8 bg-white rounded-2xl border border-gray-100 relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>

        <div className="text-center mb-8 mt-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Create an Account</h1>
          <p className="text-sm text-gray-500">Join us to start your shopping journey</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("name",{
                required:{value:true, message: "Username is required"}
              })}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 outline-none transition-all placeholder-gray-400 text-gray-900"
            />
            {errors.name?.message && <p className='text-red-500 text-sm mt-1' >{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email",{required : {value:true,message:"Email is required"},pattern:{value:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,message:"Please enter a valid email"}})}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 outline-none transition-all placeholder-gray-400 text-gray-900"
            />
            {errors.email?.message && <p className='text-red-500 text-sm mt-1' >{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password",{
                  required:{value:true,message:"Password is required", pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/ ,message:"Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."}}
                })}
                placeholder="Abcd@1234"
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

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword",{
                  required:"Please comfirm you password",
                  validate:(value) => 
                    value === watch('password') || "Password is not matching"
                })}
                placeholder="Confirm your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 outline-none transition-all placeholder-gray-400 text-gray-900 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiOutlineEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword?.message && <p className='text-red-500 text-sm mt-1' >{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-900/30 transition-all shadow-sm mt-4!important"
          >
            Create Account
          </button>
        </form>
        <div className='text-center mt-4' >
          {exist && <p className='text-red-500 text-sm mt-1'> User Already Exist with same E-mail <br />Please try again with another one!</p>}
        </div>
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <NavLink to="/login" className="font-medium text-gray-900 hover:text-gray-700 transition-colors">
            Log in here
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default Signup