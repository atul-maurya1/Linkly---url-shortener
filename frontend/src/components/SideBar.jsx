import { NavLink, useNavigate } from 'react-router-dom';
import { FcBrokenLink } from 'react-icons/fc';
import { MdDashboard } from 'react-icons/md';
import { IoIosSettings } from "react-icons/io";
import { CiLink } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import { IoMdCreate } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import UserContext from '../context/UserContext'
import {useContext} from "react"


import axios from 'axios'

const SideBar = () => {

  const {user} = useContext(UserContext)
  const navigate = useNavigate()

  const handleOnClick = async (e) => {
    e.preventDefault()
    try{

      const res = await axios.post('https://linkly-url-shortener-4gr0.onrender.com/api/v1/auth/logout',
          {},
          { withCredentials: true }
      )
      console.log("res ", res)
       
      navigate('/login')
      setUser(null);
       setDashboard(null);


    }catch(e){
      console.error(e?.response?.data?.message)
    }
  }

  return (
    <aside className="h-full border-none bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center gap-2">
        <div className="rounded-xl p-2 text-white">
          <FcBrokenLink size={22} />
        </div>
        <NavLink to="/" className="font-poppins text-2xl font-bold text-blue-700">
          Linkly
        </NavLink>
      </div>

      <div className="flex h-[calc(100%-4rem)] flex-col justify-between">
        <nav className="flex flex-col gap-2 font-poppins">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
              }`
            }
          >
            <MdDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/dashboard/links"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
              }`
            }
          >
            <CiLink size={18} />
            <span>My Links</span>
          </NavLink>

             <NavLink
            to="/dashboard/create-link"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
              }`
            }
          >
            <IoMdCreate size={18} />
            <span>Create Link</span>
          </NavLink>

          <NavLink
            to="/dashboard/setting"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
              }`
            }
          >
            <IoIosSettings size={18} />
            <span>Setting</span>
          </NavLink>
            <div className="flex my-3 items-center rounded-xl bg-gray-100 border border-gray-200 px-3 py-2.5  text-gray-800 text-xs font-poppins italic" >
              <FaUserAlt />
              <h2 className="pl-2" >{user?.email}</h2>
        </div>
        </nav>

      
        <button onClick={handleOnClick} className=" flex cursor-pointer items-center gap-3 rounded-xl bg-red-100 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-200">
          <IoIosLogOut size={18} />
          <p>Logout</p>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;