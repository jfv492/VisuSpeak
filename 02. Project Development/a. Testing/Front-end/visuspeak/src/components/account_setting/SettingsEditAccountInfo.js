import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js"; // Adjust path as necessary
import { auth, db } from "../../firebase.js"; // Adjust path as necessary
import { updatePassword, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const SettingsEditAccountInfo = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    organizationName: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    // Update Firestore user details
    const userDoc = doc(db, "users", currentUser.uid);
    try {
      await updateDoc(userDoc, {
        displayName: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        organizationName: formData.organizationName,
      });

      // Update Firebase Auth displayName
      if (formData.firstName || formData.lastName) {
        await updateProfile(currentUser, {
          displayName: `${formData.firstName} ${formData.lastName}`,
        });
      }

      // Update Firebase Auth password
      if (formData.password) {
        await updatePassword(currentUser, formData.password);
      }

      setSuccess("Account information updated successfully.");
    } catch (error) {
      setError("An error occurred while updating account information.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row settings-form">
            <div className="col-sm-6">
                <label 
                    for="firstName" 
                    className="form-label mt-1">
                    First Name
                </label>

                <input 
                    type="text" 
                    className="form-control" 
                    id="firstName" 
                    placeholder="JohnD1993@gmail.com"
                    value={formData.firstName}
                    onChange={handleChange}/>
            </div>

            <div className="col-sm-6">
                <label 
                    for="lastName" 
                    className="form-label mt-1">
                    Last Name
                </label>

                <input 
                    type="text" 
                    className="form-control" 
                    id="lastName" 
                    placeholder="JohnD1993@gmail.com"
                    value={formData.lastName}
                    onChange={handleChange}/>
            </div>

            <div className="col-sm-6 gy-3">
                <label 
                    for="password" 
                    className="form-label mt-1">
                    Password
                </label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}/>
            </div>

            <div className="col-sm-6 gy-3">
                <label 
                    for="organizationName" 
                    className="form-label mt-1">
                    Organization Name
                </label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="organizationName" 
                    placeholder="Company XYZ Inc."
                    value={formData.organizationName}
                    onChange={handleChange}/>
            </div>

            <div className="col-sm-12 gy-4">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <button 
            type="submit" 
            className="btn settings-submit-button"> 
            Save Changes 
          </button>
        </div>
      </div>
    </form>
  );
};

export default SettingsEditAccountInfo;
