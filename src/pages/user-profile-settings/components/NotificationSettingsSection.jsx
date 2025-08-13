import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSettingsSection = ({ notificationSettings, onUpdateNotifications }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSettings, setLocalSettings] = useState(notificationSettings);

  const notificationCategories = [
    {
      id: 'design',
      title: 'Notifications de Design',
      icon: 'Palette',
      settings: [
        {
          key: 'designApproved',
          label: 'Design approuvé',
          description: 'Quand un design est approuvé sur Amazon',
          enabled: localSettings?.design?.designApproved || false
        },
        {
          key: 'designRejected',
          label: 'Design rejeté',
          description: 'Quand un design est rejeté avec les raisons',
          enabled: localSettings?.design?.designRejected || false
        },
        {
          key: 'designSold',
          label: 'Vente de design',
          description: 'Quand un de vos designs est vendu',
          enabled: localSettings?.design?.designSold || false
        }
      ]
    },
    {
      id: 'account',
      title: 'Notifications de Compte',
      icon: 'User',
      settings: [
        {
          key: 'securityAlert',
          label: 'Alertes de sécurité',
          description: 'Connexions suspectes et changements de sécurité',
          enabled: localSettings?.account?.securityAlert || false
        },
        {
          key: 'subscriptionUpdate',
          label: 'Mises à jour d\'abonnement',
          description: 'Changements de plan et facturation',
          enabled: localSettings?.account?.subscriptionUpdate || false
        },
        {
          key: 'profileUpdate',
          label: 'Modifications de profil',
          description: 'Confirmations de changements de profil',
          enabled: localSettings?.account?.profileUpdate || false
        }
      ]
    },
    {
      id: 'platform',
      title: 'Notifications de Plateforme',
      icon: 'Bell',
      settings: [
        {
          key: 'newFeatures',
          label: 'Nouvelles fonctionnalités',
          description: 'Annonces de nouvelles fonctionnalités',
          enabled: localSettings?.platform?.newFeatures || false
        },
        {
          key: 'maintenance',
          label: 'Maintenance planifiée',
          description: 'Notifications de maintenance du système',
          enabled: localSettings?.platform?.maintenance || false
        },
        {
          key: 'tips',
          label: 'Conseils et astuces',
          description: 'Conseils pour améliorer vos designs',
          enabled: localSettings?.platform?.tips || false
        }
      ]
    },
    {
      id: 'marketing',
      title: 'Communications Marketing',
      icon: 'Mail',
      settings: [
        {
          key: 'newsletter',
          label: 'Newsletter',
          description: 'Newsletter mensuelle avec tendances et conseils',
          enabled: localSettings?.marketing?.newsletter || false
        },
        {
          key: 'promotions',
          label: 'Offres promotionnelles',
          description: 'Offres spéciales et réductions',
          enabled: localSettings?.marketing?.promotions || false
        },
        {
          key: 'surveys',
          label: 'Enquêtes utilisateur',
          description: 'Invitations à participer aux enquêtes',
          enabled: localSettings?.marketing?.surveys || false
        }
      ]
    }
  ];

  const deliveryMethods = [
    {
      key: 'email',
      label: 'Email',
      icon: 'Mail',
      enabled: localSettings?.deliveryMethods?.email || false,
      description: 'Recevoir les notifications par email'
    },
    {
      key: 'push',
      label: 'Notifications push',
      icon: 'Smartphone',
      enabled: localSettings?.deliveryMethods?.push || false,
      description: 'Notifications dans le navigateur'
    },
    {
      key: 'sms',
      label: 'SMS',
      icon: 'MessageSquare',
      enabled: localSettings?.deliveryMethods?.sms || false,
      description: 'Messages texte pour les alertes importantes'
    }
  ];

  const handleCategorySettingChange = (categoryId, settingKey, enabled) => {
    const updatedSettings = {
      ...localSettings,
      [categoryId]: {
        ...localSettings?.[categoryId],
        [settingKey]: enabled
      }
    };
    setLocalSettings(updatedSettings);
  };

  const handleDeliveryMethodChange = (methodKey, enabled) => {
    const updatedSettings = {
      ...localSettings,
      deliveryMethods: {
        ...localSettings?.deliveryMethods,
        [methodKey]: enabled
      }
    };
    setLocalSettings(updatedSettings);
  };

  const handleSaveSettings = () => {
    onUpdateNotifications(localSettings);
  };

  const handleEnableAll = () => {
    const allEnabledSettings = { ...localSettings };
    
    notificationCategories?.forEach(category => {
      allEnabledSettings[category.id] = {};
      category?.settings?.forEach(setting => {
        allEnabledSettings[category.id][setting.key] = true;
      });
    });

    deliveryMethods?.forEach(method => {
      if (!allEnabledSettings?.deliveryMethods) {
        allEnabledSettings.deliveryMethods = {};
      }
      allEnabledSettings.deliveryMethods[method.key] = true;
    });

    setLocalSettings(allEnabledSettings);
  };

  const handleDisableAll = () => {
    const allDisabledSettings = { ...localSettings };
    
    notificationCategories?.forEach(category => {
      allDisabledSettings[category.id] = {};
      category?.settings?.forEach(setting => {
        allDisabledSettings[category.id][setting.key] = false;
      });
    });

    deliveryMethods?.forEach(method => {
      if (!allDisabledSettings?.deliveryMethods) {
        allDisabledSettings.deliveryMethods = {};
      }
      allDisabledSettings.deliveryMethods[method.key] = false;
    });

    setLocalSettings(allDisabledSettings);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-micro rounded-t-lg"
      >
        <div className="flex items-center">
          <Icon name="Bell" size={24} className="mr-3 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            <p className="text-sm text-muted-foreground">Gérez vos préférences de notification</p>
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
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Check"
              iconPosition="left"
              onClick={handleEnableAll}
            >
              Tout activer
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={handleDisableAll}
            >
              Tout désactiver
            </Button>
          </div>

          {/* Delivery Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Send" size={20} className="mr-2 text-primary" />
              Méthodes de Livraison
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deliveryMethods?.map((method) => (
                <div key={method?.key} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={method?.enabled}
                      onChange={(e) => handleDeliveryMethodChange(method?.key, e?.target?.checked)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <Icon name={method?.icon} size={16} className="mr-2 text-primary" />
                        <h4 className="text-sm font-medium text-foreground">{method?.label}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">{method?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Categories */}
          <div className="space-y-6">
            {notificationCategories?.map((category) => (
              <div key={category?.id} className="space-y-4">
                <h3 className="text-lg font-medium text-foreground flex items-center">
                  <Icon name={category?.icon} size={20} className="mr-2 text-primary" />
                  {category?.title}
                </h3>
                
                <div className="space-y-3">
                  {category?.settings?.map((setting) => (
                    <div key={setting?.key} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <Checkbox
                        checked={setting?.enabled}
                        onChange={(e) => handleCategorySettingChange(category?.id, setting?.key, e?.target?.checked)}
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-foreground">{setting?.label}</h4>
                        <p className="text-xs text-muted-foreground">{setting?.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Notification Frequency */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Clock" size={20} className="mr-2 text-primary" />
              Fréquence des Notifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-2">Résumé quotidien</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Recevoir un résumé quotidien de l'activité
                </p>
                <Checkbox
                  label="Activer le résumé quotidien"
                  checked={localSettings?.dailyDigest || false}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, dailyDigest: e?.target?.checked }))}
                />
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-2">Notifications instantanées</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Recevoir les notifications importantes immédiatement
                </p>
                <Checkbox
                  label="Notifications instantanées"
                  checked={localSettings?.instantNotifications || false}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, instantNotifications: e?.target?.checked }))}
                />
              </div>
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
              Enregistrer les préférences
            </Button>
            <Button
              variant="outline"
              iconName="TestTube"
              iconPosition="left"
              onClick={() => {
                // Simulate test notification
                alert('Notification de test envoyée ! Vérifiez votre email.');
              }}
            >
              Envoyer une notification de test
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettingsSection;