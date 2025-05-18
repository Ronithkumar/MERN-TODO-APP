import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, updateUser } from "../services/api";
import Navbar from "../components/Layout/Navbar";

function UpdateProfilePage() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile({
          username: data.username || "",
          email: data.email || "",
        });
        setLoading(false);
      } catch (err) {
        setError("Error fetching profile data.");
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await updateUser(profile);
      navigate("/profile");
    } catch (err) {
      setError("Error updating profile.");
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Update Your Profile
        </h1>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={profile.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProfilePage;
