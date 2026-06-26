import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineDocumentText,
  HiOutlineBriefcase,
  HiOutlinePhone,
  HiOutlinePencilSquare,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserPlus,
} from "react-icons/hi2";





const moreLinks = [
  {
    name: "Blog",
    path: "/blogs",
    icon: <HiOutlinePencilSquare className="text-xl" />,
  },
  {
    name: "Freelance Work",
    path: "/contact",
    icon: <HiOutlineBriefcase className="text-xl" />,
  },
  {
    name: "Contact",
    path: "/contacts",
    icon: <HiOutlinePhone className="text-xl" />,
  },
  {
    name: "Login",
    path: "/login",
    icon: <HiOutlineArrowRightOnRectangle className="text-xl" />,
  },
  {
    name: "Sign Up",
    path: "/signup",
    icon: <HiOutlineUserPlus className="text-xl" />,
  },
];


const mobileNavLinks = [
  {
    name: "Home",
    path: "/",
    icon: <HiOutlineHome className="text-xl" />,
  },
  {
    name: "Courses",
    path: "/courses",
    icon: <HiOutlineBookOpen className="text-xl" />,
  },
  {
    name: "Notes",
    path: "/notes",
    icon: <HiOutlineDocumentText className="text-xl" />,
  },
  {
    name: "FAANG",
    path: "/faang-questions",
    icon: <HiOutlineBriefcase className="text-xl" />,
  },
];
const navLinks = [
  {
    name: "Home",
    path: "/",
    icon: <HiOutlineHome />,
  },
  {
    name: "Free Courses",
    path: "/courses",
    icon: <HiOutlineBookOpen />,
  },
  {
    name: "Notes",
    path: "/notes",
    icon: <HiOutlineDocumentText />,
  },
  {
    name: "FAANG Questions",
    path: "/faang-questions",
    icon: <HiOutlineBriefcase />,
  },
  {
    name: "Blog",
    path: "/blogs",
    icon: <HiOutlinePencilSquare />,
  },
  {
    name: "Freelance Work",
    path: "/contact",
    icon: <HiOutlineBriefcase />,
  },
  {
    name: "Contact",
    path: "/contacts",
    icon: <HiOutlinePhone />,
  },
];

export default function Header() {
   const [showTabletMenu, setShowTabletMenu] = useState(false);
const [showMobileMenu, setShowMobileMenu] = useState(false);
 return (
  <>
    {/* Desktop Header */}
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto h-16 px-4 md:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
  to="/"
  className="flex items-center gap-2 sm:gap-3"
>
   <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 whitespace-nowrap">
    CodeWithRahulKumawat
  </span>
  <img
    src={logo}
    alt="Code With Rahul Kumawat"
    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
  />

  
</Link>


   <div className="hidden md:flex lg:hidden">
  <button
   onClick={() => setShowTabletMenu(!showTabletMenu)}
    className="text-3xl text-gray-700"
  >
     {showTabletMenu ? <HiOutlineXMark /> : <HiOutlineBars3 />}
  </button>
</div>
      
  

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
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
        <div className="hidden lg:flex items-center gap-3">
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

   {/* Tablet Dropdown */}

{showTabletMenu && (
<div className="hidden md:block lg:hidden fixed top-20 right-4 w-72 bg-white rounded-xl shadow-xl border z-50">

    { navLinks.map((link)=>(

        <NavLink
        key={link.path}
        to={link.path}
        onClick={() => setShowTabletMenu(false)}
        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 border-b"
        >
            <span className="text-lg">{link.icon}</span>

  <span>{link.name}</span>
        </NavLink>

    ))}

    <div className="flex gap-3 p-4">

        <Link
        to="/login"
        onClick={() => setShowTabletMenu(false)}
        className="flex items-center justify-center gap-2 flex-1 border border-blue-600 text-blue-600 rounded-lg py-2"
        >
          <HiOutlineArrowRightOnRectangle />
            Login

        </Link>

        <Link
        to="/signup"
        onClick={() => setShowTabletMenu(false)}
        className="flex items-center justify-center gap-2 flex-1 bg-blue-600 text-white rounded-lg py-2"
        >
          <HiOutlineUserPlus />
            Sign Up
        </Link>

    </div>

</div>
)}


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
        {link.icon}
<span>{link.name}</span>
      </NavLink>
    ))}

    <button
      onClick={() => setShowMobileMenu(!showMobileMenu)}
      className="flex flex-col items-center justify-center text-xs text-gray-600"
    >
      {showMobileMenu ? (
    <HiOutlineXMark className="text-xl" />
  ) : (
    <HiOutlineBars3 className="text-xl" />
  )}
      <span>More</span>
    </button>
  
  
{showMobileMenu && (
  <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white border-t shadow-xl rounded-t-2xl p-4 z-40">

    {moreLinks.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        onClick={() => setShowMobileMenu(false)}
        className="flex items-center gap-3 py-3 border-b last:border-b-0"
      >
        {link.icon}

    <span>{link.name}</span>
      </NavLink>
    ))}

  </div>
)}

      </div>
    </div>
  </>
);
}
