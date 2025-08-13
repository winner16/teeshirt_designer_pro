import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PropertiesPanel = ({ isCollapsed, onToggleCollapse }) => {
  const [activeTab, setActiveTab] = useState('layers');
  const [complianceScore, setComplianceScore] = useState(85);

  const layers = [
    { id: 1, name: 'Votre Design Ici', type: 'text', visible: true, locked: false },
    { id: 2, name: 'Arrière-plan', type: 'background', visible: true, locked: true }
  ];

  const complianceChecks = [
    { id: 'resolution', name: 'Résolution', status: 'success', message: '300 DPI - Conforme' },
    { id: 'size', name: 'Dimensions', status: 'success', message: '4500×5400 px - Conforme' },
    { id: 'text', name: 'Lisibilité du texte', status: 'warning', message: 'Taille recommandée: 14pt+' },
    { id: 'colors', name: 'Profil colorimétrique', status: 'success', message: 'RGB - Conforme' },
    { id: 'content', name: 'Contenu', status: 'success', message: 'Aucun contenu interdit détecté' }
  ];

  const designProperties = {
    width: 300,
    height: 400,
    resolution: 300,
    colorMode: 'RGB',
    fileSize: '2.4 MB'
  };

  const tabs = [
    { id: 'layers', name: 'Calques', icon: 'Layers' },
    { id: 'properties', name: 'Propriétés', icon: 'Settings' },
    { id: 'compliance', name: 'Conformité', icon: 'CheckCircle' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'warning':
        return <Icon name="AlertTriangle" size={16} className="text-warning" />;
      case 'error':
        return <Icon name="XCircle" size={16} className="text-error" />;
      default:
        return <Icon name="Circle" size={16} className="text-muted-foreground" />;
    }
  };

  const renderLayersTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Calques du design</h4>
        <Button variant="ghost" size="sm" iconName="Plus">
          Nouveau
        </Button>
      </div>
      
      <div className="space-y-2">
        {layers?.map((layer) => (
          <div
            key={layer?.id}
            className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={() => {}}
              >
                <Icon 
                  name={layer?.visible ? "Eye" : "EyeOff"} 
                  size={14} 
                  className={layer?.visible ? "text-foreground" : "text-muted-foreground"}
                />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={() => {}}
              >
                <Icon 
                  name={layer?.locked ? "Lock" : "Unlock"} 
                  size={14} 
                  className={layer?.locked ? "text-muted-foreground" : "text-foreground"}
                />
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={layer?.type === 'text' ? 'Type' : 'Square'} 
                  size={16} 
                  className="text-muted-foreground" 
                />
                <span className="text-sm font-medium">{layer?.name}</span>
              </div>
              <p className="text-xs text-muted-foreground capitalize">{layer?.type}</p>
            </div>
            
            <Button variant="ghost" size="icon" className="w-6 h-6">
              <Icon name="MoreVertical" size={14} />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-border">
        <h5 className="text-sm font-medium mb-3">Actions rapides</h5>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" iconName="Copy">
            Dupliquer
          </Button>
          <Button variant="outline" size="sm" iconName="Trash2">
            Supprimer
          </Button>
          <Button variant="outline" size="sm" iconName="ArrowUp">
            Monter
          </Button>
          <Button variant="outline" size="sm" iconName="ArrowDown">
            Descendre
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPropertiesTab = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-3">Propriétés du design</h4>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Largeur"
              type="number"
              value={designProperties?.width}
              className="text-sm"
            />
            <Input
              label="Hauteur"
              type="number"
              value={designProperties?.height}
              className="text-sm"
            />
          </div>
          
          <Input
            label="Résolution (DPI)"
            type="number"
            value={designProperties?.resolution}
            className="text-sm"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground">Mode couleur</label>
              <div className="mt-1 px-3 py-2 bg-muted rounded-lg text-sm">
                {designProperties?.colorMode}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Taille fichier</label>
              <div className="mt-1 px-3 py-2 bg-muted rounded-lg text-sm">
                {designProperties?.fileSize}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-border">
        <h5 className="text-sm font-medium mb-3">Paramètres d'export</h5>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground">Format</label>
            <select className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm">
              <option value="png">PNG (Recommandé)</option>
              <option value="jpg">JPEG</option>
              <option value="pdf">PDF</option>
              <option value="svg">SVG</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground">Qualité</label>
            <select className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm">
              <option value="high">Haute (300 DPI)</option>
              <option value="medium">Moyenne (150 DPI)</option>
              <option value="low">Basse (72 DPI)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderComplianceTab = () => (
    <div className="space-y-4">
      <div className="text-center p-4 bg-muted/50 rounded-lg">
        <div className="relative w-16 h-16 mx-auto mb-3">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - complianceScore / 100)}`}
              className="text-success"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-foreground">{complianceScore}%</span>
          </div>
        </div>
        <h4 className="text-sm font-medium text-foreground">Score de conformité</h4>
        <p className="text-xs text-muted-foreground">Amazon Merch on Demand</p>
      </div>
      
      <div className="space-y-3">
        <h5 className="text-sm font-medium">Vérifications</h5>
        {complianceChecks?.map((check) => (
          <div key={check?.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border">
            {getStatusIcon(check?.status)}
            <div className="flex-1">
              <h6 className="text-sm font-medium text-foreground">{check?.name}</h6>
              <p className="text-xs text-muted-foreground">{check?.message}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="ExternalLink">
          Guide de conformité Amazon
        </Button>
      </div>
    </div>
  );

  if (isCollapsed) {
    return (
      <div className="fixed right-0 top-16 bottom-0 w-16 bg-card border-l border-border z-40 flex flex-col">
        <div className="p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="w-12 h-12"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
        </div>
        <div className="flex-1 flex flex-col space-y-2 p-2">
          {tabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? "default" : "ghost"}
              size="icon"
              onClick={() => setActiveTab(tab?.id)}
              className="w-12 h-12"
              title={tab?.name}
            >
              <Icon name={tab?.icon} size={20} />
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-16 bottom-0 w-80 bg-card border-l border-border z-40 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Propriétés</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.name}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'layers' && renderLayersTab()}
        {activeTab === 'properties' && renderPropertiesTab()}
        {activeTab === 'compliance' && renderComplianceTab()}
      </div>
    </div>
  );
};

export default PropertiesPanel;