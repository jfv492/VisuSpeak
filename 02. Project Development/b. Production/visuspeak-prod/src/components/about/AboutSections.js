import React from "react";
import { useTranslation } from 'react-i18next';
import '../../App.css';

const AboutSections = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="row about-us-sections align-items-center ">
        <div className="col-sm-4">
          <iframe
            src="https://www.youtube.com/embed/hrNCJlUDN3A?&rel=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', aspectRatio: '16 / 9', borderRadius: '15px' }}
          ></iframe>
        </div>
        <div className="col-sm-8 lead">
          <h3 className="about-us-headers border-bottom pb-2">{t('Project Idea')}</h3>
          {t('Project Idea Description')}
        </div>
      </div>
      <hr />
      <div className="row about-us-sections align-items-center row-reverse rounded-4">
        <div className="col-sm-4">
          <iframe
            src="https://www.youtube.com/embed/mMeU9zoFOsM?&rel=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', aspectRatio: '16 / 9', borderRadius: '15px' }}
          ></iframe>
        </div>
        <div className="col-sm-8 lead">
          <h3 className="about-us-headers border-bottom pb-2">
            {t('Project Background')}
          </h3>
          {t('Project Background Description')}
        </div>
      </div>
      <hr />
      <div className="row about-us-sections align-items-center">
        <div className="col-sm-4">
          <iframe
            src="https://www.youtube.com/embed/wHkPcFh8ni0?&rel=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', aspectRatio: '16 / 9', borderRadius: '15px' }}
          ></iframe>
        </div>
        <div className="col-sm-8 lead">
          <h3 className="about-us-headers border-bottom pb-2"> {t('About VisuSpeak')}</h3>
          {t('About VisuSpeak Description')}
        </div>
      </div>
    </div>
  );
};

export default AboutSections;
