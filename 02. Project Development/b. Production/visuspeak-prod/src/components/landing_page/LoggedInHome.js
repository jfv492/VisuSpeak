import React, { useState, useEffect } from "react";
import MenuButtons from "./HomePageButtons.js";
import MenuInfo from "./MenuInfo.js";

const HomeMenu = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const mobileView = windowWidth < 600;
  
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  return (
      <div className={`menu-hero shadow-lg bg-body-tertiary rounded-4 ${mobileView ? ("d-flex flex-column align-items-end") : ("row justify-content-center")}`}>
        <div className={`${mobileView ? ("pt-4 mb-auto") : ("col-sm-7")}`}>
          <MenuInfo />
        </div>
        <div className={`${mobileView ? ("p-5 align-self-center") : ("col-sm-5")}`}>
          <MenuButtons />
        </div>
      </div>
  );
};

export default HomeMenu;
