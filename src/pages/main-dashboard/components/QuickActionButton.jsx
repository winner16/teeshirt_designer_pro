import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionButton = ({ title, description, icon, color = 'primary', onClick, disabled = false }) => {
  const colorClasses = {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    success: 'bg-success hover:bg-success/90 text-success-foreground',
    warning: 'bg-warning hover:bg-warning/90 text-warning-foreground',
    accent: 'bg-accent hover:bg-accent/90 text-accent-foreground',
    secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-4 rounded-lg transition-micro hover-lift shadow-elevation-1
        ${colorClasses?.[color]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
      `}
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="p-2 bg-white/20 rounded-lg">
          <Icon name={icon} size={24} color="currentColor" strokeWidth={2} />
        </div>
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs opacity-90">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default QuickActionButton;