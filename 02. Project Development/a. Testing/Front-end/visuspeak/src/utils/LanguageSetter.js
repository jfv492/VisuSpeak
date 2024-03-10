import React, { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext'; // Adjust this path
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust this path

const LanguageSetter = () => {
  const { i18n } = useTranslation();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const setLanguage = async () => {
      if (currentUser?.uid) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const primaryLanguage = userData.primaryLanguage;
          if (primaryLanguage) {
            if  (primaryLanguage === "English") {
                i18n.changeLanguage("en");
            } else if (primaryLanguage === "French") {
                i18n.changeLanguage("fr");
            }
            
          }
        }
      }
    };

    setLanguage();
  }, [currentUser, i18n]);

  // ... your component code

  return null; // This component does not render anything
};

export default LanguageSetter;
