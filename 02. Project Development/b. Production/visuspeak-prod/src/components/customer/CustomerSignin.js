import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase.js";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { initializeUserPresence, setUserOnline } from "../../utils/UserPresence.js";
import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";
import { AuthContext } from "../../context/AuthContext.js"
import { ChatContext } from "../../context/ChatContext.js";
import '../../App.css';
import { useTranslation } from "react-i18next";

const CustomerSignin = (props) => {
  const { t } = useTranslation();
  const { updateAccountType, updateOrganizationName } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  let navigate = useNavigate();
  const [anonymousFirstName, setAnonymousFirstName] = useState("");
  const [anonymousLastName, setAnonymousLastName] = useState("");
  const [anonymousOrganizationName, setAnonymousOrganizationName] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [organizationNames, setOrganizationNames] = useState([]);
  const mobileView = windowWidth < 600;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchOrganizationNames = async () => {
      const q = query(collection(db, "users"), where("type", "==", "admin"));
      const querySnapshot = await getDocs(q);
      const names = new Set();
      querySnapshot.forEach((doc) => {
        names.add(doc.data().organizationName);
      });
      setOrganizationNames([...names]);
    };

    fetchOrganizationNames();
  }, []);

  const handleAnonymousSignIn = async () => {
    try {
      const { user } = await signInAnonymously(auth);
      console.log("Anonymous user signed in:", user.uid);

      const displayName =
        `${anonymousFirstName} ${anonymousLastName}`.trim() || "Guest";

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName,
        photoURL: defaultProfilePicture,
        firstName: anonymousFirstName,
        lastname: anonymousLastName,
        type: "guest",
        email: "",
        organizationName: anonymousOrganizationName,
      });

      await setDoc(doc(db, "userChats", user.uid), {});
      dispatch({ type: "RESET_CHAT" });
      localStorage.setItem("username", displayName);
      localStorage.setItem("accountType", "guest");
      localStorage.setItem("organizationName", anonymousOrganizationName);
      updateAccountType("guest");
      updateOrganizationName(anonymousOrganizationName);
      initializeUserPresence(user.uid);
      setUserOnline(user.uid);

      navigate("/chat");
    } catch (error) {
      console.error("Error signing in anonymously:", error);
      alert("Anonymous sign-in failed. Please try again", "danger");
    }
  };

  return (
    <div>
      <button
        className="btn landing-button-style btn-raised rounded-pill shadow-lg"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#startConversationModal"
      >
        {t("StartConversation")}
      </button>
      <div
        className="modal"
        id="startConversationModal"
        tabindex="-1"
        aria-labelledby="startConversationModal"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-xl ${
            mobileView && "modal-dialog-centered"
          }`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="fs-5 fw-bold">Connect with an Administrator</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3 d-flex flex-wrap">
                <div className="fs-6 text-start">
                  <i className="fa-solid fa-circle-info me-2 fs-6"></i>Please enter your details
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    aria-label="First name"
                    value={anonymousFirstName}
                    onChange={(e) => setAnonymousFirstName(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    aria-label="Last name"
                    value={anonymousLastName}
                    onChange={(e) => setAnonymousLastName(e.target.value)}
                  />
                </div>
                <div className="col-sm-12">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={anonymousOrganizationName}
                    onChange={(e) => setAnonymousOrganizationName(e.target.value)}
                  >
                    <option selected>Select Organization</option>
                    {organizationNames.map((name, index) => (
                      <option key={index} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn "
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn modal-button-style btn-raised rounded-pill"
                data-bs-dismiss="modal"
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
