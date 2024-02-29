import React from "react";
import Headshot from "../../assets/images/AccountSettingsHeadshot.jpg";

const SettingsUserInfo = (props) => {
  return (
    <div>
      <div className="row account-settings-user-info align-items-center ">
        <div className="col-sm-4">
          <img
            src={Headshot}
            className="user-profile-picture rounded-circle img-thumbnail"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div className="col-sm-4 lead">
          <h3 className="user-name-text border-bottom pb-2">John Doe</h3>
          <h6 className="user-organization-name">Company XYZ Inc.</h6>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default SettingsUserInfo;