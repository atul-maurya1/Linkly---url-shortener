import { SiSpeedypage } from "react-icons/si";

const Card = ({ title, description, icon, iconBg, iconColor }) => {
	const Icon = icon;
	return (
		<div className="py-5 pt-20">
			<div className="group w-full max-w-xs bg-white rounded-2xl p-8 flex flex-col items-center text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer ">
				<div
					className={`p-5 rounded-2xl ${iconBg} group-hover:bg-blue-100 transition-colors`}
				>
					<Icon size={32} className={iconColor} />
				</div>

				<h1 className="mt-5 text-xl font-semibold font-poppins text-gray-900">
					{title}
				</h1>

				<p className="mt-3 text-gray-500 leading-relaxed font-poppins">
					{description}
				</p>
			</div>
		</div>
	);
};

export default Card;
