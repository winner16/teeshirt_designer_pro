import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    accent: 'bg-accent text-accent-foreground'
  };

  const trendIcon = trend > 0 ? 'TrendingUp' : trend < 0 ? 'TrendingDown' : 'Minus';
  const trendColor = trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-muted-foreground';

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-1 border border-border hover-lift transition-micro">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses?.[color]}`}>
          <Icon name={icon} size={24} color="currentColor" strokeWidth={2} />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center space-x-1 ${trendColor}`}>
            <Icon name={trendIcon} size={16} color="currentColor" />
            <span className="text-sm font-medium">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;