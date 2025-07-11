import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "../context/useDarkMode";

const Navbar = () => {
  const { dark, toggleDark } = useDarkMode();
  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-6 py-3 flex items-center justify-between sticky top-0 z-20 w-full transition-colors duration-200">
      <div className="font-bold text-xl text-blue-700 dark:text-blue-300">
        <Link to="/">Business Nexus</Link>
      </div>
      <div className="space-x-4 flex items-center">
        <button
          onClick={toggleDark}
          className="px-2 py-1 rounded text-sm font-medium bg-gray-200 dark:bg-gray-700 dark:text-gray-100 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
        <Link
          to="/login"
          className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-white transition-colors duration-200 font-medium"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-white transition-colors duration-200 font-medium"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
