import LinkList from "../components/LinkList";
import DashboardContext from "../context/DashboardContext";
import { useContext } from "react";
import {NavLink} from 'react-router-dom'

const Link = () => {
	const { dashboard } = useContext(DashboardContext);
	const Links = dashboard?.links || [];

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
				<div className="h-130" >
					{Links.length > 0 ? (
						Links.map((link) => (
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

				{Links.length > 6 ? <div className="flex justify-center gap-6 p pt-8">
					<div className="bg-blue-800 text-white px-4 py-3 font-semibold rounded cursor-pointer hover:bg-blue-600 transition-transform duration-200 hover:scale-105">
						Prev -
					</div>
					<div className="bg-blue-800 text-white px-4 py-3 font-semibold rounded cursor-pointer hover:bg-blue-600 transition-transform duration-200 hover:scale-105">
						Next +{" "}
					</div>
				</div>: <div></div> }
			</div>
		</div>
	);
};

export default Link;
