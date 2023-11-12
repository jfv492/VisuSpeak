import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const PORT = process.env.PORT || 8081
  const serverUrl = `http://localhost:${PORT}`;
  const signupUrl = `${serverUrl}/auth/signup`;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
    // Reset individual field error
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let currentErrors = {};
    let formIsValid = true;

    // Check for blank fields
    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== "agreeTerms") {
        // agreeTerms is a boolean, it should be checked separately
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

    // Check if terms and conditions are agreed to
    if (!formData.agreeTerms) {
      formIsValid = false;
      currentErrors.agreeTerms = "You must agree to the terms and conditions.";
    }

    setErrors(currentErrors);

    if (!formIsValid) {
      // If the form is not valid, display the errors without making a request to the server.
      setErrors(currentErrors);
    } else {
      // If the form is valid, proceed with making the request to the server.
      axios
        .post(signupUrl, formData)
        .then((response) => {
          console.log("Signup successful", response.data);
          // Update the state with the success message from the server
          setErrors({});
          // Optionally, include a state to manage success messages
          setSuccess(response.data.message);
          // Redirect or show success message
        })
        .catch((error) => {
          console.error("Signup failed", error);
          // Update the state with the error message from the server
          if (error.response && error.response.data) {
            // Handle the case where there's a response with a data payload
            setErrors({ form: error.response.data.error });
          } else {
            // Handle the case where the error doesn't have a response (e.g., network error)
            setErrors({
              form: "An unexpected error occurred. Please try again later.",
            });
          }
        });
    }
  };

  // Form input fields
  const formField = (name, label, type = "text", isCheckbox = false) => (
    <div className="row mb-4">
      <label
        htmlFor={name}
        className={`col-sm-3 col-form-label${
          isCheckbox ? " form-check-label" : ""
        }`}
      >
        {label}:
      </label>
      <div className="col-sm-7">
        <input
          type={type}
          className={`form-control${isCheckbox ? " form-check-input" : ""}`}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          checked={type === "checkbox" ? formData[name] : undefined}
        />
        {errors[name] && (
          <div class="text-start form-error">{errors[name]}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="hero px-4 py-5 text-center shadow-lg">
      <h1 className="display-3 mt-5 fw-bold ">Sign Up</h1>

      <div className="container text-right">
        {errors.form && (
          <div className="text-center form-error">{errors.form}</div>
        )}
        {success && <div className="alert alert-success">{success}</div>}
        <form className="container my-5 ms-5 text-end" onSubmit={handleSubmit}>
          {formField("firstName", "First Name")}
          {formField("lastName", "Last Name")}
          {formField("username", "Username")}
          {formField("email", "Email")}
          {formField("password", "Password", "password")}
          {formField("confirmPassword", "Confirm Password", "password")}
          <div className="row mb-4"></div>
          <div className="col-sm-7">
            <div className="justify-content-center">
              <label
                className="form-check-label col-form-label mx-3"
                htmlFor="agreeTerms"
              >
                Do you agree with the{" "}
                <Link className="hyperlink" to="/">
                  terms and conditions
                </Link>
                ?
              </label>
              <input
                type="checkbox"
                className="form-check-input"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              {errors.agreeTerms && (
                <div class="form-error">{errors.agreeTerms}</div>
              )}
            </div>
          </div>
          <div className="row mt-4 mb-4">
            <div className="col-sm-7 offset-sm-3">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg button-style"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="d-grid gap-4 d-sm-flex justify-content-sm-center align-items-center my-5">
          <label className="large-text-style">Already have an account?</label>
          <Link
            to="/login"
            className="btn btn-outline-dark btn-lg button-outline-style"
            tabIndex="2"
            role="button"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
