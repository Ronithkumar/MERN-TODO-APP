import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: HomeIcon },
  { to: "/tasks", label: "Tasks", icon: ClipboardDocumentListIcon },
  { to: "/profile", label: "Profile", icon: UserCircleIcon },
];

function Sidebar({ isOpen, onClose, onOpen }) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        onClose();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Hamburger Button: show only on small screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-green-700 text-white shadow-md"
        aria-label="Open sidebar"
        onClick={onOpen}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-green-700 text-white w-64 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-600">
          <h1 className="text-xl font-bold whitespace-nowrap">TaskHive</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-green-600 focus:outline-none"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-900 text-white"
                    : "text-green-200 hover:bg-green-600 hover:text-white"
                }`
              }
            >
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-green-600">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 text-red-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Sidebar;
