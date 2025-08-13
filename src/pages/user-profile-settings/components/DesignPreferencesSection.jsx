import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DesignPreferencesSection = ({ preferences, onUpdatePreferences }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const canvasSizeOptions = [
    { value: '1080x1080', label: '1080x1080 (Carré)' },
    { value: '1200x1200', label: '1200x1200 (Carré HD)' },
    { value: '2400x3000', label: '2400x3000 (Portrait)' },
    { value: '3000x2400', label: '3000x2400 (Paysage)' },
    { value: 'custom', label: 'Personnalisé' }
  ];

  const colorPaletteOptions = [
    { value: 'vibrant', label: 'Couleurs vives' },
    { value: 'pastel', label: 'Couleurs pastel' },
    { value: 'monochrome', label: 'Monochrome' },
    { value: 'earth', label: 'Tons terreux' },
    { value: 'neon', label: 'Couleurs néon' }
  ];

  const fontFamilyOptions = [
    { value: 'inter', label: 'Inter (Sans-serif moderne)' },
    { value: 'roboto', label: 'Roboto (Google Fonts)' },
    { value: 'montserrat', label: 'Montserrat (Géométrique)' },
    { value: 'playfair', label: 'Playfair Display (Serif)' },
    { value: 'oswald', label: 'Oswald (Condensé)' }
  ];

  const templateCategoryOptions = [
    { value: 'minimalist', label: 'Minimaliste' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'modern', label: 'Moderne' },
    { value: 'artistic', label: 'Artistique' },
    { value: 'typography', label: 'Typographique' }
  ];

  const handlePreferenceChange = (key, value) => {
    const updatedPreferences = {
      ...localPreferences,
      [key]: value
    };
    setLocalPreferences(updatedPreferences);
  };

  const handleSavePreferences = () => {
    onUpdatePreferences(localPreferences);
  };

  const handleResetToDefaults = () => {
    const defaultPreferences = {
      defaultCanvasSize: '1080x1080',
      defaultColorPalette: 'vibrant',
      defaultFontFamily: 'inter',
      preferredTemplateCategories: ['minimalist', 'modern'],
      autoSaveEnabled: true,
      gridSnapEnabled: true,
      showRulers: true,
      highQualityPreview: true
    };
    setLocalPreferences(defaultPreferences);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-micro rounded-t-lg"
      >
        <div className="flex items-center">
          <Icon name="Palette" size={24} className="mr-3 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Préférences de Design</h2>
            <p className="text-sm text-muted-foreground">Personnalisez votre environnement de création</p>
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
          {/* Canvas Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Square" size={20} className="mr-2 text-primary" />
              Paramètres du Canevas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Taille par défaut"
                options={canvasSizeOptions}
                value={localPreferences?.defaultCanvasSize}
                onChange={(value) => handlePreferenceChange('defaultCanvasSize', value)}
                description="Taille utilisée pour les nouveaux projets"
              />

              <Select
                label="Palette de couleurs"
                options={colorPaletteOptions}
                value={localPreferences?.defaultColorPalette}
                onChange={(value) => handlePreferenceChange('defaultColorPalette', value)}
                description="Palette suggérée par défaut"
              />
            </div>

            {/* Canvas Preview */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-3">Aperçu du canevas:</p>
              <div className="flex items-center justify-center">
                <div className="w-24 h-24 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center bg-background">
                  <Icon name="Image" size={32} className="text-primary/50" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                {localPreferences?.defaultCanvasSize}
              </p>
            </div>
          </div>

          {/* Typography Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Type" size={20} className="mr-2 text-primary" />
              Typographie
            </h3>
            
            <Select
              label="Police par défaut"
              options={fontFamilyOptions}
              value={localPreferences?.defaultFontFamily}
              onChange={(value) => handlePreferenceChange('defaultFontFamily', value)}
              description="Police utilisée pour les nouveaux textes"
            />

            {/* Font Preview */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-3">Aperçu de la police:</p>
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-foreground">TeeShirt Designer</p>
                <p className="text-base text-muted-foreground">Créez des designs exceptionnels</p>
                <p className="text-sm text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              </div>
            </div>
          </div>

          {/* Template Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Layout" size={20} className="mr-2 text-primary" />
              Catégories de Templates Préférées
            </h3>
            
            <Select
              label="Catégories favorites"
              options={templateCategoryOptions}
              value={localPreferences?.preferredTemplateCategories}
              onChange={(value) => handlePreferenceChange('preferredTemplateCategories', value)}
              multiple
              description="Catégories affichées en priorité"
            />

            {/* Template Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {localPreferences?.preferredTemplateCategories?.map((category, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg text-center">
                  <div className="w-full h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded mb-2 flex items-center justify-center">
                    <Icon name="Shirt" size={24} className="text-primary" />
                  </div>
                  <p className="text-xs font-medium text-foreground capitalize">{category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Editor Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Settings" size={20} className="mr-2 text-primary" />
              Options de l'Éditeur
            </h3>
            
            <div className="space-y-4">
              <Checkbox
                label="Sauvegarde automatique"
                description="Enregistre automatiquement vos modifications"
                checked={localPreferences?.autoSaveEnabled}
                onChange={(e) => handlePreferenceChange('autoSaveEnabled', e?.target?.checked)}
              />

              <Checkbox
                label="Accrochage à la grille"
                description="Aligne automatiquement les éléments sur la grille"
                checked={localPreferences?.gridSnapEnabled}
                onChange={(e) => handlePreferenceChange('gridSnapEnabled', e?.target?.checked)}
              />

              <Checkbox
                label="Afficher les règles"
                description="Affiche les règles de mesure dans l'éditeur"
                checked={localPreferences?.showRulers}
                onChange={(e) => handlePreferenceChange('showRulers', e?.target?.checked)}
              />

              <Checkbox
                label="Aperçu haute qualité"
                description="Utilise un rendu haute qualité (plus lent)"
                checked={localPreferences?.highQualityPreview}
                onChange={(e) => handlePreferenceChange('highQualityPreview', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              iconName="Save"
              iconPosition="left"
              onClick={handleSavePreferences}
            >
              Enregistrer les préférences
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

export default DesignPreferencesSection;