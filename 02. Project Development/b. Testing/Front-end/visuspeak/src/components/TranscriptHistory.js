import React, { useEffect } from "react";
import StockImage from "../images/FillerPhoto.jpg";
import { Link, useLocation } from "react-router-dom";

export default function TranscriptHistory() {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <>
      <div className="container my-5">
        <div>
            <h1 className="display-3 mt-5 fw-bold ">
                Transcript History
            </h1>
        </div>        
      </div>
    </>
  );
}