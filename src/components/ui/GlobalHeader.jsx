import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import UserDropdown from './UserDropdown';
import PrimaryNavigation from './PrimaryNavigation';

const GlobalHeader = ({ isCollapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const headerRef = useRef(null);

  const navigationItems = [
    { 
      path: '/main-dashboard', 
      label: 'Tableau de Bord', 
      icon: 'LayoutDashboard',
      tooltip: 'Gérez votre portfolio et consultez vos métriques'
    },
    { 
      path: '/design-editor', 
      label: 'Éditeur', 
      icon: 'Palette',
      tooltip: 'Créez et modifiez vos designs de t-shirts'
    },
    { 
      path: '/design-preview-export', 
      label: 'Aperçu', 
      icon: 'Eye',
      tooltip: 'Prévisualisez et exportez vos créations'
    },
    { 
      path: '/user-profile-settings', 
      label: 'Profil', 
      icon: 'User',
      tooltip: 'Gérez votre compte et vos paramètres'
    }
  ];

  const handleLogoClick = () => {
    navigate('/main-dashboard');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const closeUserDropdown = () => {
    setIsUserDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef?.current && !headerRef?.current?.contains(event?.target)) {
        setIsUserDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isAuthPage = location?.pathname === '/user-login' || location?.pathname === '/user-registration';

  if (isAuthPage) {
    return null;
  }

  return (
    <>
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border shadow-elevation-1"
      >
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 transition-micro hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
              aria-label="TeeShirt Designer Pro - Retour au tableau de bord"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg shadow-elevation-1">
                <Icon name="Shirt" size={24} color="white" strokeWidth={2} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-foreground">
                  TeeShirt Designer Pro
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">
                  Créateur professionnel
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-center max-w-2xl mx-8">
            <PrimaryNavigation 
              items={navigationItems}
              currentPath={location?.pathname}
              onNavigate={navigate}
              variant="horizontal"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg transition-micro hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={isMobileMenuOpen}
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
                color="currentColor" 
              />
            </button>

            {/* User Avatar */}
            <div className="relative">
              <button
                onClick={toggleUserDropdown}
                className="flex items-center space-x-2 p-2 rounded-lg transition-micro hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Menu utilisateur"
                aria-expanded={isUserDropdownOpen}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-foreground">Designer Pro</p>
                  <p className="text-xs text-muted-foreground">Créateur</p>
                </div>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  color="currentColor"
                  className={`transition-transform duration-150 ${isUserDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <UserDropdown 
                isOpen={isUserDropdownOpen}
                onClose={closeUserDropdown}
                onNavigate={navigate}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 z-1200 bg-background">
            <div className="p-6">
              <PrimaryNavigation 
                items={navigationItems}
                currentPath={location?.pathname}
                onNavigate={(path) => {
                  navigate(path);
                  closeMobileMenu();
                }}
                variant="mobile"
              />
            </div>
          </div>
        )}
      </header>
      {/* Header Spacer */}
      <div className="h-16" />
    </>
  );
};

export default GlobalHeader;