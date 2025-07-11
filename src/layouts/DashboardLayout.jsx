import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children, sidebarLinks }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex flex-1">
      <Sidebar links={sidebarLinks} />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  </div>
);

export default DashboardLayout;
