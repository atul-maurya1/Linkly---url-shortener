import { FcGoogle, FcBrokenLink } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setError] = useState("");

	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				"http://localhost:5000/api/v1/auth/register",
				{
					email,
					password,
					confirmPassword,
				},
			);

			console.log("res ", res.data);
			const id = res.data.data._id;
			navigate(`/otp-verification/${id}`);
		} catch (error) {
			const message =  error.response.data.message ;
			setError(message);
			//console.log("error is ", message);
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
				{/* Left Section */}
				<div className="bg-blue-950 text-white p-10 flex flex-col justify-center">
					<h1 className="text-4xl font-bold font-poppins">Join Linkly Today</h1>

					<p className="mt-4 text-blue-100 leading-relaxed">
						Create, manage, and track your shortened URLs with powerful
						analytics and lightning-fast performance.
					</p>

					<div className="mt-10 flex gap-2">
						<div>
							<FcBrokenLink size={30} />
						</div>

						<h1 className="font-poppins text-2xl font-bold text-white">
							Linkly
						</h1>
					</div>
				</div>

				{/* Right Section */}
				<div className="p-10">
					<h2 className="text-3xl font-bold text-gray-900">Create Account</h2>

					<p className="text-gray-500 mt-2">
						Start shortening links in minutes.
					</p>

					<form onSubmit={handleSubmit} className="mt-8 space-y-4">
						<input
							type="email"
							value={email}
							required
							placeholder="Enter your email"
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
						/>

						<input
							type="password"
							password={password}
							required
							placeholder="Create password"
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
						/>

						<input
							type="password"
							value={confirmPassword}
							required
							placeholder="Confirm password"
							className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>

						<button
							to="otp-verification"
							type="submit"
							className="w-full bg-blue-700 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition"
						>
							Create Account
						</button>
						<div>{errors && <p className="text-red-500">{errors}</p>}</div>
					</form>

					{/* Divider */}
					<div className="flex items-center my-6">
						<div className="flex-1 h-px bg-gray-200"></div>
						<span className="px-4 text-sm text-gray-400">OR</span>
						<div className="flex-1 h-px bg-gray-200"></div>
					</div>

					{/* Google Button */}
					<button className="w-full border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
						<FcGoogle size={24} />
						Continue with Google
					</button>

					<p className="text-center text-gray-500 mt-6">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-blue-700 font-medium cursor-pointer"
						>
							Log in
						</Link>
					</p>
					
				</div>
				
			</div>
		</div>
	);
};
export default Signup;
