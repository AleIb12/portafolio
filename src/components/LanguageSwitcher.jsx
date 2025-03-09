import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Componente para cambiar entre idiomas con efectos de Magic UI
const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
    // Guardar preferencia de idioma
    localStorage.setItem('preferredLanguage', code);
  };

  // Efecto para cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-button"
        aria-label={t('languageSwitcher.selectLanguage')}
        aria-expanded={isOpen}
      >
        <span className="language-flag">{currentLanguage.flag}</span>
        <span className="language-name">{currentLanguage.name}</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          <div className="language-menu">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`language-option ${i18n.language === language.code ? 'active' : ''}`}
                onClick={() => changeLanguage(language.code)}
              >
                <span className="language-flag">{language.flag}</span>
                <span className="language-option-name">{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;