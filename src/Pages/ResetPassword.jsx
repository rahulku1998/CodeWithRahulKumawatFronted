import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export default function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/reset-password/${token}`,
        {
          password,
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-green-600/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">🔑</span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Reset Password
          </h1>

          <p className="text-slate-400 mt-3">
            Enter your new password below to regain access
            to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-200 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => window.location.href = "/login"}
            className="text-blue-400 hover:text-blue-300 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}