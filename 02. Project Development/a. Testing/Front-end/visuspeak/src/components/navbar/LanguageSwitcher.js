import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  // Use state to track the current language
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Update state when i18n.language changes
  useEffect(() => {
    const languageChangeHandler = (lng) => setCurrentLanguage(lng);
    
    // Listening for language changed events from i18next
    i18n.on('languageChanged', languageChangeHandler);

    // Cleanup listener when component unmounts
    return () => {
      i18n.off('languageChanged', languageChangeHandler);
    };
  }, [i18n]);

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className='ms-2'>
      <select className="form-select" onChange={handleLanguageChange} value={currentLanguage}>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
