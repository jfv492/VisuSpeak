import React, { useEffect } from "react";
import StockImage from "../images/FillerPhoto.jpg";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <>
      <div className={`hero px-4 py-5 text-center shadow-lg  ${
                    location.pathname === "/about" ? "d-none" : ""
                  }`} >
        <h1 className="display-3 mt-5 fw-bold ">
          Welcome to VisuSpeak
        </h1>
        <div className="col-lg-6 mx-auto">
          <h1 className="display-5 text-body-emphasis">Your ASL Companion</h1>
          <div className="d-grid gap-4 d-sm-flex justify-content-sm-center my-5">
            <Link
              to="/login"
              className="btn btn-lg button-style"
              tabIndex="1"
              role="button"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-lg button-style"
              tabIndex="2"
              role="button"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className={`b-example-divider  ${
                    location.pathname === "/about" ? "d-none" : ""
                  }`}>
      </div>
      <div className="container my-5">
          <div className="row mt-5">
            <div className="col large-text-style">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Volutpat ac tincidunt vitae semper quis lectus nulla at. Arcu
              dictum varius duis at. Arcu non odio euismod lacinia at quis risus
              sed. Mollis nunc sed id semper risus in. Aliquam sem fringilla ut
              morbi tincidunt augue interdum velit euismod. Lectus mauris
              ultrices eros in cursus. Nullam vehicula ipsum a arcu cursus vitae
              congue mauris rhoncus. Ultrices gravida dictum fusce ut placerat
              orci nulla. Diam maecenas ultricies mi eget mauris pharetra et.
              Sem nulla pharetra diam sit amet nisl suscipit. Platea dictumst
              quisque sagittis purus sit amet volutpat consequat. Cursus in hac
              habitasse platea dictumst. Morbi enim nunc faucibus a.
            </div>
            <div className="col">
              <img src={StockImage} className="rounded mx-auto d-block" alt="..." height="350"/>
            </div>
          </div>
          <div className="row mt-5">
          <div className="col">
              <img src={StockImage} className="rounded mx-auto d-block" alt="..." height="350"/>
            </div>
            <div className="col large-text-style">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Volutpat ac tincidunt vitae semper quis lectus nulla at. Arcu
              dictum varius duis at. Arcu non odio euismod lacinia at quis risus
              sed. Mollis nunc sed id semper risus in. Aliquam sem fringilla ut
              morbi tincidunt augue interdum velit euismod. Lectus mauris
              ultrices eros in cursus. Nullam vehicula ipsum a arcu cursus vitae
              congue mauris rhoncus. Ultrices gravida dictum fusce ut placerat
              orci nulla. Diam maecenas ultricies mi eget mauris pharetra et.
              Sem nulla pharetra diam sit amet nisl suscipit. Platea dictumst
              quisque sagittis purus sit amet volutpat consequat. Cursus in hac
              habitasse platea dictumst. Morbi enim nunc faucibus a.
            </div>
          </div>
          <div className="row mt-5">
            <div className="col large-text-style">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Volutpat ac tincidunt vitae semper quis lectus nulla at. Arcu
              dictum varius duis at. Arcu non odio euismod lacinia at quis risus
              sed. Mollis nunc sed id semper risus in. Aliquam sem fringilla ut
              morbi tincidunt augue interdum velit euismod. Lectus mauris
              ultrices eros in cursus. Nullam vehicula ipsum a arcu cursus vitae
              congue mauris rhoncus. Ultrices gravida dictum fusce ut placerat
              orci nulla. Diam maecenas ultricies mi eget mauris pharetra et.
              Sem nulla pharetra diam sit amet nisl suscipit. Platea dictumst
              quisque sagittis purus sit amet volutpat consequat. Cursus in hac
              habitasse platea dictumst. Morbi enim nunc faucibus a.
            </div>
            <div className="col">
              <img src={StockImage} className="rounded mx-auto d-block" alt="..." height="350"/>
            </div>
          </div>
      </div>
    </>
  );
}
