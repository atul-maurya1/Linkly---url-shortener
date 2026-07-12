import { NavLink, useNavigate } from 'react-router-dom';
import { FcBrokenLink } from 'react-icons/fc';
import { MdDashboard } from 'react-icons/md';
import { IoIosSettings } from "react-icons/io";
import { CiLink } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import { IoMdCreate } from "react-icons/io";
import axios from 'axios'


const SideBar = () => {

  const navigate = useNavigate()

  const handleOnClick = async (e) => {
    e.preventDefault()
    try{

      const res = await axios.post('http://localhost:5000/api/v1/auth/logout',
          {},
          { withCredentials: true }
      )
      console.log("res ", res)

      navigate('/login')

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
        </nav>

        <button onClick={handleOnClick} className="flex cursor-pointer items-center gap-3 rounded-xl bg-red-100 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-200">
          <IoIosLogOut size={18} />
          <p>Logout</p>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;