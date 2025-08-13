import React from 'react';
import Icon from '../../../components/AppIcon';

const SidebarWidget = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-card rounded-lg p-6 shadow-elevation-1 border border-border ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name={icon} size={20} color="var(--color-primary)" strokeWidth={2} />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default SidebarWidget;