import React from 'react';
import Icon from '../AppIcon';

const PrimaryNavigation = ({ 
  items = [], 
  currentPath = '', 
  onNavigate, 
  variant = 'horizontal' 
}) => {
  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const handleKeyDown = (event, path) => {
    if (event?.key === 'Enter' || event?.key === ' ') {
      event?.preventDefault();
      handleNavigation(path);
    }
  };

  const isActive = (path) => {
    return currentPath === path;
  };

  if (variant === 'mobile') {
    return (
      <nav className="space-y-2" role="navigation" aria-label="Navigation principale">
        {items?.map((item) => {
          const active = isActive(item?.path);
          return (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              onKeyDown={(e) => handleKeyDown(e, item?.path)}
              className={`
                w-full flex items-center space-x-4 px-4 py-4 rounded-lg text-left transition-micro
                ${active 
                  ? 'bg-primary text-primary-foreground shadow-elevation-1' 
                  : 'text-foreground hover:bg-muted hover-lift'
                }
                focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
              `}
              aria-current={active ? 'page' : undefined}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={24} 
                color={active ? 'currentColor' : 'currentColor'} 
                strokeWidth={active ? 2.5 : 2}
              />
              <div>
                <span className="text-base font-medium">{item?.label}</span>
                <p className="text-sm opacity-75 mt-0.5">{item?.tooltip}</p>
              </div>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-1" role="navigation" aria-label="Navigation principale">
      {items?.map((item) => {
        const active = isActive(item?.path);
        return (
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            onKeyDown={(e) => handleKeyDown(e, item?.path)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg transition-micro
              ${active 
                ? 'bg-primary text-primary-foreground shadow-elevation-1' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted hover-lift'
              }
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            `}
            aria-current={active ? 'page' : undefined}
            title={item?.tooltip}
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              color="currentColor" 
              strokeWidth={active ? 2.5 : 2}
            />
            <span className="text-sm font-medium">{item?.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default PrimaryNavigation;