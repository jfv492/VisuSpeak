import React, { useState, useEffect } from "react";

const SettingsEditAccountInfo = (props) => {

  return (
    <form>
        <div className="row settings-form">
            <div className="col-sm-6">
                <label 
                    for="email" 
                    className="form-label mt-1">
                    Email Address
                </label>

                <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="JohnD1993@gmail.com"/>
            </div>

            <div className="col-sm-6">
                <label 
                    for="userName" 
                    className="form-label mt-1">
                    User Name
                </label>

                <input 
                    type="text" 
                    className="form-control" 
                    id="userName" 
                    placeholder="JDoe"/>
            </div>

            <div className="col-sm-6 gy-3">
                <label 
                    for="password" 
                    className="form-label mt-1">
                    Password
                </label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="********"/>
            </div>

            <div className="col-sm-6 gy-3">
                <label 
                    for="orgName" 
                    className="form-label mt-1">
                    Organization Name
                </label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="orgName" 
                    placeholder="Company XYZ Inc."/>
            </div>

            <div className="col-sm-12 gy-4">
                <button 
                    type="submit" 
                    className="btn settings-submit-button"> 
                    Save Changes 
                </button>
            </div>
        </div>
    </form>
  );
};

export default SettingsEditAccountInfo;
