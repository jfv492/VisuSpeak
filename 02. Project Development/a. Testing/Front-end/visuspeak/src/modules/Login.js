import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, storage, db } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import serverUrl from "../Server-env.js";
import defaultProfilePicture from "../assets/images/AccountSettingsHeadshot.jpg"

const Login = (props) => {
  const loginUrl = `${serverUrl}/auth/login`;
  let navigate = useNavigate();
  const [err, setErr] = useState(false);

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

    const email = formData.email;
    const password = formData.password;
    //Firebase Authentication
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setErr(false);
      console.log("Firebase error: ", err);
      props.showAlert("Firebase Login failed. Please try again", "danger");
    }

    if (!formData.email || !formData.password) {
      setError("Email and password cannot be empty.");
      return;
    }

    axios
      .post(loginUrl, formData)
      .then((response) => {
        console.log("Login successful", response.data);
        props.showAlert("Login successful.", "success");
        setError();

        const json = response.data;
        localStorage.setItem("email", json.email);
        localStorage.setItem("username", json.username);
        localStorage.setItem("userID", json.userID);
        localStorage.setItem("authtoken", json.authtoken);
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed. Please try again", error);
        props.showAlert("Login failed. Please try again.", "danger");
        setError("Invalid credentials. Please try again.");
      });
  };
  return (
    <div className="background-container">
      <form
        className="container login-form shadow-lg rounded-4 p-5"
        onSubmit={handleSubmit}
      >
        <div className="row  mb-4">
          <h1> {props.heading}</h1>
          <p class="lead">
            <label className="">Don't have an account?</label>
            <Link
              to="/signup"
              className="ms-2 form-link"
              tabIndex="2"
              role="button"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div className="row mb-4">
          <label htmlFor="email" className="form-label mt-1">
            Email:
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
            Password:
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
        <div className="row form-submit-row justify-content-end">
          <button type="submit" className="btn button-style">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
