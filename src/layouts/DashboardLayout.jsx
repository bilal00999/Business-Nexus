import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useDarkMode } from "../context/useDarkMode";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { dark, toggleDark } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    // Optionally redirect to login if not authenticated
    navigate("/login");
    return null;
  }

  // Sidebar links based on user role
  const dashboardRoute =
    user.role === "investor"
      ? `/dashboard/investor`
      : `/dashboard/entrepreneur`;
  const profileRoute =
    user.role === "investor"
      ? `/profile/investor/${user.id}`
      : `/profile/entrepreneur/${user.id}`;
  const chatRoute = `/chat/${user.id}`;

  const links = [
    { name: "Dashboard", to: dashboardRoute },
    { name: "Profile", to: profileRoute },
    { name: "Chat", to: chatRoute },
  ];

  const isActive = (to) =>
    location.pathname === to ||
    (to.includes(":") && location.pathname.startsWith(to.split(":")[0]));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
          {/* Sidebar toggle for all screen sizes */}
          <button
            className="text-2xl text-pink-600 focus:outline-none"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <span className="text-2xl font-bold text-pink-600 tracking-tight">
            Business Nexus
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <FiSun className="w-5 h-5" />
            ) : (
              <FiMoon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={logout}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-medium transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 shadow-lg z-10 transform transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="flex flex-col gap-2 p-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition
                ${
                  isActive(link.to)
                    ? "bg-pink-100 text-pink-700 dark:bg-pink-700 dark:text-white"
                    : "text-gray-700 hover:bg-pink-50 dark:text-gray-200 dark:hover:bg-gray-700"
                }
              `}
              onClick={() => setSidebarOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex pt-16">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
