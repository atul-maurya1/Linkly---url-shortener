import UserContext from '../context/UserContext'
import {useContext, useState, useEffect} from "react"
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const Setting = () => {
   
      const {user} = useContext(UserContext)

      const [oldPassword, setOldPassword] = useState("")
      const [newPassword , setNewPassword] = useState("")
      const[confirmNewPassword, setConfirmNewPassword] = useState("")
      const [error , setError] = useState("")
      const [loading, setLoading] = useState(false)

    const navigate = useNavigate ()

      const hanldeOnClick = async (e) => {
         console.log("chnage password")
        e.preventDefault()
       
        setLoading(true)
        try{
            const res = await axios.post("https://linkly-url-shortener-4gr0.onrender.com/api/v1/auth/change-password",{
              oldPassword,
              newPassword,
              confirmNewPassword,
            }, {withCredentials: true})
            
            alert(res?.data?.data)
            navigate('/login')

        }catch(err){
                 setError(err.response?.data?.message)
                 if (err.response?.data?.message == "Received data is not valid") {
                     setError( err?.response?.data?.errors[0]?.newPassword)
                 }
                 //console.log(err?.response)
             setLoading(false)


        }finally{
            setLoading(false)
        }
      }

    return (
        <div className="max-w-xl mx-auto my-10 font-sans">
            <h2 className="mb-2 text-2xl font-semibold">Account Settings</h2>
            <div className="grid gap-4">
                <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                    <div className="text-xs text-gray-500 mb-1.5">Registered Email</div>
                    <div className="text-base text-slate-900 font-semibold">{user.email}</div>
                </div>

                <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                    <form onSubmit={hanldeOnClick}>
                        <div className="flex items-center justify-between mb-2.5">
                            <div>
                                <div className="text-sm font-semibold">Change Password</div>
                                <div className="text-xs py-2 text-red-600">{error}</div>
                            </div>
                            <button type="submit" disabled={loading} className="px-3 py-2 rounded-xl border border-gray-300 bg-blue-700 text-white cursor-pointer hover:bg-blue-500 disabled:opacity-50">
                                Change
                            </button>
                        </div>

                        <div className="grid gap-2.5">
                            <input onChange={(e) => (setOldPassword(e.target.value), setError(""))} required placeholder="Current password" type="text"  className="w-full p-2.5 rounded-xl border border-gray-200 bg-slate-50 text-sm" />
                            <input onChange={(e) => (setNewPassword(e.target.value), setError(""))} required placeholder="New password" type="text"  className="w-full p-2.5 rounded-xl border border-gray-200 bg-slate-50 text-sm" />
                            <input onChange={(e) => (setConfirmNewPassword(e.target.value), setError("") )} required placeholder="Confirm new password" type="text"  className="w-full p-2.5 rounded-xl border border-gray-200 bg-slate-50 text-sm" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Setting