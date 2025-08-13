import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    firstName: '',
    lastName: '',
    acceptTerms: false,
    acceptMarketing: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userTypeOptions = [
    { value: 'designer', label: 'Designer Graphique', description: 'Créateur professionnel de designs' },
    { value: 'entrepreneur', label: 'Entrepreneur', description: 'Propriétaire d\'entreprise créative' },
    { value: 'artist', label: 'Artiste', description: 'Créateur artistique indépendant' },
    { value: 'business', label: 'Entreprise', description: 'Équipe ou agence créative' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData?.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData?.userType) {
      newErrors.userType = 'Veuillez sélectionner votre type de profil';
    }

    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/\d/?.test(password)) strength++;
    if (/[^a-zA-Z\d]/?.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData?.password);
  const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Prénom"
          type="text"
          placeholder="Votre prénom"
          value={formData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
          className="w-full"
        />
        <Input
          label="Nom"
          type="text"
          placeholder="Votre nom"
          value={formData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
          className="w-full"
        />
      </div>
      {/* Email */}
      <Input
        label="Adresse Email"
        type="email"
        placeholder="votre@email.com"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
        description="Nous utiliserons cette adresse pour vous envoyer les notifications importantes"
      />
      {/* User Type */}
      <Select
        label="Type de Profil"
        placeholder="Sélectionnez votre profil"
        options={userTypeOptions}
        value={formData?.userType}
        onChange={(value) => handleInputChange('userType', value)}
        error={errors?.userType}
        required
        description="Choisissez le profil qui correspond le mieux à votre activité"
      />
      {/* Password */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            label="Mot de Passe"
            type={showPassword ? "text" : "password"}
            placeholder="Créez un mot de passe sécurisé"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {formData?.password && (
          <div className="space-y-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5]?.map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    level <= passwordStrength ? strengthColors?.[passwordStrength - 1] : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Force: {strengthLabels?.[passwordStrength - 1] || 'Très faible'}
            </p>
          </div>
        )}
      </div>
      {/* Confirm Password */}
      <div className="relative">
        <Input
          label="Confirmer le Mot de Passe"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirmez votre mot de passe"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
      </div>
      {/* Terms and Marketing */}
      <div className="space-y-4">
        <Checkbox
          label="J'accepte les conditions d'utilisation et la politique de confidentialité"
          description="En créant un compte, vous acceptez nos conditions d'utilisation"
          checked={formData?.acceptTerms}
          onChange={(e) => handleInputChange('acceptTerms', e?.target?.checked)}
          error={errors?.acceptTerms}
          required
        />
        
        <Checkbox
          label="Je souhaite recevoir des emails marketing et des conseils de design"
          description="Recevez nos dernières actualités et conseils pour améliorer vos designs"
          checked={formData?.acceptMarketing}
          onChange={(e) => handleInputChange('acceptMarketing', e?.target?.checked)}
        />
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
        className="mt-8"
      >
        {isLoading ? 'Création en cours...' : 'Créer mon Compte'}
      </Button>
    </form>
  );
};

export default RegistrationForm;