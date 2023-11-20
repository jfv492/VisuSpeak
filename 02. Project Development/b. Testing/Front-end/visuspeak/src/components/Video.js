import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VideoComponent from './VideoComponent.js'

export default function Login(props) {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="hero px-4 py-5 text-center shadow-lg">
      <div className="container text-right">
        <div class="container text-center">
          <div class="row">
            <div class="col"></div>
            <div class="col">
              <VideoComponent />
            </div>
            <div class="col">
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
