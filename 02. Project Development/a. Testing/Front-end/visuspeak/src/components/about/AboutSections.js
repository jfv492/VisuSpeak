import React from "react";
import Hands from "../../assets/images/Hands.jpg";
import ConversationImage from "../../assets/images/Conversation.jpg";
import { useTranslation } from 'react-i18next';

const AboutSections = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div class="row about-us-sections align-items-center ">
        <div class="col-sm-4">
          <img
            src={Hands}
            className="rounded-4 mx-auto d-block"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div class="col-sm-8 lead">
          <h3 class="about-us-headers border-bottom pb-2">{t('Project Idea')}</h3>
          {t('Project Idea Description')}
        </div>
      </div>
      <hr />
      <div class="row about-us-sections align-items-center row-reverse rounded-4">
        <div class="col-sm-4">
          <img
            src={ConversationImage}
            className="rounded-4 mx-auto d-block"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div class="col-sm-8 lead">
          <h3 class="about-us-headers border-bottom pb-2">
          {t('Project Background')}
          </h3>
          {t('Project Background Description')}
        </div>
      </div>
      <hr />
      <div class="row about-us-sections align-items-center">
        <div class="col-sm-4">
          <img
            src={Hands}
            className="rounded-4 mx-auto d-block"
            alt="..."
            width="100%"
            style={{ justifyContent: "end" }}
          />
        </div>
        <div class="col-sm-8 lead">
          <h3 class="about-us-headers border-bottom pb-2"> {t('About VisuSpeak')}</h3>
          {t('About VisuSpeak Description')}
        </div>
      </div>
    </div>
  );
};

export default AboutSections;
