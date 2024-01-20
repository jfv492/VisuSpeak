import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Background from "./Background.js";

export default function Resources() {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <>
        <div className="d-grid gap-4 d-sm-flex justify-content-flex-start my-5">
            <h1 className="display-3 mt-5 fw-bold "> ASL Resources </h1>
        </div>
      <div className="container my-5">
        <div className="resources-grid">
            <div className="resources-grid-item">

            </div>
            <div className="resources-grid-item">
              
            </div>
            <div className="resources-grid-item">
              
            </div>
            <div className="resources-grid-item">

            </div>
            <div className="resources-grid-item">
            
            </div>
            <div className="resources-grid-item">
            
            </div>
            <div className="resources-grid-item">

            </div>
            <div className="resources-grid-item">
            
            </div>
            <div className="resources-grid-item">
            
            </div>
        </div>

      </div>
      <div>
        <Background />
      </div>
    </>
  );
}