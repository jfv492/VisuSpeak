import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const PORT = process.env.PORT || 8081
  const serverUrl = `http://localhost:${PORT}`;
  const loginUrl = `${serverUrl}/auth/login`;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Username and password cannot be empty.");
      return;
    }

    axios
      .post(loginUrl, formData)
      .then((response) => {
        console.log("Login successful", response.data);
        // Handle successful login
      })
      .catch((error) => {
        console.error("Login failed", error);
        setError("Invalid credentials. Please try again.");
      });
  };

  return (
    <div className="hero px-4 py-5 text-center shadow-lg">
      <h1 className="display-3 mt-5 fw-bold ">Login</h1>

      <div className="container text-right">
        <div class="container text-center">
          <div class="row">
            <div class="col"></div>
            <div class="col">
              
            </div>
            <div class="col"></div>
          </div>
        </div>
        <form className="container mb-5 ms-5 text-end" onSubmit={handleSubmit}>
          <div className="row mb-4">
            <label htmlFor="username" className="col-sm-3 col-form-label">
              Username:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
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
                value={formData.password}
                onChange={handleChange}
              />
              {error && (
                <div className="text-start form-error">
                  {error}
                </div>
              )}
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-sm-3">
              
            </div>
            <div className="col-sm-7">
              <div className="gap-2 d-md-flex justify-content-md-end">
              
                <button
                  type="submit"
                  className="btn btn-dark btn-lg button-style"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="d-grid gap-4 d-sm-flex justify-content-sm-center align-items-center my-5">
          <label className="large-text-style">Don't have an account?</label>
          <Link
            to="/signup"
            className="btn btn-outline-dark btn-lg button-outline-style"
            tabIndex="2"
            role="button"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
