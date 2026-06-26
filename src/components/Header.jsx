import { Link, NavLink } from "react-router-dom";
import { useState } from "react";


const navLinks = [
  { name: "Home", path: "/" },
  { name: "Free Courses", path: "/courses" },
  { name: "Notes", path: "/notes" },
  { name: "FAANG Questions", path: "/faang-questions" },
  {name: "Blog", path: "/blogs" },
  { name: "Freelance Work", path: "/contact" },
  { name: "Contact", path: "/contacts" },
];


const mobileNavLinks = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Notes", path: "/notes" },
  { name: "FAANG Questions", path: "/faang-questions" },
];


const moreLinks = [
  { name: "Blog", path: "/blogs" },
  { name: "Freelance Work", path: "/contact" },
  { name: "Contact", path: "/contacts" },
  { name: "Login", path: "/login" },
  { name: "Sign Up", path: "/signup" },
];
export default function Header() {
   const [showMore, setShowMore] = useState(false);
 return (
  <>
    {/* Desktop Header */}
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto h-16 px-4 md:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 truncate"
        >
          CodeWithRahulKumawat
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>



    {/* Mobile Bottom Navigation */}
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">

      <div className="grid grid-cols-5 h-16">

        {mobileNavLinks.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center text-xs ${
            isActive ? "text-blue-600" : "text-gray-600"
          }`
        }
      >
        {link.name}
      </NavLink>
    ))}

    <button
      onClick={() => setShowMore(!showMore)}
      className="flex flex-col items-center justify-center text-xs text-gray-600"
    >
      ☰
      <span>More</span>
    </button>
  
  
{showMore && (
  <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white border-t shadow-xl rounded-t-2xl p-4 z-40">

    {moreLinks.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        onClick={() => setShowMore(false)}
        className="block py-3 border-b last:border-b-0"
      >
        {link.name}
      </NavLink>
    ))}

  </div>
)}

      </div>
    </div>
  </>
);
}
