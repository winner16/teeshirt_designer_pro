import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationHeader = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
  ];

  const handleLogoClick = () => {
    navigate('/main-dashboard');
  };

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
  };

  const handleLoginRedirect = () => {
    navigate('/user-login');
  };

  return (
    <header className="w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 transition-micro hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
            aria-label="TeeShirt Designer Pro - Retour à l'accueil"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg shadow-elevation-1">
              <Icon name="Shirt" size={24} color="white" strokeWidth={2} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-foreground">
                TeeShirt Designer Pro
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Créateur professionnel
              </p>
            </div>
          </button>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-micro hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring">
                <span className="text-lg">
                  {languages?.find(lang => lang?.code === currentLanguage)?.flag}
                </span>
                <span className="hidden sm:block text-sm font-medium text-foreground">
                  {languages?.find(lang => lang?.code === currentLanguage)?.label}
                </span>
                <Icon name="ChevronDown" size={16} color="currentColor" />
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {languages?.map((language) => (
                    <button
                      key={language?.code}
                      onClick={() => handleLanguageChange(language?.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-micro hover:bg-muted ${
                        currentLanguage === language?.code ? 'bg-muted text-primary' : 'text-popover-foreground'
                      }`}
                    >
                      <span className="text-lg">{language?.flag}</span>
                      <span className="text-sm font-medium">{language?.label}</span>
                      {currentLanguage === language?.code && (
                        <Icon name="Check" size={16} color="currentColor" className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Login Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoginRedirect}
              iconName="LogIn"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Se Connecter
            </Button>

            {/* Mobile Login Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleLoginRedirect}
              className="sm:hidden"
              aria-label="Se connecter"
            >
              <Icon name="LogIn" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RegistrationHeader;