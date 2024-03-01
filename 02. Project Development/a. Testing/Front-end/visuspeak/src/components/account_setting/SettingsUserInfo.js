import React, { useContext } from "react";
import Headshot from "../../assets/images/AccountSettingsHeadshot.jpg";
import { AuthContext } from "../../context/AuthContext.js";
import Typography from "@mui/material/Typography";

const SettingsUserInfo = (props) => {
  const { currentUser } = useContext(AuthContext);
  const email = currentUser?.email;
  const organizationName = localStorage.getItem("organizationName");
  return (
    <div>
      <div className="row account-settings-user-info align-items-center ">
        <div className="col-sm-3">
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={Headshot}
              className="user-profile-picture rounded-circle img-thumbnail"
              alt="..."
              width="100%"
              style={{ justifyContent: "end" }}
            />
            <i
              className="fa-solid fa-camera fa-xl change-user-profile-icon rounded-circle shadow border"
              style={{
                position: "absolute",
                bottom: 25,
                right: 3,
              }}
            />
          </div>
        </div>
        <div className="col-sm-9">
          <h3 className="user-name-text border-bottom pb-2">
            {localStorage.getItem("username")}
          </h3>
          <div className="row">
            <div className="col-sm-3">
            <Typography variant="caption" display="block" gutterBottom style={{ fontSize: '15px' }}>
          <i class="fa-solid fa-envelope me-2" style={{color: "#006262"}}></i>{email}
          </Typography>
            </div>
            <div className="col-sm-6">
            <Typography variant="caption" display="block" gutterBottom style={{ fontSize: '15px' }}>
          <i class="fa-solid fa-briefcase me-2" style={{color: "#006262"}}></i>{organizationName}
          </Typography>
              </div>
          </div>
          
          
        </div>
      </div>
      <hr />
    </div>
  );
};

export default SettingsUserInfo;
