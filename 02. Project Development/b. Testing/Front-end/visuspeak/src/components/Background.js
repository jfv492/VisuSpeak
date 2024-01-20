import HandGestureBG from "../images/ASl Signs.png";
import "../VisuSpeak.css";
import React from "react";

export default function Background() {
  return (
    <div className="text-center">
        <div className="shadow-before-background">

        </div>
        <img src={HandGestureBG} alt="Hand Gesture Background" className="hand-gesture-background"/>
        <img src={HandGestureBG} alt="Hand Gesture Background" className="hand-gesture-background"/>
    </div>
  )
}