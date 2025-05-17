import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuthToken from "../../hooks/useAuthToken";

function Navbar({ hideAuthLinks }) {
  const token = useAuthToken();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Helper to check if token is expired
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
    <nav className="bg-green-600 shadow-md w-full h-16">
      <div className="max-w-screen-xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to={isLoggedIn ? "/dashboard" : "/login"}>MyApp</Link>
        </div>

        <div className="flex items-center space-x-6">
          {!hideAuthLinks && isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-gray-400">
                Dashboard
              </Link>
              <Link to="/tasks" className="text-white hover:text-gray-400">
                Tasks
              </Link>
              <Link to="/profile" className="text-white hover:text-gray-400">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-400">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-gray-400">
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
