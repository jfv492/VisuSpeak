import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ResourceImage1 from "../assets/images/Dictionary.png";
import ResourceImage2 from "../assets/images/ASLClasses.png";
import ResourceImage3 from "../assets/images/ASLNews.png"; 

export default function Resources() {
  const { t } = useTranslation();
  let navigate = useNavigate();

  const navigateToDict = () => {
    navigate("/asldictionary")
  }
  return (
    <div className="container my-5">
      <h1 className="">{t("Resources")}</h1>
      
      {/* First Section with Image on the left */}
      <div className="row about-us-sections align-items-center">
        <div className="col-sm-4">
          <img
            src={ResourceImage1}
            className="rounded-4 mx-auto d-block"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div className="col-sm-8 lead">
          <h3 className="about-us-headers border-bottom pb-2">{t("ASLDictionary")}</h3>
          <p>{t("ASLDictionaryDescription")}</p>
          <button onClick={navigateToDict} className="btn form-button-style btn-raised rounded-pill ms-auto" role="button">
          {t("ViewDictionary")}
          </button>
        </div>
      </div>
      <hr />
      
      {/* Second Section with Image on the right */}
      <div className="row about-us-sections align-items-center row-reverse rounded-4">
        <div className="col-sm-4 ">
          <img
            src={ResourceImage2}
            className="rounded-4 mx-auto d-block"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div className="col-sm-8 lead order-sm-1">
          <h3 className="about-us-headers border-bottom pb-2 ">{t("LearnASLProfessionally")}</h3>
          <p>{t("LearnASLProfessionallyDescription")}</p>
          <Link to="https://sdhhs.com/2020/12/09/american-sign-language-classes/" className="btn form-button-style btn-raised rounded-pill ms-auto" role="button">
          {t("ViewResource")}
          </Link>
        </div>
      </div>
      <hr />

      {/* Repeat for other sections as needed */}
      <div className="row about-us-sections align-items-center">
        <div className="col-sm-4">
          <img
            src={ResourceImage3}
            className="rounded-4 mx-auto d-block"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div className="col-sm-8 lead">
          <h3 className="about-us-headers border-bottom pb-2">{t("NationalDeafNews")}</h3>
          <p>{t("NationalDeafNewsDescription")}</p>
          <Link to="https://cad-asc.ca/" className="btn form-button-style btn-raised rounded-pill ms-auto" role="button">
          {t("ViewResource")}
          </Link>
        </div>
      </div>
      
    </div>
  );
}
