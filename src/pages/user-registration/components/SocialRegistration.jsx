import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ onSocialRegister, isLoading = false }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    }
  ];

  const handleSocialClick = (provider) => {
    if (onSocialRegister) {
      onSocialRegister(provider);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            Ou créez un compte avec
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            size="default"
            fullWidth
            onClick={() => handleSocialClick(provider?.id)}
            disabled={isLoading}
            className="relative overflow-hidden group"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className={`p-1 rounded ${provider?.color} ${provider?.textColor} transition-colors`}>
                <Icon name={provider?.icon} size={16} color="currentColor" />
              </div>
              <span className="font-medium">{provider?.name}</span>
            </div>
          </Button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          En vous inscrivant via les réseaux sociaux, vous acceptez nos{' '}
          <button 
            type="button"
            className="text-primary hover:underline focus:outline-none focus:underline"
            onClick={() => window.open('/terms', '_blank')}
          >
            conditions d'utilisation
          </button>
          {' '}et notre{' '}
          <button 
            type="button"
            className="text-primary hover:underline focus:outline-none focus:underline"
            onClick={() => window.open('/privacy', '_blank')}
          >
            politique de confidentialité
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialRegistration;