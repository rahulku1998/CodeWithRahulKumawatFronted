import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/forgot-password`,
        { email }
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen overflow-x-hidden bg-slate-950 flex items-center justify-center px-4 sm:px-6 py-8">
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8">

      {/* Header */}
      <div className="text-center mb-6 md:mb-8">

        <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-blue-600/20 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl md:text-3xl">🔒</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Forgot Password?
        </h1>

        <p className="text-sm md:text-base text-slate-400 mt-3">
          Enter your email address and we'll send you a
          password reset link.
        </p>

      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">

        <div>
          <label className="block text-sm text-slate-300 mb-2">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 md:py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200 disabled:opacity-50 text-sm md:text-base"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

      </form>

      {/* Footer */}
      <div className="mt-5 md:mt-6 text-center">
        <button
          type="button"
          className="text-sm md:text-base text-blue-400 hover:text-blue-300 transition"
        >
          Back to Login
        </button>
      </div>

    </div>
  </div>
);
}