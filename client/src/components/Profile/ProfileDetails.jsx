import EditProfileForm from "./EditProfileForm";

function ProfileDetails({
  user,
  isEditing,
  setIsEditing,
  formData,
  handleInputChange,
  handleFormSubmit,
  errors,
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {isEditing ? (
        <EditProfileForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          errors={errors}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <p className="mb-2">
            <strong>Name:</strong> {user.username}
          </p>
          <p className="mb-4">
            <strong>Email:</strong> {user.email}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;
