import React from "react";

import Hello from "../assets/images/Hello.jpg";
import Please from "../assets/images/Please.jpg";
import ThankYou from "../assets/images/ThankYou.png";
import Yes from "../assets/images/Yes.jpg";
import No from "../assets/images/No.jpg";

export default function Resources() {
  return (
    <>
      <div className="d-grid gap-4 d-sm-flex justify-content-flex-start my-5">
        <h1 className="display-3 mt-5 fw-bold "> ASL Resources </h1>
      </div>

      <div className="container my-5">
        <div className="row mt-2 resources-grid">
          <div className="col p-2 card resources-grid-item" aria-hidden="true">
            <img
              src={Hello}
              className="rounded mx-auto d-block"
              alt="..."
              width="100%"
            />
            <div className="card-body">
              <h3 className="card-title fw-bold">Learn to Sign: Hello</h3>
              <p className="card-text py-3 large-text-style">
                This quick tutorial will show you how to properlly sign the word
                "Hello" in ASL.
              </p>
              <a className="btn btn-lg button-style fs-6">View Resource</a>
            </div>
          </div>

          <div className="col p-2 card resources-grid-item" aria-hidden="true">
            <img
              src={Please}
              className="rounded mx-auto d-block"
              alt="..."
              width="100%"
            />
            <div className="card-body">
              <h3 className="card-title fs-3 fw-bold">Learn to Sign: Please</h3>
              <p className="card-text py-3 large-text-style">
                This quick tutorial will show you how to properlly sign the word
                "Please" in ASL.
              </p>
              <a className="btn btn-lg button-style fs-6">View Resource</a>
            </div>
          </div>

          <div className="col p-2 card resources-grid-item" aria-hidden="true">
            <img
              src={ThankYou}
              className="rounded mx-auto d-block"
              alt="..."
              width="100%"
            />
            <div className="card-body">
              <h3 className="card-title fs-3 fw-bold">Learn to Sign: Thank You</h3>
              <p className="card-text py-3 large-text-style">
                This quick tutorial will show you how to properlly sign the word
                "Thank You" in ASL.
              </p>
              <a className="btn btn-lg button-style fs-6">View Resource</a>
            </div>
          </div>

          <div className="col p-2 card resources-grid-item" aria-hidden="true">
            <img
              src={Yes}
              className="rounded mx-auto d-block"
              alt="..."
              width="100%"
            />
            <div className="card-body">
              <h3 className="card-title fs-3 fw-bold">Learn to Sign: Yes</h3>
              <p className="card-text py-3 large-text-style">
                This quick tutorial will show you how to properlly sign the word
                "Yes" in ASL.
              </p>
              <a className="btn btn-lg button-style fs-6">View Resource</a>
            </div>
          </div>

          <div className="col p-2 card resources-grid-item" aria-hidden="true">
            <img
              src={No}
              className="rounded mx-auto d-block"
              alt="..."
              width="100%"
            />
            <div className="card-body">
              <h3 className="card-title fs-3 fw-bold">Learn to Sign: No</h3>
              <p className="card-text py-3 large-text-style">
                This quick tutorial will show you how to properlly sign the word
                "No" in ASL.
              </p>
              <a className="btn btn-lg button-style fs-6">View Resource</a>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </>
  );
}
