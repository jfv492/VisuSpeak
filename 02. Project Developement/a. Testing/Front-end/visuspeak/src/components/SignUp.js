import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="hero px-4 py-5 text-center shadow-lg">
      <h1 className="display-3 mt-5 fw-bold ">Sign Up</h1>
      <div className="container text-right">
        <form className="container my-5 ms-5 text-end">
          <div className="row mb-4">
            <label for="inputEmail3" className="col-sm-3 col-form-label">
              First Name:
            </label>
            <div className="col-sm-7">
              <input type="text" className="form-control" id="inputEmail3" />
            </div>
          </div>
          <div className="row mb-4">
            <label for="inputEmail3" className="col-sm-3 col-form-label">
              Last Name:
            </label>
            <div className="col-sm-7">
              <input type="text" className="form-control" id="inputEmail3" />
            </div>
          </div>
          <div className="row mb-4">
            <label for="inputEmail3" className="col-sm-3 col-form-label">
              Username:
            </label>
            <div className="col-sm-7">
              <input type="text" className="form-control" id="inputEmail3" />
            </div>
          </div>
          <div className="row mb-4">
            <label for="inputEmail3" className="col-sm-3 col-form-label">
              Email:
            </label>
            <div className="col-sm-7">
              <input type="text" className="form-control" id="inputEmail3" />
            </div>
          </div>
          <div className="row mb-4">
            <label for="inputPassword3" className="col-sm-3 col-form-label">
              Password:
            </label>
            <div className="col-sm-7">
              <input
                type="password"
                className="form-control"
                id="inputPassword3"
              />
            </div>
          </div>
          <div className="row mb-4">
            <label for="inputPassword3" className="col-sm-3 col-form-label">
              Confirm Password:
            </label>
            <div className="col-sm-7">
              <input
                type="password"
                className="form-control"
                id="inputPassword3"
              />
            </div>
          </div>
          <div className="row mb-4 align-items-center">
            <label className="col-sm-3 col-form-label"><input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                /></label>
            <div className="col-sm-7 text-start"> 
                <label className="form-check-label col-form-label" for="exampleCheck1">
                  Do you agee with the terms and conditions
                </label>
            </div>
          </div>
          <div className="row mb-4">
            <label
              for="inputPassword3"
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
              for="inputPassword3"
              className="col-sm-3 col-form-label"
            ></label>
          </div>
        </form>
        <div className="d-grid gap-4 d-sm-flex justify-content-sm-center align-items-center my-5">
          <lavel className="large-text-style">Already have an account?</lavel>
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
