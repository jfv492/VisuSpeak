import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Background from "./Background.js";
import StockImage from "../images/FillerPhoto.jpg";

export default function Resources() {
  return (
    <>
        <div className="d-grid gap-4 d-sm-flex justify-content-flex-start my-5">
            <h1 className="display-3 mt-5 fw-bold "> ASL Resources </h1>
        </div>

      <div className="container my-5">
        <div class="row mt-2 resources-grid">

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <img src={StockImage} className="rounded mx-auto d-block" alt="..." width="100%"/>
            <div class="card-body">
              <h5 class="card-title">Card with Placeholders</h5>
              <p class="card-text">
                <span class="placeholder col-2"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-5"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a class="btn btn-lg button-style"></a>
            </div>
          </div>

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <img src={StockImage} className="rounded mx-auto d-block" alt="..." width="100%"/>
            <div class="card-body">
              <h5 class="card-title">Card with Placeholders</h5>
              <p class="card-text">
                <span class="placeholder col-2"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-5"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a class="btn btn-lg button-style"></a>
            </div>
          </div>

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <img src={StockImage} className="rounded mx-auto d-block" alt="..." width="100%"/>
            <div class="card-body">
              <h5 class="card-title">Card with Placeholders</h5>
              <p class="card-text">
                <span class="placeholder col-2"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-5"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a class="btn btn-lg button-style"></a>
            </div>
          </div>

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <img src={StockImage} className="rounded mx-auto d-block" alt="..." width="100%"/>
            <div class="card-body">
              <h5 class="card-title">Card with Placeholders</h5>
              <p class="card-text">
                <span class="placeholder col-2"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-5"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a class="btn btn-lg button-style"></a>
            </div>
          </div>

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <img src={StockImage} className="rounded mx-auto d-block" alt="..." width="100%"/>
            <div class="card-body">
              <h5 class="card-title">Card with Placeholders</h5>
              <p class="card-text">
                <span class="placeholder col-2"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-5"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a class="btn btn-lg button-style"></a>
            </div>
          </div>

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <img src={StockImage} className="rounded mx-auto d-block" alt="..." width="100%"/>
            <div class="card-body">
              <h5 class="card-title">Card with Placeholders</h5>
              <p class="card-text">
                <span class="placeholder col-2"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-5"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a class="btn btn-lg button-style"></a>
            </div>
          </div>

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <img src={StockImage} className="rounded mx-auto d-block" alt="..." width="100%"/>
            <div class="card-body">
              <h5 class="card-title">Card with Placeholders</h5>
              <p class="card-text">
                <span class="placeholder col-2"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-5"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a class="btn btn-lg button-style"></a>
            </div>
          </div>

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <img src={StockImage} className="rounded mx-auto d-block" alt="..." width="100%"/>
            <div class="card-body">
              <h5 class="card-title">Card with Placeholders</h5>
              <p class="card-text">
                <span class="placeholder col-2"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-5"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a class="btn btn-lg button-style"></a>
            </div>
          </div>

          <div class="col p-2 card resources-grid-item" aria-hidden="true">
            <img src={StockImage} className="rounded mx-auto d-block" alt="..." width="100%"/>
            <div class="card-body">
              <h5 class="card-title">Card with Placeholders</h5>
              <p class="card-text">
                <span class="placeholder col-2"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-5"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a class="btn btn-lg button-style"></a>
            </div>
          </div>
        </div>
        

      </div>
      <div>
        <Background />
      </div>
    </>
  );
}