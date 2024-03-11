import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { setUserOnline } from "../utils/UserPresence.js";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext.js"

const Login = (props) => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const { updateAccountType, updateOrganizationName } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError(`${t("EmptyCredentials")}`);
      return;
    }

    //Firebase Authentication
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setUserOnline(res.user.uid); // Set user online after successful login

      const userDocRef = doc(db, "users", res.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // Set local storage items
        localStorage.setItem("username", userDocSnap.data().displayName);
        localStorage.setItem(
          "organizationName",
          userDocSnap.data().organizationName
        );
        localStorage.setItem("accountType", userDocSnap.data().type);
        updateAccountType(userDocSnap.data().type);
        updateOrganizationName(userDocSnap.data().organizationName);
      } else {
        console.log("No such document in Firestore!");
      }

      props.showAlert(`${t("LoginSuccessful")}`, "success");

      navigate("/chat");
    } catch (err) {
      console.log("Firebase error: ", err);
      props.showAlert(`${t("LoginFailed")}`, "danger");
      setError(`${t("InvalidCredentials")}`);
    }
  };
  return (
    <div className="background-container">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          {/* <div class="col-sm-12"> */}
          <form
            className="login-form shadow-lg rounded-4 p-5"
            onSubmit={handleSubmit}
          >
            <div className="row  mb-4">
              <h1> {t("Login")}</h1>
              <p class="lead">
                <label className="">{t("Login Prompt")}</label>
                <Link
                  to="/signup"
                  className="ms-2 form-link"
                  tabIndex="2"
                  role="button"
                >
                  {t("Sign-up")}
                </Link>
              </p>
            </div>

            <div className="row mb-4">
              <label htmlFor="email" className="form-label mt-1">
                {t("EmailLabel")}:
              </label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <label htmlFor="password" className="form-label mt-1">
                {t("PasswordLabel")}:
              </label>
              <div className="">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="text-start form-error mt-1">
                  {error && (
                    <i
                      className="fa-solid fa-circle-exclamation me-2"
                      style={{ color: "#ca4c4c" }}
                    ></i>
                  )}
                  {error}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div>
                <button
                  type="submit"
                  className="btn form-button-style btn-raised rounded-pill"
                >
                  {t("Login")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Login;
