// ChangePasswordForm.jsx
import React from "react";
import Button from "../ui/Button";

const ChangePasswordForm = ({
  passwordData = {},
  onChange = () => {},
  onSubmit = () => {},
  onCancel = () => {},
  passwordErrors = {},
  passwordSuccess = "",
}) => {
  return (
    <form onSubmit={onSubmit} className="mt-4">
      {passwordErrors?.form && (
        <p className="text-red-500 text-sm mb-2">{passwordErrors.form}</p>
      )}
      {passwordSuccess && (
        <p className="text-green-600 text-sm mb-2">{passwordSuccess}</p>
      )}

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword || ""}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {passwordErrors.currentPassword && (
          <p className="text-red-500 text-sm">
            {passwordErrors.currentPassword}
          </p>
        )}
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          value={passwordData.newPassword || ""}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {passwordErrors.newPassword && (
          <p className="text-red-500 text-sm">{passwordErrors.newPassword}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <input
          type="password"
          name="confirmNewPassword"
          value={passwordData.confirmNewPassword || ""}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {passwordErrors.confirmNewPassword && (
          <p className="text-red-500 text-sm">
            {passwordErrors.confirmNewPassword}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md"
        >
          Update Password
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-600 text-white p-3 rounded-md"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
