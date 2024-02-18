import HandGestureBG from "../assets/images/ASLBackgroundSigns.png"; // Background image
import React from "react";

export default function Background() {
  return (
    <div className="text-center">
        <img src={HandGestureBG} alt="Hand Gesture Background" className="hand-gesture-background"/>      
    </div>
  )
}