import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceTips = () => {
  const tips = [
    {
      id: 1,
      title: "Résolution d\'image",
      description: "Utilisez au minimum 300 DPI pour une qualité d\'impression optimale",
      type: "success",
      icon: "Image"
    },
    {
      id: 2,
      title: "Droits d\'auteur",
      description: "Vérifiez que tous les éléments utilisés sont libres de droits",
      type: "warning",
      icon: "Shield"
    },
    {
      id: 3,
      title: "Texte lisible",
      description: "Assurez-vous que le texte est clairement lisible sur tous les fonds",
      type: "info",
      icon: "Type"
    }
  ];

  const typeColors = {
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    info: 'text-primary bg-primary/10'
  };

  return (
    <div className="space-y-3">
      {tips?.map((tip) => (
        <div key={tip?.id} className="flex space-x-3 p-3 rounded-lg bg-muted/50">
          <div className={`p-2 rounded-lg ${typeColors?.[tip?.type]}`}>
            <Icon name={tip?.icon} size={16} color="currentColor" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground mb-1">{tip?.title}</h4>
            <p className="text-xs text-muted-foreground">{tip?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplianceTips;