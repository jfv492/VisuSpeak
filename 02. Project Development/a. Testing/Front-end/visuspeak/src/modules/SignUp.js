import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, storage, db } from "../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { initializeUserPresence } from "../utils/UserPresence.js";
import defaultProfilePicture from "../assets/images/AccountSettingsHeadshot.jpg";

const SignUp = (props) => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentStep, setCurrentStep] = useState(1);
  const mobileView = windowWidth < 600;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "", // Added organizationName field
    primaryLanguage: "",
    agreeTerms: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = `${formData.firstName} ${formData.lastName}`;
    const email = formData.email;
    const password = formData.password;
    const organizationName = formData.organizationName;
    const primaryLanguage = formData.primaryLanguage;

    let currentErrors = {};
    let formIsValid = true;

    if (mobileView && currentStep === 1) {
      nextStep();
      return;
    }

    // Check for blank fields
    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== "agreeTerms") {
        formIsValid = false;
        currentErrors[key] = "This field cannot be blank.";
      }
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      formIsValid = false;
      currentErrors.email = "Please enter a valid email address.";
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      currentErrors.confirmPassword = "Passwords do not match.";
    }

    if (formData.primaryLanguage === "" || formData.primaryLanguage == null) {
      formIsValid = false;
      currentErrors.primaryLanguage = "Please select your primary language.";
    }

    // Check if terms and conditions are agreed to
    if (!formData.agreeTerms) {
      formIsValid = false;
      currentErrors.agreeTerms = "You must agree to the terms and conditions.";
    }

    setErrors(currentErrors);

    if (!formIsValid) {
      setErrors(currentErrors);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered on firebase:", formData.email);

        fetch(defaultProfilePicture)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "profile_picture.jpg", {
              type: "image/jpeg",
            });

            const storageRef = ref(
              storage,
              `${formData.firstName}_${formData.lastName}`
            );
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
              },
              (error) => {
                console.log(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                  async (downloadURL) => {
                    await updateProfile(res.user, {
                      displayName,
                      photoURL: downloadURL,
                    });
                    try {
                      await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        type: "admin",
                        email,
                        organizationName,
                        primaryLanguage,
                        photoURL: downloadURL,
                      });
                    } catch (error) {
                      console.error("Error adding user to Firestore:", error);
                      // Handle the error appropriately
                    }
                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    initializeUserPresence(res.user.uid);
                  }
                );
              }
            );
          })
          .catch((error) => {
            console.error("Error fetching the image as blob:", error);
          });
        props.showAlert("Signup successful", "success");
        navigate("/login");
      } catch (err) {
        setErrors(err);
        console.log("Firebase error: ", err);
        props.showAlert("Signup failed. Please try again", "danger");
      }
    }
  };

  const formField = (name, label, type = "text", isCheckbox = false) => (
    <div className="col-sm-6">
      <label
        htmlFor={name}
        className={`form-label${isCheckbox ? " form-check-label" : ""}`}
      >
        {label}:
      </label>
      <div className="">
        <input
          type={type}
          className={`form-control${isCheckbox ? " form-check-input" : ""}`}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          checked={type === "checkbox" ? formData[name] : undefined}
        />
        <div className="text-start form-error">
          {errors[name] && (
            <i
              className="fa-solid fa-circle-exclamation me-2"
              style={{ color: "#ca4c4c" }}
            ></i>
          )}
          {errors[name]}
        </div>
      </div>
    </div>
  );

  return (
    <div className="background-container">
      <form
        className="container signup-form shadow-lg rounded-4 p-5"
        onSubmit={handleSubmit}
        novalidate
      >
        <div className="row mb-4">
          <h1> {props.heading}</h1>
          <p class="lead">
            <label className="">Don't have an account?</label>
            <Link
              to="/login"
              className="ms-2 form-link"
              tabIndex="2"
              role="button"
            >
              Login
            </Link>
          </p>
        </div>
        <div className="row justify-content-between">
          {(!mobileView || currentStep === 1) && (
            <>
              {formField("firstName", "First Name")}
              {formField("lastName", "Last Name")}
              {formField("organizationName", "Organization Name")}
              {formField("email", "Email")}
            </>
          )}
          {(!mobileView || currentStep === 2) && (
            <>
              {formField("password", "Password", "password")}
              {formField("confirmPassword", "Confirm Password", "password")}
              <div className="col-sm-6 my-2">
                <div
                  className={` d-flex align-items-start ${
                    mobileView ? "flex-column" : ""
                  }`}
                >
                  <label className="form-label me-2">Primary Language:</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="primaryLanguage"
                      id="primaryLanguageASL"
                      value="ASL"
                      checked={formData.primaryLanguage === "ASL"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="primaryLanguageASL"
                    >
                      ASL
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="primaryLanguage"
                      id="primaryLanguageEnglish"
                      value="English"
                      checked={formData.primaryLanguage === "English"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="primaryLanguageEnglish"
                    >
                      English
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="primaryLanguage"
                      id="primaryLanguageFrench"
                      value="French"
                      checked={formData.primaryLanguage === "French"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="primaryLanguageFrench"
                    >
                      French
                    </label>
                  </div>
                </div>
                <div className="text-start form-error">
                  {errors.primaryLanguage && (
                    <i
                      className="fa-solid fa-circle-exclamation me-2"
                      style={{ color: "#ca4c4c" }}
                    ></i>
                  )}
                  {errors.primaryLanguage}
                </div>
              </div>
              <div className="col-sm-6 my-2">
                <label className="" htmlFor="agreeTerms">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />{" "}
                  Do you agree with the
                  <Link className="hyperlink ms-1" to="/">
                    terms and conditions
                  </Link>
                  ?
                </label>
                <div className="text-start form-error">
                  {errors.agreeTerms && (
                    <i
                      className="fa-solid fa-circle-exclamation me-2"
                      style={{ color: "#ca4c4c" }}
                    ></i>
                  )}
                  {errors.agreeTerms}
                </div>
              </div>
            </>
          )}

          <div className="d-flex">
            {mobileView && currentStep > 1 && (
              <button
                type="button"
                className="btn back-button-style"
                onClick={prevStep}
              >
                <i
                  class="fa-solid fa-arrow-left"
                  style={{ color: "#ffffff;" }}
                ></i>
              </button>
            )}

            {mobileView && currentStep === 1 ? (
              <button type="submit" className="btn back-button-style ms-auto">
                <i
                  class="fa-solid fa-arrow-right"
                  style={{ color: "#ffffff;" }}
                ></i>
              </button>
            ) : (
              <button type="submit" className="btn button-style ms-auto">
                Sign Up
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
