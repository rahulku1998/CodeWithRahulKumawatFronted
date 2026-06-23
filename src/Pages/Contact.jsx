import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
const API_URL = import.meta.env.VITE_API_URL;
export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors,setErrors]=useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const validate = () => {
  const newError = {};
  if (!formData.name.trim()) {
    newError.name = "Please Write Your  Name ";
  }
  if (!formData.email.trim()) {
    newError.email = "Email is required ";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    newError.email = "Email is invalid ";
  }
  if (!formData.message.trim()) {
    newError.message = "Please Write Message ";
  }
  if(!formData.subject.trim()){
    newError.subject="Please Write Subject "
  }

  setErrors(newError);

  return Object.keys(newError).length === 0;
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({...errors,[e.target.name]:""});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validate()){
      return ;
    }
    try {
      setLoading(true);
      await axios.post(
        `${API_URL}/contact`,
        formData
      );
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400">
            Contact Me
          </span>
          <h1 className="text-5xl font-bold mt-6">
  Get In Touch 👋
</h1>
<Helmet>
  <title>Contact | CodeWithRahulKumawat</title>
</Helmet>
<p className="text-slate-400 mt-4 text-lg max-w-3xl mx-auto">
  Have a question, need guidance, facing a course-related issue, or interested
  in working together? I'd love to hear from you.
</p>

<p className="text-slate-400 mt-3 max-w-3xl mx-auto">
  Reach me directly at{" "}
  <span className="text-blue-400 font-medium">
    rahul.kumawat.che15@itbhu.ac.in
  </span>{" "}
  or simply fill out the form below. I usually respond within 24 hours.
</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🎉</div>

              <h2 className="text-3xl font-bold">
                Message Sent!
              </h2>

              <p className="text-slate-400 mt-3">
                Thanks for reaching out.I'll get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div style={{ marginBottom: "15px" }}>
             <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
              />
              {errors.name && (
  <small style={{ color: "red" }}>
    {errors.name}
  </small>
)}
              </div>
              
 <div style={{ marginBottom: "15px" }}>
<input
  type="text"
  name="email"
  placeholder="Your Email"
  value={formData.email}
  onChange={handleChange}
  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
/>

{errors.email && (
  <small style={{ color: "red" }}>
    {errors.email}
  </small>
)}
 </div>    
   <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="subject"
                placeholder="Subject ..."
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
              />
              {errors.subject && (
  <small style={{ color: "red" }}>
    {errors.subject}
  </small>
)}
              </div>

              <div style={{ marginBottom: "15px" }}>
              <textarea
                rows="6"
                name="message"
                placeholder="Your Message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
              />
              {errors.message && (
  <small style={{ color: "red" }}>
    {errors.message}
  </small>
)}
              </div>
              

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}