import React from "react";
import {
  Link
} from "react-router-dom";

export default function Login() {
  return (
    <div class="container my-5 ms-5">
      <h1 className="text-center">Login</h1>
      <div class="container text-right">
        <div class="row">
          <div class="col"></div>
          <div class="col-10">
            <form class="container my-5 ms-5 text-end">
              <div class="row mb-4">
                <label for="inputEmail3" class="col-sm-3 col-form-label">
                  Username or Email:
                </label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" id="inputEmail3" />
                </div>
              </div>
              <div class="row mb-4">
                <label for="inputPassword3" class="col-sm-3 col-form-label">
                  Password:
                </label>
                <div class="col-sm-7">
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword3"
                  />
                </div>
              </div>
              <div class="row mb-4">
                <label
                  for="inputPassword3"
                  class="col-sm-3 col-form-label"
                ></label>
                <div class="col-sm-7">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="submit" class="btn btn-dark btn-lg">
                      Login
                    </button>
                  </div>
                </div>
              </div>
              <div class="row mb-4">
                <label
                  for="inputPassword3"
                  class="col-sm-3 col-form-label"
                ></label>
                <div class="col-sm-7">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to="/signup">Click here to sign up</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </div>
  );
}
