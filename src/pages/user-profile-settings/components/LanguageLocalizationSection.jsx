import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const LanguageLocalizationSection = ({ localizationSettings, onUpdateLocalization }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSettings, setLocalSettings] = useState(localizationSettings);

  const languageOptions = [
    { value: 'fr', label: 'Français (France)' },
    { value: 'en', label: 'English (United States)' },
    { value: 'es', label: 'Español (España)' },
    { value: 'de', label: 'Deutsch (Deutschland)' },
    { value: 'it', label: 'Italiano (Italia)' },
    { value: 'pt', label: 'Português (Brasil)' }
  ];

  const currencyOptions = [
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'USD', label: 'Dollar américain ($)' },
    { value: 'GBP', label: 'Livre sterling (£)' },
    { value: 'CAD', label: 'Dollar canadien (C$)' },
    { value: 'AUD', label: 'Dollar australien (A$)' }
  ];

  const timezoneOptions = [
    { value: 'Europe/Paris', label: 'Europe/Paris (CET/CEST)' },
    { value: 'Europe/London', label: 'Europe/London (GMT/BST)' },
    { value: 'America/New_York', label: 'America/New_York (EST/EDT)' },
    { value: 'America/Los_Angeles', label: 'America/Los_Angeles (PST/PDT)' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' }
  ];

  const dateFormatOptions = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (31/12/2024)' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (12/31/2024)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2024-12-31)' },
    { value: 'DD.MM.YYYY', label: 'DD.MM.YYYY (31.12.2024)' }
  ];

  const numberFormatOptions = [
    { value: 'european', label: 'Européen (1.234,56)' },
    { value: 'american', label: 'Américain (1,234.56)' },
    { value: 'swiss', label: 'Suisse (1\'234.56)' }
  ];

  const regionOptions = [
    { value: 'EU', label: 'Union Européenne' },
    { value: 'US', label: 'États-Unis' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'Royaume-Uni' },
    { value: 'AU', label: 'Australie' }
  ];

  const handleSettingChange = (key, value) => {
    const updatedSettings = {
      ...localSettings,
      [key]: value
    };
    setLocalSettings(updatedSettings);
  };

  const handleSaveSettings = () => {
    onUpdateLocalization(localSettings);
    // Update localStorage for immediate effect
    localStorage.setItem('userLanguage', localSettings?.language);
    localStorage.setItem('userCurrency', localSettings?.currency);
    localStorage.setItem('userTimezone', localSettings?.timezone);
  };

  const handleResetToDefaults = () => {
    const defaultSettings = {
      language: 'fr',
      currency: 'EUR',
      timezone: 'Europe/Paris',
      dateFormat: 'DD/MM/YYYY',
      numberFormat: 'european',
      region: 'EU',
      rtlSupport: false,
      autoDetectLocation: true,
      showLocalizedContent: true,
      complianceRegion: 'EU'
    };
    setLocalSettings(defaultSettings);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const timeZone = localSettings?.timezone || 'Europe/Paris';
    return now?.toLocaleString('fr-FR', { 
      timeZone,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatSampleNumber = (number) => {
    switch (localSettings?.numberFormat) {
      case 'american':
        return number?.toLocaleString('en-US');
      case 'swiss':
        return number?.toLocaleString('de-CH');
      default:
        return number?.toLocaleString('fr-FR');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-micro rounded-t-lg"
      >
        <div className="flex items-center">
          <Icon name="Globe" size={24} className="mr-3 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Langue & Localisation</h2>
            <p className="text-sm text-muted-foreground">
              Langue: {languageOptions?.find(l => l?.value === localSettings?.language)?.label} • 
              Devise: {localSettings?.currency}
            </p>
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-border">
          {/* Language & Region */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Languages" size={20} className="mr-2 text-primary" />
              Langue et Région
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Langue de l'interface"
                options={languageOptions}
                value={localSettings?.language}
                onChange={(value) => handleSettingChange('language', value)}
                description="Langue utilisée dans l'application"
              />

              <Select
                label="Région"
                options={regionOptions}
                value={localSettings?.region}
                onChange={(value) => handleSettingChange('region', value)}
                description="Région pour la conformité légale"
              />
            </div>

            {/* Language Preview */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Aperçu de la langue:</p>
              <div className="space-y-1">
                <p className="text-sm text-foreground">
                  {localSettings?.language === 'fr' ? 'Bienvenue dans TeeShirt Designer Pro' :
                   localSettings?.language === 'en' ? 'Welcome to TeeShirt Designer Pro' :
                   localSettings?.language === 'es' ? 'Bienvenido a TeeShirt Designer Pro' :
                   localSettings?.language === 'de' ? 'Willkommen bei TeeShirt Designer Pro' :
                   localSettings?.language === 'it'? 'Benvenuto in TeeShirt Designer Pro' : 'Bem-vindo ao TeeShirt Designer Pro'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {localSettings?.language === 'fr' ? 'Créez des designs exceptionnels' :
                   localSettings?.language === 'en' ? 'Create exceptional designs' :
                   localSettings?.language === 'es' ? 'Crea diseños excepcionales' :
                   localSettings?.language === 'de' ? 'Erstellen Sie außergewöhnliche Designs' :
                   localSettings?.language === 'it'? 'Crea design eccezionali' : 'Crie designs excepcionais'}
                </p>
              </div>
            </div>
          </div>

          {/* Currency & Formatting */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="DollarSign" size={20} className="mr-2 text-primary" />
              Devise et Formatage
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Devise"
                options={currencyOptions}
                value={localSettings?.currency}
                onChange={(value) => handleSettingChange('currency', value)}
                description="Devise utilisée pour les prix"
              />

              <Select
                label="Format des nombres"
                options={numberFormatOptions}
                value={localSettings?.numberFormat}
                onChange={(value) => handleSettingChange('numberFormat', value)}
                description="Format d'affichage des nombres"
              />
            </div>

            {/* Currency Preview */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Aperçu du formatage:</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Prix:</p>
                  <p className="text-foreground font-medium">
                    {localSettings?.currency === 'EUR' ? '29,99 €' :
                     localSettings?.currency === 'USD' ? '$29.99' :
                     localSettings?.currency === 'GBP' ? '£29.99' :
                     localSettings?.currency === 'CAD'? 'C$29.99' : 'A$29.99'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Nombre:</p>
                  <p className="text-foreground font-medium">{formatSampleNumber(1234.56)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Calendar" size={20} className="mr-2 text-primary" />
              Date et Heure
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Fuseau horaire"
                options={timezoneOptions}
                value={localSettings?.timezone}
                onChange={(value) => handleSettingChange('timezone', value)}
                description="Fuseau horaire pour l'affichage"
              />

              <Select
                label="Format de date"
                options={dateFormatOptions}
                value={localSettings?.dateFormat}
                onChange={(value) => handleSettingChange('dateFormat', value)}
                description="Format d'affichage des dates"
              />
            </div>

            {/* Time Preview */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Heure actuelle:</p>
              <p className="text-lg font-semibold text-primary">{getCurrentTime()}</p>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Settings" size={20} className="mr-2 text-primary" />
              Options Avancées
            </h3>
            
            <div className="space-y-4">
              <Checkbox
                label="Détection automatique de la localisation"
                description="Détecter automatiquement votre région et ajuster les paramètres"
                checked={localSettings?.autoDetectLocation}
                onChange={(e) => handleSettingChange('autoDetectLocation', e?.target?.checked)}
              />

              <Checkbox
                label="Contenu localisé"
                description="Afficher du contenu adapté à votre région"
                checked={localSettings?.showLocalizedContent}
                onChange={(e) => handleSettingChange('showLocalizedContent', e?.target?.checked)}
              />

              <Checkbox
                label="Support RTL (droite à gauche)"
                description="Activer le support pour les langues RTL comme l'arabe"
                checked={localSettings?.rtlSupport}
                onChange={(e) => handleSettingChange('rtlSupport', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Compliance Region */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Shield" size={20} className="mr-2 text-primary" />
              Conformité Régionale
            </h3>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Région de conformité actuelle:</p>
              <div className="flex items-center">
                <Icon name="MapPin" size={16} className="mr-2 text-primary" />
                <span className="text-sm text-foreground">
                  {localSettings?.region === 'EU' ? 'Union Européenne (RGPD)' :
                   localSettings?.region === 'US' ? 'États-Unis (CCPA)' :
                   localSettings?.region === 'CA' ? 'Canada (PIPEDA)' :
                   localSettings?.region === 'UK' ? 'Royaume-Uni (UK GDPR)' :
                   'Australie (Privacy Act)'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Les paramètres de confidentialité et de conformité sont adaptés à cette région
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              iconName="Save"
              iconPosition="left"
              onClick={handleSaveSettings}
            >
              Enregistrer les paramètres
            </Button>
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={handleResetToDefaults}
            >
              Réinitialiser par défaut
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageLocalizationSection;