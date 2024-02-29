import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { auth, db } from "../../firebase.js";
import { updatePassword, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const SettingsEditAccountInfo = () => {
  const { currentUser, updateCurrentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    organizationName: "",
  });
  const [initialFormData, setInitialFormData] = useState({ ...formData });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser && currentUser.uid) {
        const userDocRef = doc(db, "users", currentUser.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFormData({
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              password: "", // Password should not be fetched
              organizationName: userData.organizationName || "",
            });
            setInitialFormData({
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              password: "",
              organizationName: userData.organizationName || "",
            });
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data.");
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      // Update Firestore user details
      let newDisplayName = `${formData.firstName} ${formData.lastName}`;
      const userDoc = doc(db, "users", currentUser.uid);
      await updateDoc(userDoc, {
        displayName: newDisplayName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        organizationName: formData.organizationName,
      });

      // Update Firebase Auth displayName

      await updateProfile(currentUser, {
        displayName: newDisplayName,
      });

      // Update Firebase Auth password if provided
      if (formData.password) {
        try {
          await updatePassword(currentUser, formData.password);
        } catch (error) {
          setError(
            "An error occurred while changing password. Please try again later"
          );
        }
      }

      // Update the current user in AuthContext
      updateCurrentUser({ ...currentUser, displayName: newDisplayName });
      localStorage.setItem("username", newDisplayName);
      setInitialFormData({ ...formData });
      setEditMode(false);
      setSuccess("Account information updated successfully.");
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
    <div className="col-sm-6">
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
      {/* ... */}
    </div>
  );

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
        <div className="row justify-content-end">
            <div className="col">
            {!editMode && (
            <button
              type="button"
              className="btn settings-edit-button"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
            </div>
            </div>
      <div className="row ">
        {formField("firstName", "First Name", "text", false, !editMode)}
        {formField("lastName", "Last Name", "text", false, !editMode)}
        {formField("password", "Password", "password", false, !editMode)}
        {formField(
          "organizationName",
          "Organization Name",
          "text",
          false,
          !editMode
        )}

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
