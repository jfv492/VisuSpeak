import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const serverUrl = 'http://localhost:8081'; // Assuming your backend is running on port 8081
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the server using Axios
    axios
    .post(signupUrl, formData) // Replace with the correct URL for your server's signup endpoint
      .then((response) => {
        console.log("Signup successful", response.data);
        // You can add a redirect or show a success message here
      })
      .catch((error) => {
        console.error("Signup failed", error);
        // Handle signup failure, e.g., show an error message to the user
      });
  };

  return (
    <div className="hero px-4 py-5 text-center shadow-lg">
      <h1 className="display-3 mt-5 fw-bold ">Sign Up</h1>
      <div className="container text-right">
        <form className="container my-5 ms-5 text-end" onSubmit={handleSubmit}>
          <div className="row mb-4">
            <label htmlFor="firstName" className="col-sm-3 col-form-label">
              First Name:
            </label>
            <div className="col-sm-7">
              <input type="text" className="form-control firstName" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}/>
            </div>
          </div>
          <div className="row mb-4">
            <label htmlFor="lastName" className="col-sm-3 col-form-label">
              Last Name:
            </label>
            <div className="col-sm-7">
              <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}/>
            </div>
          </div>
          <div className="row mb-4">
            <label htmlFor="username" className="col-sm-3 col-form-label">
              Username:
            </label>
            <div className="col-sm-7">
              <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange}/>
            </div>
          </div>
          <div className="row mb-4">
            <label htmlFor="email" className="col-sm-3 col-form-label">
              Email:
            </label>
            <div className="col-sm-7">
              <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange}/>
            </div>
          </div>
          <div className="row mb-4">
            <label htmlFor="password" className="col-sm-3 col-form-label">
              Password:
            </label>
            <div className="col-sm-7">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password} onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-4">
            <label htmlFor="confirmPassword" className="col-sm-3 col-form-label">
              Confirm Password:
            </label>
            <div className="col-sm-7">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword} onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-4 align-items-center">
            <label className="col-sm-3 col-form-label"><input
              type="checkbox"
              className="form-check-input"
              id="agreeTerms"
              name="agreeTerms"
              value={formData.agreeTerms} onChange={handleChange}
            /></label>
            <div className="col-sm-7 text-start">
              <label className="form-check-label col-form-label" htmlFor="agreeTerms">
                Do you agee with the terms and conditions
              </label>
            </div>
          </div>
          <div className="row mb-4">
            <label
              htmlFor="inputPassword3"
              className="col-sm-3 col-form-label"
            ></label>
            <div className="col-sm-7">
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
          <div className="row mb-4">
            <label
              htmlFor="inputPassword3"
              className="col-sm-3 col-form-label"
            ></label>
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
