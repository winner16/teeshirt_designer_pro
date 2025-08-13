import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import ProfileSection from './components/ProfileSection';
import AccountSecuritySection from './components/AccountSecuritySection';
import DesignPreferencesSection from './components/DesignPreferencesSection';
import AmazonIntegrationSection from './components/AmazonIntegrationSection';
import NotificationSettingsSection from './components/NotificationSettingsSection';
import BillingSubscriptionSection from './components/BillingSubscriptionSection';
import LanguageLocalizationSection from './components/LanguageLocalizationSection';

const UserProfileSettings = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mock user profile data
  const [userProfile, setUserProfile] = useState({
    name: "Marie Dubois",
    email: "marie.dubois@example.com",
    bio: `Designer graphique passionnée avec plus de 5 ans d'expérience dans la création de designs pour l'impression à la demande.\n\nSpécialisée dans les designs minimalistes et typographiques, j'aime créer des visuels qui racontent une histoire et touchent les émotions.`,
    location: "Paris, France",
    website: "https://marie-designs.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    accountType: "Professionnel",
    memberSince: "Mars 2023"
  });

  // Mock security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    lastPasswordChange: "15 novembre 2024",
    recentActivity: [
      {
        device: "desktop",
        browser: "Chrome 120",
        location: "Paris, France",
        date: "12/12/2024",
        time: "14:30"
      },
      {
        device: "mobile",
        browser: "Safari Mobile",
        location: "Lyon, France",
        date: "10/12/2024",
        time: "09:15"
      },
      {
        device: "desktop",
        browser: "Firefox 121",
        location: "Paris, France",
        date: "08/12/2024",
        time: "16:45"
      }
    ]
  });

  // Mock design preferences
  const [designPreferences, setDesignPreferences] = useState({
    defaultCanvasSize: '1080x1080',
    defaultColorPalette: 'vibrant',
    defaultFontFamily: 'inter',
    preferredTemplateCategories: ['minimalist', 'modern'],
    autoSaveEnabled: true,
    gridSnapEnabled: true,
    showRulers: true,
    highQualityPreview: true
  });

  // Mock Amazon integration settings
  const [amazonSettings, setAmazonSettings] = useState({
    isConnected: true,
    accountInfo: {
      sellerId: 'A1B2C3D4E5F6G7',
      marketplaces: ['Amazon.fr', 'Amazon.de', 'Amazon.es'],
      status: 'Actif'
    },
    complianceChecks: {
      textReadable: true,
      copyrightFree: true,
      sizeRequirements: true,
      qualityStandards: false
    },
    defaultExportFormat: 'png',
    autoExport: false,
    amazonOptimization: true
  });

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    design: {
      designApproved: true,
      designRejected: true,
      designSold: true
    },
    account: {
      securityAlert: true,
      subscriptionUpdate: true,
      profileUpdate: false
    },
    platform: {
      newFeatures: true,
      maintenance: true,
      tips: false
    },
    marketing: {
      newsletter: true,
      promotions: false,
      surveys: false
    },
    deliveryMethods: {
      email: true,
      push: true,
      sms: false
    },
    dailyDigest: true,
    instantNotifications: true
  });

  // Mock billing information
  const [billingInfo, setBillingInfo] = useState({
    currentPlan: 'pro',
    nextBilling: '01/01/2025',
    amount: '29.99',
    currency: 'EUR'
  });

  // Mock localization settings
  const [localizationSettings, setLocalizationSettings] = useState({
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
  });

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('userLanguage') || 'fr';
    setCurrentLanguage(savedLanguage);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(prev => ({
      ...prev,
      ...updatedProfile
    }));
    
    // Show success message
    setTimeout(() => {
      alert('Profil mis à jour avec succès !');
    }, 500);
  };

  const handleUpdateSecurity = (securityUpdate) => {
    if (securityUpdate?.type === 'password') {
      // Mock password validation
      if (securityUpdate?.data?.currentPassword !== 'motdepasse123') {
        alert('Mot de passe actuel incorrect');
        return;
      }
      
      setSecuritySettings(prev => ({
        ...prev,
        lastPasswordChange: new Date()?.toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      }));
      
      alert('Mot de passe mis à jour avec succès !');
    } else if (securityUpdate?.type === 'twoFactor') {
      setSecuritySettings(prev => ({
        ...prev,
        twoFactorEnabled: securityUpdate?.data?.enabled
      }));
      
      alert(securityUpdate?.data?.enabled ? 
        'Authentification à deux facteurs activée !' : 
        'Authentification à deux facteurs désactivée !'
      );
    }
  };

  const handleUpdatePreferences = (updatedPreferences) => {
    setDesignPreferences(updatedPreferences);
    alert('Préférences de design enregistrées !');
  };

  const handleUpdateAmazonSettings = (updatedSettings) => {
    setAmazonSettings(prev => ({
      ...prev,
      ...updatedSettings
    }));
    alert('Paramètres Amazon mis à jour !');
  };

  const handleUpdateNotifications = (updatedNotifications) => {
    setNotificationSettings(updatedNotifications);
    alert('Préférences de notification enregistrées !');
  };

  const handleUpdateBilling = (billingUpdate) => {
    if (billingUpdate?.type === 'planChange') {
      alert(`Changement de plan vers ${billingUpdate?.planId} initié !`);
    }
  };

  const handleUpdateLocalization = (updatedLocalization) => {
    setLocalizationSettings(updatedLocalization);
    setCurrentLanguage(updatedLocalization?.language);
    alert('Paramètres de localisation mis à jour !');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader onToggleCollapse={handleToggleCollapse} />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement des paramètres...</p>
          </div>
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Profil & Paramètres - TeeShirt Designer Pro</title>
        <meta name="description" content="Gérez votre profil utilisateur, paramètres de sécurité, préférences de design et intégrations pour TeeShirt Designer Pro." />
        <meta name="keywords" content="profil utilisateur, paramètres, sécurité, design, Amazon Merch, notifications, facturation" />
      </Helmet>
      <GlobalHeader onToggleCollapse={handleToggleCollapse} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Profil & Paramètres
          </h1>
          <p className="text-muted-foreground">
            Gérez votre compte, personnalisez votre expérience et configurez vos intégrations
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          <ProfileSection 
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />

          <AccountSecuritySection 
            securitySettings={securitySettings}
            onUpdateSecurity={handleUpdateSecurity}
          />

          <DesignPreferencesSection 
            preferences={designPreferences}
            onUpdatePreferences={handleUpdatePreferences}
          />

          <AmazonIntegrationSection 
            amazonSettings={amazonSettings}
            onUpdateAmazonSettings={handleUpdateAmazonSettings}
          />

          <NotificationSettingsSection 
            notificationSettings={notificationSettings}
            onUpdateNotifications={handleUpdateNotifications}
          />

          <BillingSubscriptionSection 
            billingInfo={billingInfo}
            onUpdateBilling={handleUpdateBilling}
          />

          <LanguageLocalizationSection 
            localizationSettings={localizationSettings}
            onUpdateLocalization={handleUpdateLocalization}
          />
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Besoin d'aide ? Consultez notre{' '}
              <button 
                className="text-primary hover:underline"
                onClick={() => window.open('/help', '_blank')}
              >
                centre d'aide
              </button>
              {' '}ou{' '}
              <button 
                className="text-primary hover:underline"
                onClick={() => window.open('/contact', '_blank')}
              >
                contactez le support
              </button>
            </p>
            <p className="text-xs text-muted-foreground">
              Dernière mise à jour des paramètres: {new Date()?.toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </main>
      <MobileBottomNav />
      {/* Bottom Spacing for Mobile */}
      <div className="h-20 lg:h-0" />
    </div>
  );
};

export default UserProfileSettings;