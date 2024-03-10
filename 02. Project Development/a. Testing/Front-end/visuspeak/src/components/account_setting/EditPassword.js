import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";
import { AuthContext } from "../../context/AuthContext.js";
import { setUserOffline } from "../../utils/UserPresence.js";
import { updatePassword, signOut } from "firebase/auth";
import Alert from "@mui/material/Alert";
import { useTranslation } from 'react-i18next';

const SettingsEditAccountInfo = () => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [initialFormData, setInitialFormData] = useState({ ...formData });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setEditMode(false);
    setError(null);
  };

  const handleSignOut = async () => {
    // Set user status to offline
    if (currentUser && currentUser.uid) {
      await setUserOffline(currentUser.uid);
    }
    // Clear local storage and sign out
    localStorage.clear();
    await signOut(auth);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    let currentErrors = {};
    let formIsValid = true;

    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      setError(`${t('PasswordsMismatchError')}`);
    }

    if (
      formData.password == null ||
      formData.confirmPassword == null ||
      formData.password == "" ||
      formData.confirmPassword == ""
    ) {
      formIsValid = false;
      setError(`${t('FieldsEmptyError')}`);
    }

    if (0 < formData.password <= 6 || 0 < formData.confirmPassword <= 6) {
      formIsValid = false;
      setError(`${t('PasswordLengthError')}`);
    }

    try {
      // Update Firebase Auth password if provided
      if (formData.password && formIsValid) {
        try {
          await updatePassword(currentUser, formData.password);
          setSuccess("Account information updated successfully.");
          setEditMode(false);
          handleSignOut();
        } catch (error) {
          setError(
            `${t('PasswordChangeError')}`
          );
          console.error(error);
        }
      }
    } catch (error) {
      setError(`${t('AccountUpdateError')}`);
      console.error(error);
    }
  };

  const formField = (
    name,
    label,
    type = "text",
    isCheckbox = false,
    disabled = true
  ) => (
    <div className="col-sm-12 mb-2">
      <label
        htmlFor={name}
        className={`form-label${isCheckbox ? " form-check-label" : ""}`}
      >
        {label}:
      </label>
      <input
        type={type}
        className={`form-control${isCheckbox ? " form-check-input" : ""}`}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );

  return (
    <>
      <div className="d-flex align-items-center px-2">
        <h4>{t('ChangePassword')}</h4>
        <div className="ms-auto">
          {!editMode && (
            <button type="button" className="btn settings-cancel-button " onClick={handleEdit}>
              {t('Edit')}
            </button>
          )}
        </div>
      </div>
      <form className="settings-form p-3 rounded-3" onSubmit={handleSubmit}>
        <div className="row ">
          {formField("password", `${t('PasswordLabel')}`, "password", false, !editMode)}
          {formField(
            "confirmPassword",
            `${t('ConfirmPasswordLabel')}`,
            "password",
            false,
            !editMode
          )}
        </div>
        <div className="d-flex my-2 justify-content-between align-items-center" style={{minHeight: "50px"}}>
        <div className="">
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </div>
          <div className="">
            {editMode && (
              <>
                <button type="submit" className="btn account-button-style btn-raised rounded-pill">
                {t('SaveChanges')}
                </button>
                <button
                  type="button"
                  className="btn settings-cancel-button"
                  onClick={handleCancel}
                >
                  {t('Cancel')}
                </button>
              </>
            )}
          </div>
          
        </div>
      </form>
      
    </>
  );
};

export default SettingsEditAccountInfo;
