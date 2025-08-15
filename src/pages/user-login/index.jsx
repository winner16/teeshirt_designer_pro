import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import TrustIndicators from './components/TrustIndicators';
import DesignShowcase from './components/DesignShowcase';
import Icon from '../../components/AppIcon';

const UserLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Check if user is already logged in
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/main-dashboard');
      return;
    }

    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Connexion - TeeShirt Designer Pro</title>
        <meta name="description" content="Connectez-vous à TeeShirt Designer Pro pour accéder à vos outils de création de t-shirts et gérer votre portfolio de designs." />
        <meta name="keywords" content="connexion, login, designer, t-shirt, création, portfolio" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Simplified Header */}
        <header className="bg-card border-b border-border shadow-elevation-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-3 transition-micro hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                aria-label="Retour à l'accueil"
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

              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} color="currentColor" />
                  <span>
                    {currentTime?.toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Shield" size={16} color="var(--color-success)" />
                  <span className="hidden sm:inline">Connexion sécurisée</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column - Login Form */}
              <div className="order-2 lg:order-1">
                <div className="sticky top-8">
                  <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
                  
                  {/* Trust Indicators - Mobile */}
                  <div className="mt-8 lg:hidden">
                    <TrustIndicators />
                  </div>
                </div>
              </div>

              {/* Right Column - Design Showcase & Trust */}
              <div className="order-1 lg:order-2 space-y-8">
                {/* Welcome Message */}
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    Créez des Designs
                    <span className="block text-primary">qui se Vendent</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Rejoignez plus de 10,000 designers qui utilisent notre plateforme 
                    pour créer des t-shirts à succès et développer votre activité en ligne.
                  </p>
                </div>

                {/* Design Showcase */}
                <DesignShowcase />

                {/* Trust Indicators - Desktop */}
                <div className="hidden lg:block">
                  <TrustIndicators />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>© {new Date()?.getFullYear()} TeeShirt Designer Pro</span>
                <span>•</span>
                <button className="hover:text-foreground transition-micro">
                  Conditions d'utilisation
                </button>
                <span>•</span>
                <button className="hover:text-foreground transition-micro">
                  Confidentialité
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={14} color="currentColor" />
                  <span>France</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Globe" size={14} color="currentColor" />
                  <span>Français</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default UserLogin;
