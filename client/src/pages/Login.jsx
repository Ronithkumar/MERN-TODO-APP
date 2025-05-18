import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, attachTokenInterceptor } from "../services/api";
import Button from "../components/ui/Button";
import Navbar from "../components/Layout/Navbar";
import Loader from "../components/ui/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token from localStorage:", token);
    if (token) {
      setIsLoggedIn(true);
      // Optional: uncomment next line if you want to auto-redirect logged-in users
      // navigate("/Dashboard");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const handleLogin = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await loginUser({ email, password });
      console.log("Login response:", response);
      const { token } = response;
      if (!token) throw new Error("No token returned from login.");

      localStorage.setItem("authToken", token);
      attachTokenInterceptor();
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
      setMessage("Login successful!");
      setErrors({});

      setTimeout(() => navigate("/Dashboard"), 1200);
    } catch (err) {
      console.error("Login error:", err);
      setIsError(true);
      setMessage("Login failed: Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar hideAuthLinks={true} />

      <div className="flex flex-col items-center justify-center bg-gray-100 px-4 py-12 min-h-[calc(100vh)] pt-20 sm:pt-24">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {isLoggedIn ? "Welcome Back!" : "Login"}
          </h2>

          {message && (
            <div
              className={`mb-6 text-center text-lg font-medium ${
                isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <label className="text-lg font-semibold mb-2 block">Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full p-4 mb-1 border border-gray-300 rounded-xl text-base"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mb-4">{errors.email}</p>
            )}

            <label className="text-lg font-semibold mb-2 block">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full p-4 mb-1 border border-gray-300 rounded-xl text-base"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mb-4">{errors.password}</p>
            )}

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-3 scale-125"
              />
              <label className="text-base text-gray-700">Show password</label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 w-full text-white font-bold py-4 px-6 rounded-xl shadow-md transition duration-200 flex justify-center items-center gap-2 text-lg hover:bg-green-700"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-base text-gray-700">
              Forgot your{" "}
              <Link
                to="/forgotpassword"
                className="text-blue-600 hover:underline"
              >
                username or password?
              </Link>
            </p>
            <p className="text-base text-gray-700">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <Loader text="Logging in..." />
        </div>
      )}
    </>
  );
}

export default Login;
