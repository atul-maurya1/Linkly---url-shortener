import { FcGoogle } from "react-icons/fc";
import { FcBrokenLink } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import {useState} from 'react'

export default function Login() {

  const[email , setEmail] = useState('')
  const[password, setPassword] = useState('')
  const [errors , serErrors] = useState('')


const navigate = useNavigate ()

const handleOnSubmit = async (e) =>{
  e.preventDefault()
  console.log(email, password)
  try{
    const res = await axios.post("http://localhost:5000/api/v1/auth/login ",{
      email,
      password
    }, { withCredentials: true })

    console.log("res ", res)
    navigate('/dashboard')

  }catch(err){
      const message =  err?.response?.data?.message;
      serErrors(message)
  }

  
}

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="bg-blue-950 text-white p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <FcBrokenLink size={50} />
            <h1 className="text-4xl font-bold font-poppins">
              Linkly
            </h1>
          </div>

          <h2 className="text-3xl font-bold mt-8">
            Welcome Back!
          </h2>

          <p className="mt-4 text-blue-100 leading-relaxed">
            Sign in to manage your links, track analytics,
            and grow your online presence.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Sign In
          </h2>

          <p className="text-gray-500 mt-2">
            Enter your credentials to continue.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleOnSubmit} >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <div>
              {errors && <p className="text-red-400 font-poppins text-sm" >{errors}</p>}
            </div>

            <div className="flex justify-end">
              <Link to='/forgot-password' className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

          
            <button
              type="submit"
              onClick={handleOnSubmit}
              className="w-full bg-blue-700 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-400">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <button className="w-full border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
            <FcGoogle size={24} />
            Continue with Google
          </button>

          <p className="text-center text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-700 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}