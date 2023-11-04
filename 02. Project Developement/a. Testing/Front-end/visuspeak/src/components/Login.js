import React from "react";
import {
  Link
} from "react-router-dom";

export default function Login() {
  return (
    <div className="container my-5 ms-5">
      <h1 className="text-center">Login</h1>
      <div className="container text-right">
        <div className="row">
          <div className="col"></div>
          <div className="col-10">
            <form className="container my-5 ms-5 text-end">
              <div className="row mb-4">
                <label for="inputEmail3" className="col-sm-3 col-form-label">
                  Username or Email:
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
                <label
                  for="inputPassword3"
                  className="col-sm-3 col-form-label"
                ></label>
                <div className="col-sm-7">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="submit" className="btn btn-dark btn-lg button-style">
                      Login
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
                    <p>Do no have an account? </p>
                    <Link to="/signup" className="btn btn-dark btn-lg button-style" tabIndex="2" role="button">
                    Sign Up
                    </Link>
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
