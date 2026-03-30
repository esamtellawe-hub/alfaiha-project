import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const LanguageContext = createContext();

// Create a custom hook to use the context
export const useLanguage = () => {
  return useContext(LanguageContext);
};

// Create the provider component
export const LanguageProvider = ({ children }) => {
  // Load language from localStorage or default to 'en'
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('site_lang') || 'en';
  });

  // Whenever language changes, update localStorage and document direction
  useEffect(() => {
    localStorage.setItem('site_lang', language);
    
    // Set document direction based on language
    if (language === 'ar') {
      document.dir = 'rtl';
      document.documentElement.lang = 'ar';
      // Add a class for potential CSS styling based on RTL
      document.body.classList.add('rtl-layout');
      document.body.classList.remove('ltr-layout');
    } else {
      document.dir = 'ltr';
      document.documentElement.lang = language;
      document.body.classList.add('ltr-layout');
      document.body.classList.remove('rtl-layout');
    }
  }, [language]);

  const setLanguage = (lang) => {
    if (['en', 'ar', 'fr'].includes(lang)) {
      setLanguageState(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
