import { useState } from "react";
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

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside
      className={`bg-green-700 text-white h-screen transition-width duration-300 ${
        isOpen ? "w-64" : "w-16"
      } flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-green-600">
        <h1
          className={`text-xl font-bold whitespace-nowrap ${
            isOpen ? "block" : "hidden"
          }`}
        >
          MyApp
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-green-600 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-green-900 text-white"
                  : "text-green-200 hover:bg-green-600 hover:text-white"
              }
            `
            }
          >
            <Icon className="h-6 w-6" />
            {isOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-green-600">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6 text-red-400" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
