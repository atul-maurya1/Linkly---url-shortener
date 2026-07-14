import { LuMousePointerClick } from "react-icons/lu";
import { PiCursorClickFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import LinkList from "../components/LinkList";
import { useState , useContext  } from "react";
import DashboardContext from '../context/DashboardContext'

export default function Dashboard() {

	const {dashboard} = useContext(DashboardContext)

	const totalLinks = dashboard?.totalLinks || 0
    let totalClicksCount = dashboard?.links?.reduce((a , b) => a + (b?.totalClicksOnUrl ), 0 )|| 0
    const Links = dashboard?.links || []; 

	let avgClickRate =  totalClicksCount ? (totalClicksCount / totalLinks).toFixed(2) : 0


	return (
		<div>
			<div className="flex flex-row justify-center gap-25 mt-8">
				<div className="bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-xl rounded-3xl p-6 w-72">
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-sm uppercase tracking-widest opacity-80">
								Total Links
							</p>
							<h1 className="text-4xl font-bold mt-2">{totalLinks}</h1>
						</div>
						<div className="bg-white/20 rounded-full p-3">
							<span className="text-2xl">🔗</span>
						</div>
					</div>
					<p className="text-sm opacity-90">
						All your shortened URLs are tracked here with click analytics.
					</p>
				</div>

				<div className="bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-xl rounded-3xl p-6 w-72">
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-sm uppercase tracking-widest opacity-80">
								Total Clicks
							</p>
							<h1 className="text-4xl font-bold mt-2">{totalClicksCount}</h1>
						</div>
						<div className="bg-white/20 rounded-full p-3">
							<span className="text-2xl">
								<LuMousePointerClick />
							</span>
						</div>
					</div>
					<p className="text-sm opacity-90">
						All your shortened URLs are tracked here with click analytics.
					</p>
				</div>

				<div className="bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-xl rounded-3xl p-6 w-72">
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-sm uppercase tracking-widest opacity-80">
								Avg Click Rate
							</p>
							<h1 className="text-4xl font-bold mt-2">{avgClickRate}%</h1>
						</div>
						<div className="bg-white/20 rounded-full p-3">
							<span className="text-2xl">
								<PiCursorClickFill />
							</span>
						</div>
					</div>
					<p className="text-sm opacity-90">
						All your shortened URLs are tracked here with click analytics.
					</p>
				</div>
			</div>

			<div className="px-8 py-8 mx-16 mt-16 bg-white border border-blue-200 rounded-3xl shadow-xl">
				<h1 className="pb-6 text-2xl font-bold text-blue-800 font-poppins">
					Recent Links
				</h1>
				<div className="grid grid-cols-[1fr_2fr_0.8fr_1fr_auto] items-center px-8 py-4 border-b border-blue-200 text-blue-500 uppercase text-xs tracking-widest font-semibold font-poppins">
					<span>Short Link</span>
					<span>Original Link</span>
					<span>Clicks</span>
					<span>Created At</span>
					<span className="justify-self-center">Action</span>
				</div>

				{ Links.length > 0 ? Links.map((link) => (
					<LinkList
						key={link._id}
						id={link._id}
						url={link.url}
						shortUrl={link.shortUrl}
						createdAt={link.createdAt}
						totalClicksOnUrl={link.totalClicksOnUrl}
					/>
				)) : <h1 className="text-2xl font-poppins italic text-center text-blue-800 font-semibold py-20" >No Recent Links</h1> }
			</div>
		</div>
	);
}
