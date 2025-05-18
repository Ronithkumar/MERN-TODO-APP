import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/api";
import Button from "../components/ui/Button";
import Navbar from "../components/Layout/Navbar";

function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.userName.trim()) newErrors.userName = "Username is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  };

  const handleSignUp = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await createUser({
        username: form.userName,
        email: form.email,
        password: form.password,
      });

      setForm({ email: "", password: "", userName: "" });
      setShowPassword(false);
      setSuccessMessage("User created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (label, name, type = "text", placeholder) => (
    <>
      <label className="text-lg font-semibold block mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-3 mb-1 border border-gray-300 rounded-lg text-base"
      />
      {errors[name] && (
        <p className="text-sm text-red-600 mb-2">{errors[name]}</p>
      )}
    </>
  );

  return (
    <>
      <Navbar hideAuthLinks={true} />
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh)] bg-gray-100 pt-32 px-4 sm:px-6 md:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
            Sign Up
          </h2>

          {successMessage && (
            <div className="mb-4 text-green-600 font-medium">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 text-red-600 font-medium">{errorMessage}</div>
          )}

          {renderInput("Username", "userName", "text", "Enter username")}
          {renderInput("Email", "email", "email", "Enter email")}
          {renderInput(
            "Password",
            "password",
            showPassword ? "text" : "password",
            "Enter password"
          )}
          <div className="mt-4 mb-4 flex items-center">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
              className="mr-2 scale-125"
            />
            <label className="text-base text-gray-700">Show password</label>
          </div>
          <Button
            onClick={handleSignUp}
            className="bg-green-600 w-full hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg shadow transition duration-200 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
