import LinkList from "../components/LinkList";

const Link = () => {
	return (
		<div>
			<div className="flex justify-between items-center p-5">
				<h1 className="text-2xl font-bold text-blue-800 font-poppins">
					My Links
				</h1>

				<button className="bg-blue-800 text-white px-4 py-3 font-semibold rounded cursor-pointer hover:bg-blue-600 transition-transform duration-400 hover:scale-95">
					Create Link
				</button>
			</div>
			<div className="grid grid-cols-[1fr_2fr_0.8fr_1fr_auto] items-center px-8 py-4 border-b border-blue-200 text-blue-500 uppercase text-xs tracking-widest font-semibold font-poppins">
				<span>Short Link</span>
				<span>Original Link</span>
				<span>Clicks</span>
				<span>Created At</span>
				<span className="justify-self-center">Action</span>
			</div>
			<div>
				<LinkList />
				<LinkList />
				<LinkList />
				<LinkList />
				<LinkList />
				<LinkList />
				<LinkList />
				<div className="flex justify-center gap-6 p pt-10">
					<div className="bg-blue-800 text-white px-4 py-3 font-semibold rounded cursor-pointer hover:bg-blue-600 transition-transform duration-200 hover:scale-105">
						Prev -
					</div>
					<div className="bg-blue-800 text-white px-4 py-3 font-semibold rounded cursor-pointer hover:bg-blue-600 transition-transform duration-200 hover:scale-105">
						Next +{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Link;
