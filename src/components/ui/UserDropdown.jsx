import React, { useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const UserDropdown = ({ isOpen = false, onClose, onNavigate }) => {
  const dropdownRef = useRef(null);

  const menuItems = [
    {
      label: 'Mon Profil',
      icon: 'User',
      path: '/user-profile-settings',
      description: 'Gérer les informations du compte'
    },
    {
      label: 'Paramètres',
      icon: 'Settings',
      path: '/user-profile-settings',
      description: 'Préférences et configuration'
    },
    {
      label: 'Aide & Support',
      icon: 'HelpCircle',
      action: 'help',
      description: 'Documentation et assistance'
    },
    {
      type: 'divider'
    },
    {
      label: 'Se Déconnecter',
      icon: 'LogOut',
      action: 'logout',
      description: 'Quitter la session',
      variant: 'destructive'
    }
  ];

  const handleItemClick = (item) => {
    if (item?.path && onNavigate) {
      onNavigate(item?.path);
    } else if (item?.action === 'logout') {
      handleLogout();
    } else if (item?.action === 'help') {
      handleHelp();
    }
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    if (onNavigate) {
      onNavigate('/user-login');
    }
  };

  const handleHelp = () => {
    window.open('https://help.teeshirtdesignerpro.com', '_blank');
  };

  const handleKeyDown = (event, item) => {
    if (event?.key === 'Enter' || event?.key === ' ') {
      event?.preventDefault();
      handleItemClick(item);
    } else if (event?.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      const firstFocusable = dropdownRef?.current?.querySelector('button');
      if (firstFocusable) {
        firstFocusable?.focus();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevation-2 z-1100 transition-layout"
      role="menu"
      aria-label="Menu utilisateur"
    >
      <div className="py-2">
        {/* User Info Header */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={20} color="white" />
            </div>
            <div>
              <p className="text-sm font-medium text-popover-foreground">Designer Pro</p>
              <p className="text-xs text-muted-foreground">designer@example.com</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          {menuItems?.map((item, index) => {
            if (item?.type === 'divider') {
              return (
                <div key={index} className="my-1 border-t border-border" />
              );
            }

            return (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 text-left transition-micro
                  ${item?.variant === 'destructive' ?'text-destructive hover:bg-destructive/10' :'text-popover-foreground hover:bg-muted'
                  }
                  focus:outline-none focus:bg-muted
                `}
                role="menuitem"
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  color="currentColor" 
                  strokeWidth={2}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item?.label}</p>
                  <p className="text-xs opacity-75">{item?.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;