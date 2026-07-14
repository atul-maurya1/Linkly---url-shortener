import { Link } from "react-router";
import { FcBrokenLink } from "react-icons/fc";
import {useContext} from 'react'
import UserContext from '../context/UserContext.js'

const Navbar = () => {

    const {user} = useContext(UserContext) 

	return (
		<div className="flex flex-row justify-between items-center px-20 py-5 shadow-sm fixed top-0 left-0 w-full bg-white z-50">
			<div className="flex flex-row  gap-2">
				<div>
					<FcBrokenLink size={30} />
				</div>
                <Link to = "/"><h1 className="font-poppins text-2xl font-bold text-blue-700">Linkly</h1> </Link>
				
			</div>
			<div className="flex gap-30 font-poppins font-medium text-gray-600 items-center ">
				<div className="flex gap-6 " >
                    <Link className="hover:text-blue-600" to="/">Home</Link>
                    <Link className="hover:text-blue-600" to="/about">About Us</Link>
                    <Link className="hover:text-blue-600" to="/contact">Contact</Link>
                </div>
				{user ? <Link to="dashboard" className="bg-blue-600 text-white px-5 py-3"  >Go to Dashboard</Link> : 
				<div className="flex gap-7 items-center" >
					<Link className="text-gray-700 text-md cursor-pointer hover:text-blue-600" to="login" >Log in</Link>
					<Link className="bg-blue-700 text-white px-3 py-2 rounded cursor-pointer hover:bg-blue-600" to="signup" >Sign up</Link>
				</div>
				}
                
				
			</div>
            
		</div>
	);
};

export default Navbar;
