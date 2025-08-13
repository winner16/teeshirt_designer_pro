import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportPanel = ({ 
  isOpen = false, 
  onClose, 
  onExport,
  isExporting = false 
}) => {
  const [exportSettings, setExportSettings] = useState({
    format: 'png',
    resolution: '300',
    includeBleed: true,
    amazonCompliant: true,
    colorProfile: 'sRGB'
  });

  const formatOptions = [
    { value: 'png', label: 'PNG (Recommandé)', description: 'Format optimal pour Amazon Merch' },
    { value: 'pdf', label: 'PDF', description: 'Pour impression professionnelle' },
    { value: 'svg', label: 'SVG', description: 'Format vectoriel' },
    { value: 'jpg', label: 'JPEG', description: 'Format compressé' }
  ];

  const resolutionOptions = [
    { value: '150', label: '150 DPI', description: 'Qualité web' },
    { value: '300', label: '300 DPI (Recommandé)', description: 'Qualité impression' },
    { value: '600', label: '600 DPI', description: 'Haute qualité' }
  ];

  const colorProfileOptions = [
    { value: 'sRGB', label: 'sRGB (Recommandé)', description: 'Standard web et impression' },
    { value: 'CMYK', label: 'CMYK', description: 'Impression professionnelle' },
    { value: 'RGB', label: 'RGB', description: 'Affichage écran' }
  ];

  const handleExport = () => {
    onExport(exportSettings);
  };

  const complianceChecks = [
    { 
      id: 'resolution', 
      label: 'Résolution suffisante (≥300 DPI)', 
      status: exportSettings?.resolution >= '300' ? 'success' : 'warning',
      message: exportSettings?.resolution >= '300' ? 'Conforme' : 'Résolution recommandée: 300 DPI minimum'
    },
    { 
      id: 'format', 
      label: 'Format compatible Amazon', 
      status: exportSettings?.format === 'png' ? 'success' : 'info',
      message: exportSettings?.format === 'png' ? 'Format optimal' : 'PNG recommandé pour Amazon Merch'
    },
    { 
      id: 'colorProfile', 
      label: 'Profil colorimétrique', 
      status: exportSettings?.colorProfile === 'sRGB' ? 'success' : 'warning',
      message: exportSettings?.colorProfile === 'sRGB' ? 'Profil optimal' : 'sRGB recommandé'
    },
    { 
      id: 'dimensions', 
      label: 'Dimensions du design', 
      status: 'success',
      message: '4500x5400 pixels - Conforme Amazon'
    }
  ];

  return (
    <>
      {/* Mobile Bottom Sheet Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-1100 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      {/* Export Panel */}
      <div className={`
        fixed lg:relative bottom-0 right-0 w-full lg:w-96 bg-card border-t lg:border-l lg:border-t-0 border-border
        transform transition-transform duration-300 z-1200 lg:z-auto lg:transform-none
        ${isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
        max-h-[80vh] lg:max-h-none overflow-y-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:border-b-0">
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={20} color="currentColor" className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Options d'Export</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
            iconName="X"
          />
        </div>

        <div className="p-4 space-y-6">
          {/* Export Format */}
          <div>
            <Select
              label="Format d'export"
              options={formatOptions}
              value={exportSettings?.format}
              onChange={(value) => setExportSettings(prev => ({ ...prev, format: value }))}
            />
          </div>

          {/* Resolution */}
          <div>
            <Select
              label="Résolution"
              options={resolutionOptions}
              value={exportSettings?.resolution}
              onChange={(value) => setExportSettings(prev => ({ ...prev, resolution: value }))}
            />
          </div>

          {/* Color Profile */}
          <div>
            <Select
              label="Profil colorimétrique"
              options={colorProfileOptions}
              value={exportSettings?.colorProfile}
              onChange={(value) => setExportSettings(prev => ({ ...prev, colorProfile: value }))}
            />
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Options avancées</h3>
            
            <Checkbox
              label="Inclure les marges de coupe"
              description="Ajoute 0.125 pouces de marge"
              checked={exportSettings?.includeBleed}
              onChange={(e) => setExportSettings(prev => ({ ...prev, includeBleed: e?.target?.checked }))}
            />

            <Checkbox
              label="Optimisation Amazon Merch"
              description="Applique les paramètres recommandés"
              checked={exportSettings?.amazonCompliant}
              onChange={(e) => setExportSettings(prev => ({ ...prev, amazonCompliant: e?.target?.checked }))}
            />
          </div>

          {/* Compliance Checker */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Shield" size={16} color="currentColor" className="text-primary" />
              <h3 className="text-sm font-medium text-foreground">Vérification de Conformité</h3>
            </div>

            <div className="space-y-2">
              {complianceChecks?.map((check) => (
                <div key={check?.id} className="flex items-start space-x-2">
                  <Icon 
                    name={check?.status === 'success' ? 'CheckCircle' : check?.status === 'warning' ? 'AlertTriangle' : 'Info'} 
                    size={16} 
                    color={check?.status === 'success' ? '#10B981' : check?.status === 'warning' ? '#F59E0B' : '#3B82F6'} 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{check?.label}</p>
                    <p className="text-xs text-muted-foreground">{check?.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Actions */}
          <div className="space-y-3 pt-4 border-t border-border">
            <Button
              variant="default"
              fullWidth
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              Exporter le Design
            </Button>

            <Button
              variant="outline"
              fullWidth
              iconName="Package"
              iconPosition="left"
            >
              Package Amazon Complet
            </Button>
          </div>

          {/* File Info */}
          <div className="bg-muted rounded-lg p-3">
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Nom du fichier:</strong> mon-design-tshirt.{exportSettings?.format}</p>
              <p><strong>Taille estimée:</strong> ~2.5 MB</p>
              <p><strong>Dimensions:</strong> 4500 × 5400 pixels</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportPanel;