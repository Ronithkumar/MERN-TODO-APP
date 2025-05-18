import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUserProfile,
  updateUser,
  changePassword,
} from "../../services/api";
import DashboardLayout from "../Layout/DashboardLayout";
import ProfileDetails from "./ProfileDetails";
import ChangePasswordForm from "./ChangePasswordForm";
import Loader from "../ui/Loader";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  // Password change related states
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await fetchUserProfile(token);
        setTimeout(() => {
          setUser(userData);
          setFormData({ name: userData.username, email: userData.email });
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching data:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // Profile form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await updateUser({ username: formData.name, email: formData.email });
      setUser({ ...user, username: formData.name, email: formData.email });
      setIsEditing(false);
      setErrors({});
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  // Password change handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validatePasswordForm(passwordData);
    if (Object.keys(validationErrors).length > 0) {
      setPasswordErrors(validationErrors);
      setPasswordSuccess("");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordSuccess("Password changed successfully.");
      setPasswordErrors({});
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setIsChangingPassword(false);
    } catch (error) {
      setPasswordErrors({
        form: error.message || "Failed to change password.",
      });
      setPasswordSuccess("");
    }
  };

  // Validation helpers
  const validateForm = (data) => {
    const errors = {};
    if (!data.name) errors.name = "Name is required.";
    if (!data.email) errors.email = "Email is required.";
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is not valid.";
    }
    return errors;
  };

  const validatePasswordForm = (data) => {
    const errors = {};
    if (!data.currentPassword)
      errors.currentPassword = "Current password is required.";
    if (!data.newPassword) errors.newPassword = "New password is required.";
    if (data.newPassword && data.newPassword.length < 6)
      errors.newPassword = "New password must be at least 6 characters.";
    if (data.newPassword !== data.confirmNewPassword)
      errors.confirmNewPassword = "Passwords do not match.";
    return errors;
  };

  if (loading) return <Loader text="Loading your profile..." />;

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl flex flex-col gap-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>

        <ProfileDetails
          user={user}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          errors={errors}
        />

        {isChangingPassword && (
          <ChangePasswordForm
            passwordData={passwordData}
            passwordErrors={passwordErrors}
            passwordSuccess={passwordSuccess}
            onChange={handlePasswordChange}
            onSubmit={handlePasswordSubmit}
            onCancel={() => {
              setIsChangingPassword(false);
              setPasswordErrors({});
              setPasswordSuccess("");
              setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
              });
            }}
          />
        )}

        {!isChangingPassword && (
          <div className="text-center">
            <button
              onClick={() => setIsChangingPassword(true)}
              className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded-md"
            >
              Change Password
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ProfilePage;
