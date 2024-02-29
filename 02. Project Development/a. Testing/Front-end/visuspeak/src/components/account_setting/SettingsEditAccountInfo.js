import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext.js";
import { setUserOffline } from "../../utils/UserPresence.js";
import { updatePassword,signOut } from "firebase/auth";


const SettingsEditAccountInfo = () => {
  const { currentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
  });
  const [initialFormData, setInitialFormData] = useState({ ...formData });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setEditMode(false);
  };

  const handleSignOut = async () => {
    // Set user status to offline
    if (currentUser && currentUser.uid) {
      await setUserOffline(currentUser.uid);
    }
    // Clear local storage and sign out
    localStorage.clear();
    await signOut(auth);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      // Update Firebase Auth password if provided
      if (formData.password) {
        try {
          await updatePassword(currentUser, formData.password);
          setSuccess("Account information updated successfully.");
          handleSignOut();
        } catch (error) {
          setError(
            "An error occurred while changing password. Please try again later"
          );
          console.error(error);
        }
      }
      setEditMode(false);
    } catch (error) {
      setError("An error occurred while updating account information.");
      console.error(error);
    }
  };

  const formField = (
    name,
    label,
    type = "text",
    isCheckbox = false,
    disabled = true
  ) => (
    <div className="col-sm-12 mb-2">
      <label
        htmlFor={name}
        className={`form-label${isCheckbox ? " form-check-label" : ""}`}
      >
        {label}:
      </label>
      <input
        type={type}
        className={`form-control${isCheckbox ? " form-check-input" : ""}`}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <div className="lead mb-3">
        Update Your Profile{" "}
        {!editMode && (
          <button
            type="button"
            className="btn settings-edit-button"
            onClick={handleEdit}
          >
            <i class="fa-solid fa-user-pen fa-xl"></i>
          </button>
        )}
      </div>
      <div className="row ">
        {formField("password", "Password", "password", false, !editMode)}
        {formField(
          "cpassword",
          "Confirm Password",
          "password",
          false,
          !editMode
        )}
      </div>
      <div className="row profile-action" style={{ minHeight: "65px" }}>
        <div className="col-sm-12 gy-4">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          {editMode && (
            <>
              <button type="submit" className="btn settings-submit-button">
                Save Changes
              </button>
              <button
                type="button"
                className="btn settings-cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default SettingsEditAccountInfo;
