import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, storage, db } from "../../firebase.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInAnonymously,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { initializeUserPresence } from "../../utils/UserPresence.js";
import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";

const CustomerSignin = (props) => {
  let navigate = useNavigate();
  // Add these states in your SignUp component
  const [anonymousFirstName, setAnonymousFirstName] = useState("");
  const [anonymousLastName, setAnonymousLastName] = useState("");

  const handleAnonymousSignIn = async () => {
    try {
      const { user } = await signInAnonymously(auth);
      console.log("Anonymous user signed in:", user.uid);

      // Combine first and last name for display name
      const displayName =
        `${anonymousFirstName} ${anonymousLastName}`.trim() || "Guest";

      // Set user info including the display name
      const userInfo = {
        uid: user.uid,
        displayName: displayName,
        photoURL: defaultProfilePicture, // You can use the default profile picture or set a specific one for guests
      };

      // Create a new user document for the anonymous user
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName,
        photoURL: "",
        firstName: anonymousFirstName,
        lastname: anonymousLastName,
        type: "guest",
        email: "",
        organizationName: "",
      });

      // Create a new chat document for the anonymous user
      await setDoc(doc(db, "userChats", user.uid), {});
      localStorage.setItem("username", displayName);
      localStorage.setItem("accountType", "guest");
      // Initialize user presence or perform other actions as needed
      initializeUserPresence(user.uid);

      // Redirect to chat or perform other actions as needed
      navigate("/chat"); // Make sure you have a route set up to handle this path
    } catch (error) {
      console.error("Error signing in anonymously:", error);
      alert("Anonymous sign-in failed. Please try again", "danger");
    }
  };

  return (
    <div>
      <button
        className="btn landing-button-style btn-raised rounded-pill"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#startConversationModal"
      >
        Start Conversation
      </button>
      <div
        className="modal"
        id="startConversationModal"
        tabindex="-1"
        aria-labelledby="startConversationModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row my-3">
                <h1 className="fs-5">Enter your first and last name</h1>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    aria-label="First name"
                    value={anonymousFirstName}
                    onChange={(e) => setAnonymousFirstName(e.target.value)}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    aria-label="Last name"
                    value={anonymousLastName}
                    onChange={(e) => setAnonymousLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-raised rounded-pill fw-bold"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn modal-button-style btn-raised rounded-pill"
                onClick={handleAnonymousSignIn}
              >
                Start Chat as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignin;
