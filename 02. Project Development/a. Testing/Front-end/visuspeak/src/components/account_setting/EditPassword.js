import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";
import { AuthContext } from "../../context/AuthContext.js";
import { setUserOffline } from "../../utils/UserPresence.js";
import { updatePassword,signOut } from "firebase/auth";
import Alert from '@mui/material/Alert';


const SettingsEditAccountInfo = () => {
  const { currentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
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
    setError(null);
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
    let currentErrors = {};
    let formIsValid = true;

    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      setError("Passwords do not match.");
    }

    if (formData.password == null || formData.confirmPassword == null || formData.password == "" || formData.confirmPassword == "") {
      formIsValid = false;
      setError("Fields cannot be empty.");
    }

    if (formData.password <= 6 || formData.confirmPassword <= 6) {
      formIsValid = false;
      setError("Fields cannot be empty.");
    }

    try {
      // Update Firebase Auth password if provided
      if (formData.password && formIsValid) {
        try {
          await updatePassword(currentUser, formData.password);
          setSuccess("Account information updated successfully.");
          setEditMode(false);
          handleSignOut();
        } catch (error) {
          setError(
            "An error occurred while changing password. Please try again later"
          );
          console.error(error);
        }
      }
     
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
      <div className="row mb-3">
        <div className="col-sm-3">
        <h4>Update Your Password</h4>
        </div>
        <div className="col-sm-3">
        {!editMode && (
          <Link
            type="button"
            className=" hyperlink "
            onClick={handleEdit}
          >
            Edit
          </Link>
        )}
        </div>
        
        
      </div>
      <div className="row ">
        {formField("password", "Password", "password", false, !editMode)}
        {formField(
          "confirmPassword",
          "Confirm Password",
          "password",
          false,
          !editMode
        )}
      </div>
      <div className="d-flex row mt-3" >
        <div className="col-sm-3">
          
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
        <div className="col-sm-9">
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          </div>
      </div>
    </form>
  );
};

export default SettingsEditAccountInfo;
