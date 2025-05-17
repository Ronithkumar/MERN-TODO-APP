import { useState } from "react";
import Navbar from "../components/Layout/Navbar";
import Button from "../components/ui/Button";
import { requestPasswordReset } from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await requestPasswordReset(email);
      setMessage(
        "If this email exists in our system, a password reset link has been sent."
      );
    } catch (err) {
      setError(
        err.message || "Failed to send reset link. Please try again later."
      );
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar hideAuthLinks={true} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Forgot Your Password?
          </h2>

          {message && (
            <div className="mb-4 text-green-600 text-center">{message}</div>
          )}
          {error && (
            <div className="mb-4 text-red-600 text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="block text-lg font-medium mb-2" htmlFor="email">
              Enter your email address:
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-4 border border-gray-300 rounded-xl mb-6 text-lg"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="bg-green-600 w-full text-white font-bold py-4 rounded-xl hover:bg-green-700 transition duration-200"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
