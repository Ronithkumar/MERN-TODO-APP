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
    setIsLoggedIn(!!token);
  }, []);

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
      const { token } = await loginUser({ email, password });
      localStorage.setItem("authToken", token);
      attachTokenInterceptor();
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
      setMessage("Login successful!");
      setTimeout(() => navigate("/Dashboard"), 1200);
    } catch (err) {
      setIsError(true);
      setMessage("Login failed: Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar hideAuthLinks={true} />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 overflow-hidden">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
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
            <label className="text-xl font-semibold mb-2 block">Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full p-4 mb-1 border border-gray-300 rounded-xl text-lg"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mb-4">{errors.email}</p>
            )}

            <label className="text-xl font-semibold mb-2 block">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full p-4 mb-1 border border-gray-300 rounded-xl text-lg"
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
              <label className="text-lg text-gray-700">Show password</label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-lg w-full hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-md transition duration-200 flex justify-center items-center gap-2"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-lg text-gray-700">
              Forgot your{" "}
              <Link
                to="/forgotpassword"
                className="text-blue-600 hover:underline"
              >
                username or password?
              </Link>
            </p>
            <p className="text-lg text-gray-700">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {isSubmitting && <Loader text="Logging in..." />}
    </>
  );
}

export default Login;
