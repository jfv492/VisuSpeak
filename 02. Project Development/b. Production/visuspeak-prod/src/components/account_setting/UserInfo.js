import React, { useContext, useState } from "react";
import Headshot from "../../assets/images/AccountSettingsHeadshot.jpg";
import { AuthContext } from "../../context/AuthContext.js";
import Typography from "@mui/material/Typography";
// Import necessary Firebase utilities
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth, db } from "../../firebase.js";
import { doc, updateDoc } from "firebase/firestore";

const SettingsUserInfo = (props) => {
  const { currentUser } = useContext(AuthContext);
  const email = currentUser?.email;
  const organizationName = localStorage.getItem("organizationName");
  
  // State for handling file selection
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file input change
  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      uploadProfilePicture(event.target.files[0]);
    }
  };

  // Upload profile picture
  const uploadProfilePicture = async (file) => {
    const fileRef = ref(storage, `profilePictures/${currentUser.uid}`);
    try {
      // Upload file to Firebase Storage
      await uploadBytes(fileRef, file);
      // Get file URL
      const photoURL = await getDownloadURL(fileRef);
      // Update profile in Firebase Authentication
      await updateProfile(currentUser, { photoURL });
      // Update photoURL in Firestore (adjust path as necessary)
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, { photoURL });
      // Optional: Update context or local state as needed to reflect changes in the UI
      alert("Profile picture updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile picture: ", error);
      alert("Error updating profile picture.");
    }
  };

  return (
    <div>
      <div className="row account-settings-user-info align-items-center rounded-3">
        <div className="col-sm-3">
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={currentUser?.photoURL || Headshot} // Display user's photoURL or default
              className="user-profile-picture rounded-circle img-thumbnail"
              alt="..."
              style={{ justifyContent: "end" }}
            />
            <label htmlFor="file-upload" className="fa-solid fa-camera change-user-profile-icon rounded-circle shadow border" style={{
                position: "absolute",
                bottom: "0vw",
                right: "0vw",
                cursor: "pointer", // Change cursor to indicate clickable
              }}>
              <input id="file-upload" type="file" style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
            </label>
          </div>
        </div>
        <div className="col-sm-9">
          <h3 className="user-name-text border-bottom pb-2">
            {localStorage.getItem("username")}
          </h3>
          <div className="row">
            <div className="col-sm-6 text-secondary">
              <Typography variant="caption" display="block" gutterBottom style={{ fontSize: '17px' }}>
                <i className="fa-solid fa-envelope me-2" style={{color: "#006262"}}></i>{email}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom style={{ fontSize: '17px' }}>
                <i className="fa-solid fa-briefcase me-2" style={{color: "#006262"}}></i>{organizationName}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default SettingsUserInfo;
