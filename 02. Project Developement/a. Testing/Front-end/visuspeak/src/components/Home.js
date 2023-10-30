import React from "react";
import StockImage from "../images/FillerPhoto.jpg";

export default function Home() {
  return (
    <div className="container my-5 ms-5">
      <h1 className="text-center">Welcome to VisuSpeak</h1>
      <h3 className="text-center">Your ASL Companion</h3>
      <div class="d-grid gap-2 col-6 mx-auto my-4">
        <a href="/" class="btn btn-dark btn-lg" tabindex="1" role="button">
          Login
        </a>
        <a href="/" class="btn btn-dark btn-lg" tabindex="2" role="button">
          Sign Up
        </a>
      </div>

      <div class="container my-5">
        <div class="row my-5">
          <div class="col">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat
            ac tincidunt vitae semper quis lectus nulla at. Arcu dictum varius
            duis at. Arcu non odio euismod lacinia at quis risus sed. Mollis
            nunc sed id semper risus in. Aliquam sem fringilla ut morbi
            tincidunt augue interdum velit euismod. Lectus mauris ultrices eros
            in cursus. Nullam vehicula ipsum a arcu cursus vitae congue mauris
            rhoncus. Ultrices gravida dictum fusce ut placerat orci nulla. Diam
            maecenas ultricies mi eget mauris pharetra et. Sem nulla pharetra
            diam sit amet nisl suscipit. Platea dictumst quisque sagittis purus
            sit amet volutpat consequat. Cursus in hac habitasse platea
            dictumst. Morbi enim nunc faucibus a.
          </div>
          <div class="col">
            <img src={StockImage} class="img-fluid" alt="..." />
          </div>
        </div>
        <div class="row my-5">
          <div class="col">
            <img src={StockImage} class="img-fluid" alt="..." />
          </div>
          <div class="col">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat
            ac tincidunt vitae semper quis lectus nulla at. Arcu dictum varius
            duis at. Arcu non odio euismod lacinia at quis risus sed. Mollis
            nunc sed id semper risus in. Aliquam sem fringilla ut morbi
            tincidunt augue interdum velit euismod. Lectus mauris ultrices eros
            in cursus. Nullam vehicula ipsum a arcu cursus vitae congue mauris
            rhoncus. Ultrices gravida dictum fusce ut placerat orci nulla. Diam
            maecenas ultricies mi eget mauris pharetra et. Sem nulla pharetra
            diam sit amet nisl suscipit. Platea dictumst quisque sagittis purus
            sit amet volutpat consequat. Cursus in hac habitasse platea
            dictumst. Morbi enim nunc faucibus a.
          </div>
        </div>
      </div>
    </div>
  );
}
