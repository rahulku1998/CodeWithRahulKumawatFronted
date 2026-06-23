import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-blue-500">
              CodeWithRahulKumawat
            </h2>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Learn DSA, Web Development MERN Stack, AI Engineering,System Design,
              Spring Boot and crack top product company
              interviews with structured content and notes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link to="/">Home</Link>
              <Link to="/courses">Free Courses</Link>
              
              <Link to="/blogs">Blog</Link>
              <Link to="/notes">Notes</Link>
              <Link to="/faang-questions">
                FAANG Questions
              </Link>
              <Link to="/contact">Freelance Work</Link>
              <Link to="/contacts">Contact</Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Connect With Me
            </h3>

            <div className="flex gap-5 text-3xl">
              <a
                href="https://www.youtube.com/@rahulkumawat15"
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-500 transition"
              >
                <FaYoutube />
              </a>

              <a
                href="https://www.linkedin.com/in/rahul-kumawat98/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://github.com/rahulku1998"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-300 transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://leetcode.com/u/rahu1998/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-yellow-500 transition"
              >
                <SiLeetcode />
              </a>

              <a
                href="https://wa.me/8387006686"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-500 transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} CodeWithRahul. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}