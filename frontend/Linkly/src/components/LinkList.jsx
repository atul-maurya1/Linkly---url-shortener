import { MdDelete } from "react-icons/md";
import {useState, useContext} from 'react'
import axios from 'axios'
import Swal from "sweetalert2";
import DashboardContext from '../context/DashboardContext'

const LinkList = ({ createdAt, id, url, shortUrl, totalClicksOnUrl }) => {

	const {fetchData} = useContext(DashboardContext)


	const [urlId , setUrlId] = useState("")

	const handleOnClick = (e) => {
		e.preventDefault()
		setUrlId(e.currentTarget.id)
	    deleteUrl()
			async function deleteUrl (){

				const result =  await Swal.fire({
				title: "Delete Link?",
				text: "You won't be able to recover this link!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it!",
				cancelButtonText: "Cancel",
		});
		
		if (!result.isConfirmed) return
		   const res = await axios.delete(`https://linkly-url-shortener-4gr0.onrender.com/api/v1/user/delete-url/${id}`,
			  { withCredentials: true },
			)
           await fetchData()

		Swal.fire("Deleted!", "Your link has been deleted.", "success");
	
	}
}
		
	
    return(
        <div>			
				<div className="mt-4 space-y-4">
					<div className="grid grid-cols-[1fr_2fr_0.8fr_1fr_auto] items-center px-8 py-1 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-cyan-50 shadow-md hover:shadow-lg transition-all duration-300">
						{/* Short URL */}
						<span className="font-semibold text-blue-700 ">
							{shortUrl}
						</span>

						
						<span className="py-5 px-7 text-sm text-slate-600  truncate">{url}</span>

						
						<span className="w-fit px-4 py-1 text-sm font-semibold text-cyan-700 bg-cyan-100 rounded-full break-words break-all whitespace-normal">
							{totalClicksOnUrl || 0}
						</span>

						
						<span className="text-slate-500">{new Date(createdAt).toLocaleDateString(
						  "en-IN",
							{
								day: "2-digit",
								month: "short",
								year: "numeric",
							}
							)}
						</span>

						
						<button  value={id} className="flex items-center justify-center w-8 h-8 rounded-xl  text-red-500 hover:bg-red-100 hover:text-red-600 transition cursor-pointer">
							<MdDelete onClick={handleOnClick}  id={id} size={22} />
						</button>
					</div>
				</div>
        </div>
    )
}

export default LinkList