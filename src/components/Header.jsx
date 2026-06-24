import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Free Courses", path: "/courses" },
  { name: "Notes", path: "/notes" },
  { name: "FAANG Questions", path: "/faang-questions" },
  {name: "Blog", path: "/blogs" },
  { name: "Freelance Work", path: "/contact" },
  { name: "Contact", path: "/contacts" },
];

export default function Header() {
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

        {navLinks.slice(0, 5).map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center text-xs ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-600"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}

      </div>
    </div>
  </>
);
}
