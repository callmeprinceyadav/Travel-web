import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi"; // Optional, for menu icons
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    setOrganizer,
    isOrganizerLoggedIn,
    setIsOrganizerLoggedIn,
    isUserLoggedIn,
    setIsUserLoggedIn,
    userName,
    organizerName,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleOrganizerLogin = () => {
    localStorage.setItem("organizer", "true");
    setOrganizer(true);
    navigate("/login");
  };
  const handleOrganizerLogout = async () => {
    try {
      const res = await axios.post(
        "https://travel-web-backend.vercel.app/auth/logout", {},
        { withCredentials: true }
      );
      if (res.data.message === "Logout successful!") {
        setOrganizer(false);
        setIsOrganizerLoggedIn(false);
        localStorage.setItem("organizer", "false");
        localStorage.setItem("isOrganizerLoggedIn", false);
        Cookies.remove("token");
        toast.success("Organizer Logout successful!");
        navigate("/");
      }
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  const handleUserLogin = () => {
    localStorage.setItem("organizer", "false");
    setOrganizer(false);
    navigate("/login");
  };
  const handleUserLogout = async () => {
    try {
      const res = await axios.post(
        "https://travel-web-backend.vercel.app/auth/logout", {},
        { withCredentials: true }
      );
      if (res.data.message === "Logout successful!") {
        localStorage.setItem("isUserLoggedIn", false);
        setIsUserLoggedIn(false);
        Cookies.remove("token");
        toast.success("User Logout successful!");
        navigate("/");
      }
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  // Navbar button set for each role/login state
  const renderActions = (isMobile = false) => {
    const baseStyle = "px-4 py-2 rounded-full transition-all font-semibold shadow";
    const blockStyle = isMobile ? "block w-full my-2" : "";
    if (isOrganizerLoggedIn) {
      return (
        <>
          <button
            onClick={() => navigate("/organizer-dashboard")}
            className={`${baseStyle} ${blockStyle} bg-green-500 hover:bg-green-600 text-white`}
          >
            Dashboard
          </button>
          <button
            onClick={handleOrganizerLogout}
            className={`${baseStyle} ${blockStyle} bg-red-400 hover:bg-yellow-400 hover:text-black text-white`}
          >
            Organizer Logout
          </button>
          <span className="flex items-center gap-2 border-2 border-yellow-400 px-4 py-1 rounded-full bg-white/70 text-yellow-700 font-bold shadow ml-2">
            <FiUser /> {organizerName}
          </span>
        </>
      );
    }
    if (isUserLoggedIn) {
      return (
        <>
          <button
            onClick={() => navigate("/user-dashboard")}
            className={`${baseStyle} ${blockStyle} bg-green-500 hover:bg-green-600 text-white`}
          >
            User Dashboard
          </button>
          <button
            onClick={handleUserLogout}
            className={`${baseStyle} ${blockStyle} bg-red-400 hover:bg-yellow-400 hover:text-black text-white`}
          >
            User Logout
          </button>
          <span className="flex items-center gap-2 border-2 border-yellow-400 px-4 py-1 rounded-full bg-white/70 text-yellow-700 font-bold shadow ml-2">
            <FiUser /> {userName}
          </span>
        </>
      );
    }
    // Not logged
    return (
      <>
        <button
          onClick={handleUserLogin}
          className={`${baseStyle} ${blockStyle} bg-blue-400 hover:bg-yellow-300 hover:text-black text-white`}
        >
          User Login
        </button>
        <button
          onClick={handleOrganizerLogin}
          className={`${baseStyle} ${blockStyle} bg-blue-400 hover:bg-yellow-300 hover:text-black text-white`}
        >
          Organizer Login
        </button>
      </>
    );
  };

  return (
    <nav className="bg-white/80 backdrop-blur px-3 md:px-7 py-2 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://explorertours.al/wp-content/uploads/2016/08/explorerlogo.png"
            alt="Explorer Travel Logo"
            className="w-40 max-w-[13rem] h-auto"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">{renderActions()}</div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-yellow-600 text-3xl focus:outline-none"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            tabIndex={0}
          >
            {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>
      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute left-0 top-full w-full bg-white drop-shadow-lg transition-all duration-300 origin-top
        ${isOpen ? "scale-y-100 opacity-100 pointer-events-auto" : "scale-y-0 opacity-0 pointer-events-none"}
        `}
        style={{ zIndex: 50 }}
      >
        <div className="flex flex-col px-6 pt-3 pb-4">{renderActions(true)}</div>
      </div>
    </nav>
  );
};

export default Navbar;
