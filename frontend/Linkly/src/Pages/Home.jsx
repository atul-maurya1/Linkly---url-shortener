import { PiShootingStarFill } from "react-icons/pi";
import Card from '../components/Card'
import companies from '../assets/CompinesLogos'
import {
  SiSpeedypage,
  SiGoogleanalytics,
  SiLinktree,
  SiSecurityscorecard,
} from "react-icons/si";
import Logos from "../components/Logos.jsx";
import InputLink from "../components/InputLink.jsx";

const Home = () => {

 const features = [
  {
    id: 1,
    title: "Lightning Fast",
    description: "Shorten your links in a fraction of a second.",
    icon: SiSpeedypage,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Detailed Analytics",
    description: "Track clicks, locations, and user engagement.",
    icon: SiGoogleanalytics,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    title: "Custom Links",
    description: "Create branded and memorable short URLs.",
    icon: SiLinktree,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 4,
    title: "Secure & Reliable",
    description: "Your links are protected and always available.",
    icon: SiSecurityscorecard,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

	return (
	
	<div className=" px-30 " >
    	<div className="h-150 py-25">
			<div className="flex flex-row w-full">
				<div className="w-1/2 py-15">
					<div className="font-poppins border border-gray-300 rounded-2xl px-3 py-1 flex w-fit items-center gap-1.5 my-5">
						{" "}
						<PiShootingStarFill size={15} color={"blue"} /> Fast, Simple,
						Reliable
					</div>
					<div className="py-5">
						<h1 className="text-5xl text-black font-semibold font-poppins py-1 pb-2">
							Shorten links,{" "}
						</h1>
						<h1 className="text-5xl text-blue-800 font-semibold font-poppins py-1">
							share everywhere.
						</h1>
					</div>
					<p className=" font-poppins text-gray-700 leading-7">
						Linkly is a fast and secure URL shortener that helps you <br />{" "}
						share links, tracks clicks, and grow your audience.
					</p>
				</div>

				<div className="w-1/2 flex  py-10 relative ">
					<img
						src="src\assets\ae34a3f5-4b22-48a7-8d7f-add173119817.png"
					></img>
				</div>
			</div>
			
           
		   <div>
			<InputLink />
			<p className="mt-4 text-sm text-gray-500 text-center md:text-left absolute pl-40 ">
					By clicking <span className="font-medium">Shorten URL</span>, you
					agree to our{" "}
					<span className="text-blue-600 cursor-pointer hover:underline">
						Terms & Conditions
					</span>
				</p>
		   </div>
		   
		</div>
        <div className="py-20 flex md:flex-wrap lg:gap-5 lg:flex-nowrap gap-6" >
           {features.map((items, idx) =>  <Card key={idx} title={items.title} description={items.description} icon={items.icon} iconBg={items.iconBg} iconColor={items.iconColor} />)}
        </div>
		<div className="flex flex-col items-center">
			<h1 className="text-2xl font-poppins font-semibold text-center">Trusted by creators and <br/> businesses worldwide</h1>
			<p className= "py-3 font-poppins text-gray-500">Powering millions of shortened links ervery day</p>
		</div>
		<div  className="flex flex-row justify-center gap-30  py-15">
			{ companies.map((item , index) => <Logos key={index} icon={item.icon} name={item.name} />) }
		</div>	
   </div>
   
	);
};

export default Home;
