import React from "react";
import {
    Link
  } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="container my-5 ms-5">
      <h1 className="text-center">Sign Up</h1>
      <div className="container text-right">
        <div className="row">
          <div className="col"></div>
          <div className="col-10">
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
                  Email:
                </label>
                <div className="col-sm-7">
                  <input type="email" className="form-control" id="inputEmail3" />
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
              <div className="row mb-4 text-start">
              <label className="col-sm-3 col-form-label"></label>
                <div className="col-sm-8 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Do you agree with the <a href="/">Terms and Conditions</a>
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
                    <button type="submit" className="btn btn-dark btn-lg">
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
                <div className="col-sm-7">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to="/login">Click here to log in</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}
