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
        const data = await fetchUserProfile(); // GET /Users/profile
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

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Update Your Profile</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="username"
              >
                Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={profile.username}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              disabled={updating}
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
