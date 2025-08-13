import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AmazonIntegrationSection = ({ amazonSettings, onUpdateAmazonSettings }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionData, setConnectionData] = useState({
    apiKey: '',
    secretKey: '',
    region: 'eu-west-1'
  });
  const [localSettings, setLocalSettings] = useState(amazonSettings);

  const regionOptions = [
    { value: 'us-east-1', label: 'États-Unis (Virginie du Nord)' },
    { value: 'us-west-2', label: 'États-Unis (Oregon)' },
    { value: 'eu-west-1', label: 'Europe (Irlande)' },
    { value: 'eu-central-1', label: 'Europe (Francfort)' },
    { value: 'ap-northeast-1', label: 'Asie-Pacifique (Tokyo)' }
  ];

  const exportFormatOptions = [
    { value: 'png', label: 'PNG (Haute qualité)' },
    { value: 'jpg', label: 'JPEG (Optimisé)' },
    { value: 'pdf', label: 'PDF (Vectoriel)' },
    { value: 'svg', label: 'SVG (Scalable)' }
  ];

  const complianceRules = [
    {
      id: 'text-readable',
      label: 'Texte lisible',
      description: 'Vérifier que le texte est suffisamment grand et contrasté',
      enabled: localSettings?.complianceChecks?.textReadable || false
    },
    {
      id: 'copyright-free',
      label: 'Contenu libre de droits',
      description: 'S\'assurer qu\'aucun contenu protégé n\'est utilisé',
      enabled: localSettings?.complianceChecks?.copyrightFree || false
    },
    {
      id: 'size-requirements',
      label: 'Exigences de taille',
      description: 'Respecter les dimensions minimales requises',
      enabled: localSettings?.complianceChecks?.sizeRequirements || false
    },
    {
      id: 'quality-standards',
      label: 'Standards de qualité',
      description: 'Maintenir une résolution et qualité appropriées',
      enabled: localSettings?.complianceChecks?.qualityStandards || false
    }
  ];

  const handleConnectionSubmit = () => {
    setIsConnecting(true);
    // Simulate API connection
    setTimeout(() => {
      onUpdateAmazonSettings({
        ...localSettings,
        isConnected: true,
        accountInfo: {
          sellerId: 'A1B2C3D4E5F6G7',
          marketplaces: ['Amazon.fr', 'Amazon.de', 'Amazon.es'],
          status: 'Actif'
        }
      });
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    onUpdateAmazonSettings({
      ...localSettings,
      isConnected: false,
      accountInfo: null
    });
  };

  const handleComplianceToggle = (ruleId, enabled) => {
    const updatedSettings = {
      ...localSettings,
      complianceChecks: {
        ...localSettings?.complianceChecks,
        [ruleId]: enabled
      }
    };
    setLocalSettings(updatedSettings);
  };

  const handleSettingChange = (key, value) => {
    const updatedSettings = {
      ...localSettings,
      [key]: value
    };
    setLocalSettings(updatedSettings);
  };

  const handleSaveSettings = () => {
    onUpdateAmazonSettings(localSettings);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-micro rounded-t-lg"
      >
        <div className="flex items-center">
          <Icon name="Package" size={24} className="mr-3 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Intégration Amazon</h2>
            <p className="text-sm text-muted-foreground">
              {amazonSettings?.isConnected ? 'Connecté à Amazon Merch' : 'Configurez votre compte Amazon'}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {amazonSettings?.isConnected && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success mr-3">
              <Icon name="CheckCircle" size={12} className="mr-1" />
              Connecté
            </span>
          )}
          <Icon 
            name="ChevronDown" 
            size={20} 
            className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </div>
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-border">
          {/* Connection Status */}
          {!amazonSettings?.isConnected ? (
            <div className="space-y-4">
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start">
                  <Icon name="AlertTriangle" size={20} className="text-warning mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-warning">Compte non connecté</h3>
                    <p className="text-xs text-warning/80 mt-1">
                      Connectez votre compte Amazon Merch pour publier automatiquement vos designs
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Connecter votre compte Amazon</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Clé API Amazon"
                    type="password"
                    value={connectionData?.apiKey}
                    onChange={(e) => setConnectionData(prev => ({ ...prev, apiKey: e?.target?.value }))}
                    placeholder="Entrez votre clé API"
                    required
                  />

                  <Input
                    label="Clé secrète"
                    type="password"
                    value={connectionData?.secretKey}
                    onChange={(e) => setConnectionData(prev => ({ ...prev, secretKey: e?.target?.value }))}
                    placeholder="Entrez votre clé secrète"
                    required
                  />
                </div>

                <Select
                  label="Région Amazon"
                  options={regionOptions}
                  value={connectionData?.region}
                  onChange={(value) => setConnectionData(prev => ({ ...prev, region: value }))}
                  description="Sélectionnez votre région principale"
                />

                <Button
                  variant="default"
                  iconName="Link"
                  iconPosition="left"
                  loading={isConnecting}
                  onClick={handleConnectionSubmit}
                  disabled={!connectionData?.apiKey || !connectionData?.secretKey}
                >
                  {isConnecting ? 'Connexion en cours...' : 'Connecter le compte'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <Icon name="CheckCircle" size={20} className="text-success mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-success">Compte connecté avec succès</h3>
                      <p className="text-xs text-success/80 mt-1">
                        ID Vendeur: {amazonSettings?.accountInfo?.sellerId}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Unlink"
                    iconPosition="left"
                    onClick={handleDisconnect}
                  >
                    Déconnecter
                  </Button>
                </div>
              </div>

              {/* Account Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="text-sm font-medium text-foreground mb-2">Statut du compte</h4>
                  <p className="text-lg font-semibold text-success">{amazonSettings?.accountInfo?.status}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="text-sm font-medium text-foreground mb-2">Marketplaces</h4>
                  <p className="text-sm text-muted-foreground">
                    {amazonSettings?.accountInfo?.marketplaces?.join(', ')}
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="text-sm font-medium text-foreground mb-2">Designs publiés</h4>
                  <p className="text-lg font-semibold text-primary">127</p>
                </div>
              </div>
            </div>
          )}

          {/* Compliance Checker */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Shield" size={20} className="mr-2 text-primary" />
              Vérification de Conformité
            </h3>
            
            <div className="space-y-3">
              {complianceRules?.map((rule) => (
                <div key={rule?.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Checkbox
                    checked={rule?.enabled}
                    onChange={(e) => handleComplianceToggle(rule?.id, e?.target?.checked)}
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{rule?.label}</h4>
                    <p className="text-xs text-muted-foreground">{rule?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Download" size={20} className="mr-2 text-primary" />
              Paramètres d'Export
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Format par défaut"
                options={exportFormatOptions}
                value={localSettings?.defaultExportFormat}
                onChange={(value) => handleSettingChange('defaultExportFormat', value)}
                description="Format utilisé pour l'export automatique"
              />

              <div className="space-y-3">
                <Checkbox
                  label="Export automatique"
                  description="Exporter automatiquement après validation"
                  checked={localSettings?.autoExport}
                  onChange={(e) => handleSettingChange('autoExport', e?.target?.checked)}
                />

                <Checkbox
                  label="Optimisation pour Amazon"
                  description="Appliquer les optimisations spécifiques à Amazon"
                  checked={localSettings?.amazonOptimization}
                  onChange={(e) => handleSettingChange('amazonOptimization', e?.target?.checked)}
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
              Enregistrer les paramètres
            </Button>
            <Button
              variant="outline"
              iconName="ExternalLink"
              iconPosition="left"
              onClick={() => window.open('https://merch.amazon.com', '_blank')}
            >
              Ouvrir Amazon Merch
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmazonIntegrationSection;