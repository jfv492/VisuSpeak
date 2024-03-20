import React, { useState, useContext } from "react";
import { db } from "../../firebase";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { AuthContext } from "../../context/AuthContext.js";
import { ChatContext } from "../../context/ChatContext.js";
import { setUserOffline } from "../../utils/UserPresence.js";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const FeedbackForm = () => {
    const { t } = useTranslation();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const { currentUser, updateAccountType, updateOrganizationName } =
    useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  let navigate = useNavigate();

  const handleSignOut = async () => {
    dispatch({ type: "RESET_CHAT" });
    // Set user status to offline
    if (currentUser && currentUser.uid) {
      await setUserOffline(currentUser.uid);
    }
    // Clear local storage and sign out
    localStorage.clear();
    await signOut(auth);
    updateAccountType("");
    updateOrganizationName("");
    navigate("/");
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'feedbacks'), {
        userId: currentUser.uid,
        name: localStorage.getItem("username"),
        feedback,
        rating,
        organization: localStorage.getItem("organizationName"),
        createdAt: new Date(),
      });
      alert("Feedback submitted successfully");
      setFeedback("");
      setRating(0);
      handleSignOut();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="nav-link btn navbar-button-style btn-raised rounded-pill px-3"
        data-bs-toggle="modal"
        data-bs-target="#feedbackModal"
      >
        <i class="fa-solid fa-right-from-bracket me-2"></i>
        {t("endChat")}
      </button>
      <div
        class="modal fade"
        id="feedbackModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Your Feedback
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <p>What do you think of the VisuSpeak chat?</p>
            <div className="text-center mb-3">
              {/* Icon buttons for rating feedback */}
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`btn btn-reaction ${rating === num ? 'selected' : ''}`}
                  onClick={() => setRating(num)}
                >
                  <i className={`fas ${num <= rating ? 'fa-grin-stars' : 'fa-star'}`}></i>
                </button>
              ))}
            </div>
            <textarea className="form-control my-3" rows="3" placeholder="Do you have any thoughts you’d like to share?" value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn" data-bs-dismiss="modal" onClick={handleSignOut}>Cancel</button>
            <button type="submit" className="btn modal-button-style btn-raised rounded-pill" data-bs-dismiss="modal" onClick={handleSubmit}>Send</button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
