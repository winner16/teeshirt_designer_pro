import React from 'react';
import Icon from '../../../components/AppIcon';

const TrendingCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Motivation",
      trend: "+15%",
      icon: "Zap",
      color: "text-success"
    },
    {
      id: 2,
      name: "Vintage",
      trend: "+8%",
      icon: "Clock",
      color: "text-primary"
    },
    {
      id: 3,
      name: "Minimaliste",
      trend: "+12%",
      icon: "Circle",
      color: "text-accent"
    },
    {
      id: 4,
      name: "Humour",
      trend: "+5%",
      icon: "Smile",
      color: "text-warning"
    }
  ];

  return (
    <div className="space-y-3">
      {categories?.map((category) => (
        <div key={category?.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-micro">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-muted ${category?.color}`}>
              <Icon name={category?.icon} size={16} color="currentColor" />
            </div>
            <span className="text-sm font-medium text-foreground">{category?.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">{category?.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingCategories;