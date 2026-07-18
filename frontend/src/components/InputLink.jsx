
const InputLink = () => {
    return (
       <>
        <div className="w-full max-w-3xl mx-30 bg-white rounded-2xl border border-gray-200  p-6 md:p-8 lg:-mt-20 shadow-[0_0_8px_0_rgba(0,0,0,0.04)] absolute">
				<form className="flex flex-col md:flex-row gap-4">
					<input
						type="url"
						placeholder="Paste your long URL here..."
						className="flex-1 px-5 py-4 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
					/>

					<button
						type="submit"
						className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
					>
						Shorten URL
					</button>
				</form>
                	
			</div>
       </>
    )
}
export default InputLink