import LinkList from "../components/LinkList";
import { useEffect , useState} from "react";
import {NavLink} from 'react-router-dom'
import axios from 'axios'


const Link = () => {

	const [page , setPage] = useState(1)
	const [links , setLinks] = useState([])
	const [loading , setLoading] = useState(false)
     const [totalPages, setTotalPages] = useState(1);

	
	const fetchUrls = async () => {
		
		setLoading(true)
		
		try{
			const res = await axios.get(`http://localhost:5000/api/v1/user/urls?page=${page}&limit=6`, {
			 withCredentials: true 
		})
		setLinks(res?.data?.data?.urls)
		setTotalPages(res?.data?.data?.totalPages);
		
		}catch(e){
			setLoading(false)
		}finally{
			setLoading(false)
		} 
	}

		function handleNext (e) {
			// only go to next page when we have a full page of results
			e.preventDefault()
			if(page >= totalPages)return
			setPage((prev) => prev + 1)
			
		}
	function handlePrev (e) {
			e.preventDefault()
			if(page === 1) return
			setPage((prev) => prev - 1)
	}	

	useEffect(() => {
        fetchUrls()
	},[page])
	
	return (
		<div>
			<div className="flex justify-between items-center p-5">
				<h1 className="text-2xl font-bold text-blue-800 font-poppins">
					My Links
				</h1>

				<NavLink to="/dashboard/create-link" className="bg-blue-800 text-white px-4 py-3 font-semibold rounded cursor-pointer hover:bg-blue-600 transition-transform duration-400 hover:scale-95">
					Create Link
				</NavLink>
			</div>
			<div className="grid grid-cols-[1fr_2fr_0.8fr_1fr_auto] items-center px-8 py-4 border-b border-blue-200 text-blue-500 uppercase text-xs tracking-widest font-semibold font-poppins">
				<span>Short Link</span>
				<span>Original Link</span>
				<span>Clicks</span>
				<span>Created At</span>
				<span className="justify-self-center">Action</span>
			</div>
			<div>
				{
					loading ? <p className="font-poppins text-blue-500 italic text-center pt-10" >Fetching...</p> :
					<div className="h-130" >
					{links.length > 0 ? (
						links.map((link) => (
							<LinkList
								key={link._id}
								id={link._id}
								url={link.url}
								shortUrl={link.shortUrl}
								createdAt={link.createdAt}
								totalClicksOnUrl={link.totalClicksOnUrl}
							/>
						))
					) : (
						<h1 className="text-2xl font-poppins italic text-center text-blue-800 font-semibold py-20">
							No Recent Links
						</h1>
					)}
				</div>
				}

				{links.length >= 1  ? <div className="flex justify-center gap-6 p pt-8">
					<button
						onClick={handlePrev}
						disabled={page === 1}
						className={`px-4 py-3 font-semibold rounded transition-transform duration-200 ${page === 1 ? 'bg-blue-200 text-blue-400 cursor-not-allowed' : 'bg-blue-800 text-white hover:scale-105'}`}
					>
						Prev -
					</button>
					<button onClick={handleNext} disabled={page >= totalPages} className="bg-blue-800 text-white px-4 py-3 font-semibold rounded cursor-pointer  transition-transform duration-200 hover:scale-105">
						Next - {page} {" "}
					</button>
				</div>: <div></div> }
			</div>
		</div>
	);
};

export default Link;
