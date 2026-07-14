import { MdDelete } from "react-icons/md";


const LinkList = ({ createdAt, id, url, shortUrl, totalClicksOnUrl }) => {
	
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
							{totalClicksOnUrl}
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

						
						<button vlaue={id} className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition cursor-pointer">
							<MdDelete size={20} />
						</button>
					</div>
				</div>
        </div>
    )
}

export default LinkList