import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-6 py-3 flex items-center justify-between sticky top-0 z-20 w-full transition-colors duration-200">
      <div className="font-bold text-xl text-blue-700 dark:text-blue-300">
        <Link to="/">Business Nexus</Link>
      </div>
      <div className="space-x-4 flex items-center">
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
