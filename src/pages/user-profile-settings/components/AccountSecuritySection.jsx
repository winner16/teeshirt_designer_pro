import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountSecuritySection = ({ securitySettings, onUpdateSecurity }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(securitySettings?.twoFactorEnabled);

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData?.currentPassword) {
      newErrors.currentPassword = 'Mot de passe actuel requis';
    }
    
    if (!passwordData?.newPassword) {
      newErrors.newPassword = 'Nouveau mot de passe requis';
    } else if (passwordData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handlePasswordSubmit = () => {
    if (validatePasswordForm()) {
      onUpdateSecurity({
        type: 'password',
        data: passwordData
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangingPassword(false);
    }
  };

  const handleTwoFactorToggle = (enabled) => {
    setTwoFactorEnabled(enabled);
    onUpdateSecurity({
      type: 'twoFactor',
      data: { enabled }
    });
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;
    
    const labels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return {
      strength: (strength / 5) * 100,
      label: labels?.[strength - 1] || 'Très faible',
      color: colors?.[strength - 1] || 'bg-red-500'
    };
  };

  const passwordStrength = getPasswordStrength(passwordData?.newPassword);

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-micro rounded-t-lg"
      >
        <div className="flex items-center">
          <Icon name="Shield" size={24} className="mr-3 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Sécurité du Compte</h2>
            <p className="text-sm text-muted-foreground">Gérez vos paramètres de sécurité</p>
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-border">
          {/* Password Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-foreground">Mot de passe</h3>
                <p className="text-sm text-muted-foreground">
                  Dernière modification: {securitySettings?.lastPasswordChange}
                </p>
              </div>
              {!isChangingPassword && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Key"
                  iconPosition="left"
                  onClick={() => setIsChangingPassword(true)}
                >
                  Changer
                </Button>
              )}
            </div>

            {isChangingPassword && (
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <Input
                  label="Mot de passe actuel"
                  type="password"
                  value={passwordData?.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
                  error={errors?.currentPassword}
                  required
                />

                <Input
                  label="Nouveau mot de passe"
                  type="password"
                  value={passwordData?.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
                  error={errors?.newPassword}
                  required
                />

                {passwordData?.newPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Force du mot de passe:</span>
                      <span className="font-medium">{passwordStrength?.label}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${passwordStrength?.color}`}
                        style={{ width: `${passwordStrength?.strength}%` }}
                      />
                    </div>
                  </div>
                )}

                <Input
                  label="Confirmer le nouveau mot de passe"
                  type="password"
                  value={passwordData?.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
                  error={errors?.confirmPassword}
                  required
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="default"
                    iconName="Check"
                    iconPosition="left"
                    onClick={handlePasswordSubmit}
                  >
                    Mettre à jour le mot de passe
                  </Button>
                  <Button
                    variant="outline"
                    iconName="X"
                    iconPosition="left"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                      setErrors({});
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Two-Factor Authentication */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-foreground flex items-center">
                  Authentification à deux facteurs
                  {twoFactorEnabled && (
                    <Icon name="CheckCircle" size={16} className="ml-2 text-success" />
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Ajoutez une couche de sécurité supplémentaire à votre compte
                </p>
              </div>
              <div className="ml-4">
                <Checkbox
                  checked={twoFactorEnabled}
                  onChange={(e) => handleTwoFactorToggle(e?.target?.checked)}
                  label=""
                />
              </div>
            </div>

            {twoFactorEnabled && (
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center">
                  <Icon name="Smartphone" size={20} className="text-success mr-3" />
                  <div>
                    <p className="text-sm font-medium text-success">
                      Authentification activée
                    </p>
                    <p className="text-xs text-success/80">
                      Configurée avec l'application Google Authenticator
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Login Activity */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Activité de connexion récente</h3>
            <div className="space-y-3">
              {securitySettings?.recentActivity?.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center">
                    <Icon 
                      name={activity?.device === 'desktop' ? 'Monitor' : 'Smartphone'} 
                      size={16} 
                      className="text-muted-foreground mr-3" 
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity?.location}</p>
                      <p className="text-xs text-muted-foreground">{activity?.device} • {activity?.browser}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{activity?.date}</p>
                    <p className="text-xs text-muted-foreground">{activity?.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSecuritySection;