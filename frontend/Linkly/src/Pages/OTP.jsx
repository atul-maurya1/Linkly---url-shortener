import { Link ,useNavigate, useParams} from "react-router-dom";
import { FcBrokenLink } from "react-icons/fc";
import {useState , useContext} from 'react'
import axios from 'axios'
import DashboardContext from '../context/DashboardContext'
import UserContext from '../context/UserContext'

export default function VerifyOTP() {

  const { setUser } = useContext(UserContext);	
  const {fetchData} = useContext(DashboardContext)

  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [errors , setError] = useState('')

  const {id} = useParams()

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    try{
   
      const res = await axios.post(`http://localhost:5000/api/v1/auth/verify-email/${id}`, {
        otp, }, { 
    withCredentials: true
  })
      await fetchData()
      setUser(res?.data?.data?.user) 
      navigate('/dashboard')
      console.log(res.data)

    }catch(error){
      console.log("errr", error.response.data.message )
      const message =    error.response?.data?.message ||error.message || "Something went wrong";
			setError(message);
      console.log("error ", error.message)

    }

  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="flex flex-col items-center">
          <FcBrokenLink size={60} />

          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Verify OTP
          </h1>

          <p className="text-center text-gray-500 mt-3">
            We've sent a verification code to your email.
          </p>
        </div>

        <form className="mt-8">
          <div className="flex justify-center gap-3">
            <input
              maxLength={6}
              required
              placeholder="Please enter your otp !"
              onChange={(e) => setOtp(e.target.value)}
              className="w-94 h-14  px-5 text-xl  border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            {/* <input
              maxLength={1}
              className="w-14 h-14 text-center text-xl font-semibold border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <input
              maxLength={1}
              className="w-14 h-14 text-center text-xl font-semibold border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <input
              maxLength={1}
              className="w-14 h-14 text-center text-xl font-semibold border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <input
              maxLength={1}
              className="w-14 h-14 text-center text-xl font-semibold border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <input
              maxLength={1}
              className="w-14 h-14 text-center text-xl font-semibold border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            /> */}
          </div>

          <div>
            {errors && <p className="text-red-500">{errors}</p>}
          </div>

          <button
            type="submit"
            onClick={handleOnSubmit}
            className="w-full mt-8 bg-blue-700 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition"
          >
            Verify OTP
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500">
            Didn't receive the code?
          </p>

          <button
            className="mt-2 text-blue-700 font-medium hover:underline"
          >
            Resend OTP
          </button>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-gray-500 hover:text-blue-700"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}