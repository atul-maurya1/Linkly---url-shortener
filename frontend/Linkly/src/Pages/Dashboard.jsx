import { LuMousePointerClick } from "react-icons/lu";
import { PiCursorClickFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import LinkList from "../components/LinkList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
	const [totalClicks, setTotalClicks] = useState();
	const [totalLinks, setTotalLinks] = useState();
	const [Links, setLinks] = useState([]);
	const [avgClick , setAvgClick] = useState(0)

	useEffect(() => {
		async function fetchData() {
			const res = await axios.get(
				"http://localhost:5000/api/v1/user/dashboard",
				{ withCredentials: true },
			);
			const clicksCount = res?.data?.data?.totalClicks || 0;
			const linkCount = res?.data?.data?.totalLinks || 0;
			const linkList = res?.data?.data?.links;
			const avgClicks =
					linkCount > 0
					? (clicksCount / linkCount).toFixed(2) : 0;

			setLinks(linkList);
			setTotalClicks(clicksCount);
			setTotalLinks(linkCount);
			setAvgClick(avgClicks)

		}
		fetchData();
	}, []);

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
							<h1 className="text-4xl font-bold mt-2">{totalClicks}</h1>
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
							<h1 className="text-4xl font-bold mt-2">{avgClick}%</h1>
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

				{Links.length ? Links.map((link) => (
					<LinkList
						key={link._id}
						id={link._id}
						url={link.url}
						shortUrl={link.shortUrl}
						createdAt={link.createdAt}
					/>
				)) : <h1 className="text-2xl font-poppins italic text-center text-blue-800 font-semibold py-20" >No Recent Links</h1> }
			</div>
		</div>
	);
}
