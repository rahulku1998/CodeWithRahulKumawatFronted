import { useState } from "react";
import axios from "axios";
import {Helmet} from "react-helmet-async";
const API_URL = import.meta.env.VITE_API_URL;
export default function Freelance() {
  const [mode, setMode] = useState("freelance");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDeadline: "",
    projectDescription: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/freelance`,
        formData
      );

      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl">
          <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-6">
            <span className="text-5xl">✓</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Thank You!
          </h1>

          <p className="text-lg text-gray-300 mb-4">
            {mode === "freelance"
              ? "Your project request has been submitted successfully."
              : "Your mock interview request has been submitted successfully."}
          </p>

          <p className="text-gray-500">
            A confirmation email has been sent to your inbox.
            I will review your request and get back to you shortly.
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                projectDeadline: "",
                projectDescription: "",
              });
            }}
            className="mt-8 bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-xl font-semibold transition"
          >
            Submit Another Request
          </button>
        </div>
      </section>
    );
  }

  return (
      

    <section className="min-h-screen bg-slate-950 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
  
     <Helmet>
    <title>Freelance | Interview | CodeWithRahulKumawat</title>
    </Helmet>


        {/* Header */}
        <div className="text-center mb-12">
          <span className="px-4 py-2 bg-orange-500/10 text-orange-400 rounded-full text-sm border border-orange-500/20">
            Let's Work Together
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 mb-4">
            {mode === "freelance"
              ? "Hire Me For Your Project"
              : "Schedule A Free Mock Interview"}
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            {mode === "freelance"
              ? "Need a modern web application, AI Agent , MERN stack project, Spring Boot backend,Data Analytics or full-stack solution? Let's build it together."
              : "Practice technical interviews, DSA rounds, resume discussion and get actionable feedback."}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex gap-2">
            <button
              type="button"
              onClick={() => setMode("freelance")}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                mode === "freelance"
                  ? "bg-orange-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              💼 Hire Me
            </button>

            <button
              type="button"
              onClick={() => setMode("mock")}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                mode === "mock"
                  ? "bg-orange-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🎯 Mock Interview
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-slate-800 border border-slate-700 focus:border-orange-500 rounded-xl p-4 outline-none transition"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-slate-800 border border-slate-700 focus:border-orange-500 rounded-xl p-4 outline-none transition"
              />
            </div>

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 focus:border-orange-500 rounded-xl p-4 outline-none transition"
            />

            <input
              type="number"
              name="projectDeadline"
              placeholder={
                mode === "freelance"
                  ? "Project Deadline (Days)"
                  : "Want To Schedule Interview In Next (Days)"
              }
              required
              value={formData.projectDeadline}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 focus:border-orange-500 rounded-xl p-4 outline-none transition"
            />

            <textarea
              rows="6"
              name="projectDescription"
              placeholder={
                mode === "freelance"
                  ? "Describe your project requirements, features, technologies and expectations..."
                  : "Introduce yourself, your background, DSA preparation level, experience, projects and interview goals..."
              }
              required
              value={formData.projectDescription}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 focus:border-orange-500 rounded-xl p-4 outline-none resize-none transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-70 py-4 rounded-xl font-semibold text-lg transition"
            >
              {loading
                ? "Submitting..."
                : mode === "freelance"
                ? "🚀 Submit Project Request"
                : "🎯 Book Free Mock Interview"}
            </button>

          </form>
        </div>

        {/* Bottom Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2">Quick Response</h3>
            <p className="text-sm text-gray-400">
              Usually within 24 hours.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="font-semibold mb-2">IIT Graduate</h3>
            <p className="text-sm text-gray-400">
              Learn from real interview preparation experience.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-semibold mb-2">Personal Guidance</h3>
            <p className="text-sm text-gray-400">
              Tailored support based on your goals.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}