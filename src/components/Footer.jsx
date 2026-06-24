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
  <footer className="bg-gray-900 text-white mt-12 md:mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">

      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">

        {/* Brand */}
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-500 break-words">
            CodeWithRahulKumawat
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed">
            Learn DSA, Web Development, MERN Stack,
            AI Engineering, System Design, Spring Boot
            and crack top product company interviews
            with structured content and notes.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-400 text-sm sm:text-base">
            <Link
              to="/"
              className="hover:text-white transition"
            >
              Home
            </Link>

            <Link
              to="/courses"
              className="hover:text-white transition"
            >
              Free Courses
            </Link>

            <Link
              to="/blogs"
              className="hover:text-white transition"
            >
              Blog
            </Link>

            <Link
              to="/notes"
              className="hover:text-white transition"
            >
              Notes
            </Link>

            <Link
              to="/faang-questions"
              className="hover:text-white transition"
            >
              FAANG Questions
            </Link>

            <Link
              to="/contact"
              className="hover:text-white transition"
            >
              Freelance Work
            </Link>

            <Link
              to="/contacts"
              className="hover:text-white transition"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-4">
            Connect With Me
          </h3>

          <div className="flex justify-center sm:justify-start flex-wrap gap-4 text-2xl sm:text-3xl">

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
      <div className="border-t border-gray-700 mt-8 md:mt-10 pt-5 md:pt-6 text-center text-gray-400 text-xs sm:text-sm md:text-base">
        <p>
          © {new Date().getFullYear()} CodeWithRahulKumawat.
          All Rights Reserved.
        </p>
      </div>

    </div>
  </footer>
);
}