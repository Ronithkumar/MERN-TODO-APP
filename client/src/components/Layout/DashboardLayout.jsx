import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar: visible on md and above */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Sidebar: visible on mobile only */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
      />

      {/* Mobile Navbar (with hamburger for sidebar toggle) */}
      <div className="md:hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 pt-16 p-4 bg-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
