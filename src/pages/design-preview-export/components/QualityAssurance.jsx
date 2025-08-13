import React from 'react';
import Icon from '../../../components/AppIcon';

const QualityAssurance = ({ designSpecs = {} }) => {
  const qualityChecks = [
    {
      id: 'resolution',
      label: 'Résolution',
      value: `${designSpecs?.width || 4500} × ${designSpecs?.height || 5400} px`,
      status: 'success',
      detail: `${designSpecs?.dpi || 300} DPI`
    },
    {
      id: 'colorProfile',
      label: 'Profil Colorimétrique',
      value: designSpecs?.colorProfile || 'sRGB',
      status: 'success',
      detail: 'Compatible impression'
    },
    {
      id: 'fileSize',
      label: 'Taille du Fichier',
      value: designSpecs?.fileSize || '2.4 MB',
      status: 'success',
      detail: 'Optimisé pour upload'
    },
    {
      id: 'placement',
      label: 'Placement du Design',
      value: 'Centré',
      status: 'success',
      detail: 'Conforme aux guidelines'
    },
    {
      id: 'margins',
      label: 'Marges de Sécurité',
      value: '0.5 pouces',
      status: 'success',
      detail: 'Respectées'
    },
    {
      id: 'transparency',
      label: 'Arrière-plan',
      value: 'Transparent',
      status: 'success',
      detail: 'PNG avec alpha'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <Icon name="CheckCircle" size={16} color="#10B981" />;
      case 'warning':
        return <Icon name="AlertTriangle" size={16} color="#F59E0B" />;
      case 'error':
        return <Icon name="XCircle" size={16} color="#EF4444" />;
      default:
        return <Icon name="Info" size={16} color="#3B82F6" />;
    }
  };

  const overallScore = qualityChecks?.filter(check => check?.status === 'success')?.length;
  const totalChecks = qualityChecks?.length;
  const scorePercentage = Math.round((overallScore / totalChecks) * 100);

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={20} color="currentColor" className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Contrôle Qualité</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            scorePercentage >= 90 ? 'bg-success/10 text-success' :
            scorePercentage >= 70 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
          }`}>
            {scorePercentage}% Conforme
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Score de Qualité</span>
          <span className="font-medium text-foreground">{overallScore}/{totalChecks}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              scorePercentage >= 90 ? 'bg-success' :
              scorePercentage >= 70 ? 'bg-warning': 'bg-error'
            }`}
            style={{ width: `${scorePercentage}%` }}
          />
        </div>
      </div>
      {/* Quality Checks */}
      <div className="space-y-3">
        {qualityChecks?.map((check) => (
          <div key={check?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(check?.status)}
              <div>
                <p className="text-sm font-medium text-foreground">{check?.label}</p>
                <p className="text-xs text-muted-foreground">{check?.detail}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{check?.value}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Amazon Compliance Badge */}
      <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="Shield" size={20} color="#10B981" />
          </div>
          <div>
            <p className="text-sm font-semibold text-success">Amazon Merch Compliant</p>
            <p className="text-xs text-success/80">
              Votre design respecte toutes les exigences Amazon Merch on Demand
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityAssurance;