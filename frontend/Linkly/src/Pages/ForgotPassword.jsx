
import { FcBrokenLink } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="flex flex-col items-center">
          <FcBrokenLink size={60} />
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Forgot Password?
          </h1>

          <p className="text-center text-gray-500 mt-3">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition"
          >
            Send OTP
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-blue-700 font-medium hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}