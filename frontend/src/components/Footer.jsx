import { FcBrokenLink } from "react-icons/fc";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import {Link} from 'react-router-dom'


const Footer = () => {
    return (
        

          <div  className="bg-blue-950 py-7 px-10 text-white " >

            <div className="flex flex-row justify-around"> 
           <div>
               <div className="flex flex-row  gap-2 py-2 ">
                    <div>
                        <FcBrokenLink size={30} color={"white"} />
                    </div>
                    <h1 to = "/"><h1 className="font-poppins text-2xl font-bold text-white">Linkly</h1> </h1>
			  </div>
               <p className="font-poppins text-gray-200">Simple Url shortener with powerfull</p>
                <div className="flex gap-5 py-3" > 
                    <a href=""><FaInstagram size={25} /></a> 
                    <a href=""><FaFacebook  size={25}/></a> 
                    <a href=""><BsTwitterX  size={25}/></a> 
                </div>
           </div>

               
                 <div className="flex flex-col gap-2 font-poppins" >
                    <h1 className="text-white font-poppins text-xl font-medium">Product</h1>
                   <Link><Link className="hover:text-blue-600 text-sm text-gray-200 " to="/">Features</Link></Link>
                   <Link><Link className="hover:text-blue-600 text-sm text-gray-200" to="/">Features</Link></Link>
                   <Link><Link className="hover:text-blue-600 text-sm text-gray-200" to="/">Features</Link></Link>
                   <Link><Link className="hover:text-blue-600 text-sm text-gray-200" to="/">Features</Link></Link>
                </div>
                 <div className="flex flex-col gap-2 font-poppins" >
                    <h1 className="text-white font-poppins text-xl font-medium">Product</h1>
                   <Link><Link className="hover:text-blue-600 text-sm text-gray-200 " to="/">Features</Link></Link>
                   <Link><Link className="hover:text-blue-600 text-sm text-gray-200" to="/">Features</Link></Link>
                   <Link><Link className="hover:text-blue-600 text-sm text-gray-200" to="/">Features</Link></Link>
                   <Link><Link className="hover:text-blue-600 text-sm text-gray-200" to="/">Features</Link></Link>
                </div>
                 <div className="flex flex-col gap-2 font-poppins" >
                    <h1 className="text-white font-poppins text-xl font-medium">Product</h1>
                   <Link><Link className="hover:text-blue-600 text-sm text-gray-200 " to="/">Features</Link></Link>
                   <Link><Link className="hover:text-blue-600 text-sm text-gray-200" to="/">Features</Link></Link>
                   <Link><Link className="hover:text-blue-600 text-sm text-gray-200" to="/">Features</Link></Link>
                   <Link><Link className="hover:text-blue-600 text-sm text-gray-200" to="/">Features</Link></Link>
                </div>
            </div>
            

          </div>


        
    )
}

export default Footer