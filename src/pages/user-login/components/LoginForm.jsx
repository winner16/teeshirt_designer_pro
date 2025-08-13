import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const mockCredentials = {
    email: 'designer@example.com',
    password: 'Designer123!'
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData?.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check mock credentials
    if (formData?.email !== mockCredentials?.email || formData?.password !== mockCredentials?.password) {
      setErrors({
        general: `Identifiants incorrects. Utilisez: ${mockCredentials?.email} / ${mockCredentials?.password}`
      });
      return;
    }

    // Simulate successful login
    localStorage.setItem('authToken', 'mock-jwt-token-12345');
    localStorage.setItem('userData', JSON.stringify({
      id: 1,
      name: 'Designer Pro',
      email: formData?.email,
      loginTime: new Date()?.toISOString()
    }));

    if (onSubmit) {
      onSubmit(formData);
    }

    navigate('/main-dashboard');
  };

  const handleForgotPassword = () => {
    alert('Fonctionnalité de récupération de mot de passe à venir');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-2xl shadow-elevation-2 p-8 border border-border">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mx-auto mb-4 shadow-elevation-1">
            <Icon name="Shirt" size={32} color="white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Bon retour !
          </h1>
          <p className="text-muted-foreground">
            Connectez-vous pour accéder à vos designs
          </p>
        </div>

        {/* Error Message */}
        {errors?.general && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" />
              <div>
                <p className="text-sm font-medium text-error">
                  Erreur de connexion
                </p>
                <p className="text-sm text-error/80 mt-1">
                  {errors?.general}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Adresse email"
            type="email"
            placeholder="designer@example.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <Input
            label="Mot de passe"
            type="password"
            placeholder="Entrez votre mot de passe"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            disabled={isLoading}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Se souvenir de moi"
              checked={formData?.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
              disabled={isLoading}
            />

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-micro focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
              disabled={isLoading}
            >
              Mot de passe oublié ?
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="right"
          >
            Se connecter
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground">
              Ou continuer avec
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => alert('Connexion Google à venir')}
            disabled={isLoading}
            iconName="Chrome"
            iconPosition="left"
          >
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => alert('Connexion Facebook à venir')}
            disabled={isLoading}
            iconName="Facebook"
            iconPosition="left"
          >
            Facebook
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Pas encore de compte ?{' '}
            <button
              type="button"
              onClick={() => navigate('/user-registration')}
              className="text-primary hover:text-primary/80 font-medium transition-micro focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
              disabled={isLoading}
            >
              Créer un compte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;