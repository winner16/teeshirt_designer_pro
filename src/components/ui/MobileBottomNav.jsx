import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { 
      path: '/main-dashboard', 
      label: 'Tableau', 
      icon: 'LayoutDashboard',
      badge: null
    },
    { 
      path: '/design-editor', 
      label: 'Éditeur', 
      icon: 'Palette',
      badge: null
    },
    { 
      path: '/design-preview-export', 
      label: 'Aperçu', 
      icon: 'Eye',
      badge: null
    },
    { 
      path: '/user-profile-settings', 
      label: 'Profil', 
      icon: 'User',
      badge: null
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleKeyDown = (event, path) => {
    if (event?.key === 'Enter' || event?.key === ' ') {
      event?.preventDefault();
      handleNavigation(path);
    }
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  const isAuthPage = location?.pathname === '/user-login' || location?.pathname === '/user-registration';
  const isDesignEditor = location?.pathname === '/design-editor';

  if (isAuthPage || isDesignEditor) {
    return null;
  }

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-1000 bg-card border-t border-border shadow-elevation-2"
      role="navigation" 
      aria-label="Navigation mobile"
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {navigationItems?.map((item) => {
          const active = isActive(item?.path);
          return (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              onKeyDown={(e) => handleKeyDown(e, item?.path)}
              className={`
                relative flex flex-col items-center justify-center min-h-[48px] px-3 py-2 rounded-lg transition-micro
                ${active 
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }
                focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
              `}
              aria-current={active ? 'page' : undefined}
              aria-label={`${item?.label} - ${active ? 'Page actuelle' : 'Naviguer vers'}`}
            >
              <div className="relative">
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color="currentColor" 
                  strokeWidth={active ? 2.5 : 2}
                />
                {item?.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
                )}
              </div>
              <span className={`text-xs mt-1 font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {item?.label}
              </span>
              {active && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;