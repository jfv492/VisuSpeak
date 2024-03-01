import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, storage, db } from "../../firebase.js";
import { createUserWithEmailAndPassword, updateProfile, signInAnonymously } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { initializeUserPresence } from "../../utils/UserPresence.js"
import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg"

const CustomerSignin = (props) => {
    let navigate = useNavigate();
    // Add these states in your SignUp component
const [anonymousFirstName, setAnonymousFirstName] = useState('');
const [anonymousLastName, setAnonymousLastName] = useState('');

const handleAnonymousSignIn = async () => {
    try {
      const { user } = await signInAnonymously(auth);
      console.log("Anonymous user signed in:", user.uid);
  
      // Combine first and last name for display name
      const displayName = `${anonymousFirstName} ${anonymousLastName}`.trim() || "Guest";
  
      // Set user info including the display name
      const userInfo = {
        uid: user.uid,
        displayName: displayName,
        photoURL: defaultProfilePicture // You can use the default profile picture or set a specific one for guests
      };
  
      // Create a new user document for the anonymous user
      await setDoc(doc(db, "users", user.uid), {
        ...userInfo,
        email: "",
        organizationName: "",
      });
  
      // Create a new chat document for the anonymous user
      await setDoc(doc(db, "userChats", user.uid), {
        userInfo,
        // Initialize other fields as needed, similar to how you handle registered users
      });
      localStorage.setItem("username", displayName);
      // Initialize user presence or perform other actions as needed
      initializeUserPresence(user.uid);
  
      // Redirect to chat or perform other actions as needed
      navigate("/aslchat"); // Make sure you have a route set up to handle this path
    } catch (error) {
      console.error("Error signing in anonymously:", error);
      props.showAlert("Anonymous sign-in failed. Please try again", "danger");
    }
  };
  

  return (
    <div className="background-container">
    
    <input
      type="text"
      placeholder="First Name"
      value={anonymousFirstName}
      onChange={(e) => setAnonymousFirstName(e.target.value)}
    />
    <input
      type="text"
      placeholder="Last Name"
      value={anonymousLastName}
      onChange={(e) => setAnonymousLastName(e.target.value)}
    />
    <button type="button" className="btn button-style" onClick={handleAnonymousSignIn}>
      Start Chat as Guest
    </button>
    
  </div>
  )
}

export default CustomerSignin
