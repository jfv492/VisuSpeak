import React from "react";

export default function SignUp() {
  return (
    <div class="container my-5 ms-5">
      <h1 className="text-center">Sign Up</h1>
      <div class="container text-right">
        <div class="row">
          <div class="col"></div>
          <div class="col-10">
            <form class="container my-5 ms-5 text-end">
              <div class="row mb-4">
                <label for="inputEmail3" class="col-sm-3 col-form-label">
                  First Name:
                </label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" id="inputEmail3" />
                </div>
              </div>
              <div class="row mb-4">
                <label for="inputEmail3" class="col-sm-3 col-form-label">
                  Last Name:
                </label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" id="inputEmail3" />
                </div>
              </div>
              <div class="row mb-4">
                <label for="inputEmail3" class="col-sm-3 col-form-label">
                  Email:
                </label>
                <div class="col-sm-7">
                  <input type="email" class="form-control" id="inputEmail3" />
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
                <label for="inputPassword3" class="col-sm-3 col-form-label">
                  Confirm Password:
                </label>
                <div class="col-sm-7">
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword3"
                  />
                </div>
              </div>
              <div class="row mb-4 text-start">
              <label class="col-sm-3 col-form-label"></label>
                <div class="col-sm-8 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Do you agree with the <a href="/">Terms and Conditions</a>
                  </label>
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
                      Sign Up
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
                    <a href="/">Click here to log in</a>
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
