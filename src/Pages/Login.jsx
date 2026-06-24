import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/login`,
        data
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
     toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-slate-400 mt-2">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3.5 text-base bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <Link to='/forgetpass'>
              <button
              type="button"
              className="text-sm text-red-400 hover:text-blue-300 cursor-pointer"
            >
              Forgot Password?
            </button>
            </Link>
            
          </div>
          
           <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          
          
        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link to='/signup'>
          <span className="text-blue-400 cursor-pointer hover:text-blue-300">
            Sign Up
          </span>
          </Link>
          
        </p>
      </div>
    </div>
  );
}