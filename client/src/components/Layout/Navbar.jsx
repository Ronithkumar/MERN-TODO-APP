import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuthToken from "../../hooks/useAuthToken";

function Navbar({ hideAuthLinks, onMenuClick }) {
  const token = useAuthToken();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.clear();
      setIsLoggedIn(false);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 shadow-md w-full h-16 fixed top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Hamburger menu - visible only on mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 mr-3 rounded-md hover:bg-green-700 focus:outline-none text-white"
          aria-label="Open sidebar menu"
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="text-white text-2xl font-bold ml-0 md:ml-0">
          <Link to={isLoggedIn ? "/dashboard" : "/login"}>TaskHive</Link>
        </div>

        {/* Nav links - visible only on tablet and larger */}
        <div className="hidden md:flex items-center space-x-6 text-white">
          {!hideAuthLinks && isLoggedIn ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/tasks" className="hover:text-gray-300">
                Tasks
              </Link>
              <Link to="/profile" className="hover:text-gray-300">
                Profile
              </Link>
              <button onClick={handleLogout} className="hover:text-gray-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
