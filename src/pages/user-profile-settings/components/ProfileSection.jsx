import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = ({ userProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: userProfile?.name,
    email: userProfile?.email,
    bio: userProfile?.bio,
    location: userProfile?.location,
    website: userProfile?.website
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
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
    
    if (!editData?.name?.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!editData?.email?.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/?.test(editData?.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (editData?.website && !editData?.website?.startsWith('http')) {
      newErrors.website = 'L\'URL doit commencer par http:// ou https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdateProfile(editData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: userProfile?.name,
      email: userProfile?.email,
      bio: userProfile?.bio,
      location: userProfile?.location,
      website: userProfile?.website
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="User" size={24} className="mr-2 text-primary" />
          Profil Utilisateur
        </h2>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Modifier
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-4 border-primary/20">
              <Image
                src={userProfile?.avatar}
                alt="Photo de profil"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-elevation-2 hover:bg-primary/90 transition-micro">
              <Icon name="Camera" size={16} color="white" />
            </button>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium text-foreground">{userProfile?.name}</h3>
            <p className="text-muted-foreground">{userProfile?.email}</p>
            <div className="flex items-center mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                <Icon name="Crown" size={12} className="mr-1" />
                {userProfile?.accountType}
              </span>
              <span className="ml-3 text-sm text-muted-foreground">
                Membre depuis {userProfile?.memberSince}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nom complet"
            type="text"
            value={isEditing ? editData?.name : userProfile?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            disabled={!isEditing}
            error={errors?.name}
            required
            className="w-full"
          />

          <Input
            label="Adresse email"
            type="email"
            value={isEditing ? editData?.email : userProfile?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            error={errors?.email}
            required
            className="w-full"
          />

          <Input
            label="Localisation"
            type="text"
            value={isEditing ? editData?.location : userProfile?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            disabled={!isEditing}
            placeholder="Ville, Pays"
            className="w-full"
          />

          <Input
            label="Site web"
            type="url"
            value={isEditing ? editData?.website : userProfile?.website}
            onChange={(e) => handleInputChange('website', e?.target?.value)}
            disabled={!isEditing}
            error={errors?.website}
            placeholder="https://votre-site.com"
            className="w-full"
          />
        </div>

        {/* Bio Section */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Biographie
          </label>
          <textarea
            value={isEditing ? editData?.bio : userProfile?.bio}
            onChange={(e) => handleInputChange('bio', e?.target?.value)}
            disabled={!isEditing}
            rows={4}
            maxLength={500}
            placeholder="Parlez-nous de vous et de votre expérience en design..."
            className={`w-full px-3 py-2 border rounded-lg resize-none transition-micro ${
              isEditing 
                ? 'border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent' 
                : 'border-border bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-muted-foreground">
              Décrivez votre style et votre expérience
            </p>
            <span className="text-xs text-muted-foreground">
              {(isEditing ? editData?.bio : userProfile?.bio)?.length}/500
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              iconName="Check"
              iconPosition="left"
              onClick={handleSave}
              className="sm:w-auto"
            >
              Enregistrer les modifications
            </Button>
            <Button
              variant="outline"
              iconName="X"
              iconPosition="left"
              onClick={handleCancel}
              className="sm:w-auto"
            >
              Annuler
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;