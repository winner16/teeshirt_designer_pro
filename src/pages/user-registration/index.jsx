import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import TrustSignals from './components/TrustSignals';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form', 'verification', 'success'
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Mock credentials for testing
  const mockCredentials = {
    testEmail: 'designer@example.com',
    testPassword: 'Designer123!'
  };

  useEffect(() => {
    // Check if user is already logged in
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/main-dashboard');
    }
  }, [navigate]);

  const handleRegistration = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration logic
      const userData = {
        id: Date.now(),
        email: formData?.email,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        userType: formData?.userType,
        createdAt: new Date()?.toISOString(),
        isVerified: false
      };

      // Store user data
      localStorage.setItem('pendingUserData', JSON.stringify(userData));
      setRegisteredEmail(formData?.email);
      setRegistrationStep('verification');
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegistration = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: Date.now(),
        email: `user@${provider}.com`,
        firstName: 'Utilisateur',
        lastName: provider?.charAt(0)?.toUpperCase() + provider?.slice(1),
        userType: 'designer',
        provider: provider,
        createdAt: new Date()?.toISOString(),
        isVerified: true
      };

      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userData', JSON.stringify(userData));
      
      navigate('/main-dashboard');
      
    } catch (error) {
      console.error('Social registration error:', error);
      alert(`Erreur lors de l'inscription avec ${provider}. Veuillez réessayer.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailVerification = () => {
    const pendingUserData = JSON.parse(localStorage.getItem('pendingUserData') || '{}');
    
    // Mock verification
    const verifiedUserData = {
      ...pendingUserData,
      isVerified: true
    };

    localStorage.setItem('authToken', 'mock-jwt-token');
    localStorage.setItem('userData', JSON.stringify(verifiedUserData));
    localStorage.removeItem('pendingUserData');
    
    setRegistrationStep('success');
    
    // Redirect to dashboard after success message
    setTimeout(() => {
      navigate('/main-dashboard');
    }, 3000);
  };

  const handleLoginRedirect = () => {
    navigate('/user-login');
  };

  const renderVerificationStep = () => (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
        <Icon name="Mail" size={32} color="var(--color-primary)" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Vérifiez votre email
        </h2>
        <p className="text-muted-foreground">
          Nous avons envoyé un lien de vérification à{' '}
          <span className="font-semibold text-foreground">{registeredEmail}</span>
        </p>
      </div>

      <div className="p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground mb-4">
          Cliquez sur le lien dans l'email pour activer votre compte. Si vous ne voyez pas l'email, vérifiez votre dossier spam.
        </p>
        
        {/* Mock verification button for demo */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleEmailVerification}
          className="w-full"
        >
          Simuler la Vérification (Demo)
        </Button>
      </div>

      <div className="flex items-center justify-center space-x-4 text-sm">
        <button
          onClick={() => setRegistrationStep('form')}
          className="text-primary hover:underline focus:outline-none focus:underline"
        >
          Modifier l'email
        </button>
        <span className="text-muted-foreground">•</span>
        <button
          onClick={handleEmailVerification}
          className="text-primary hover:underline focus:outline-none focus:underline"
        >
          Renvoyer l'email
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={32} color="var(--color-success)" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Compte créé avec succès !
        </h2>
        <p className="text-muted-foreground">
          Bienvenue dans TeeShirt Designer Pro. Vous allez être redirigé vers votre tableau de bord.
        </p>
      </div>

      <div className="flex items-center justify-center space-x-2 text-primary">
        <Icon name="Loader2" size={20} className="animate-spin" />
        <span className="text-sm">Redirection en cours...</span>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Inscription - TeeShirt Designer Pro</title>
        <meta name="description" content="Créez votre compte TeeShirt Designer Pro et commencez à concevoir des t-shirts professionnels pour Amazon Merch on Demand." />
        <meta name="keywords" content="inscription, compte, designer, t-shirt, amazon merch" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <RegistrationHeader />
        
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* Left Column - Form */}
              <div className="order-2 lg:order-1">
                <div className="max-w-md mx-auto lg:mx-0">
                  
                  {registrationStep === 'form' && (
                    <>
                      {/* Header */}
                      <div className="text-center lg:text-left mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                          Créez votre compte
                        </h1>
                        <p className="text-muted-foreground">
                          Rejoignez plus de 50,000 designers qui créent des t-shirts professionnels
                        </p>
                      </div>

                      {/* Registration Form */}
                      <div className="space-y-6">
                        <RegistrationForm 
                          onSubmit={handleRegistration}
                          isLoading={isLoading}
                        />
                        
                        <SocialRegistration 
                          onSocialRegister={handleSocialRegistration}
                          isLoading={isLoading}
                        />
                      </div>

                      {/* Login Link */}
                      <div className="text-center mt-8 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          Vous avez déjà un compte ?{' '}
                          <button
                            onClick={handleLoginRedirect}
                            className="text-primary font-medium hover:underline focus:outline-none focus:underline"
                          >
                            Se connecter
                          </button>
                        </p>
                      </div>

                      {/* Mock Credentials Info */}
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          Comptes de démonstration :
                        </h4>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Email: {mockCredentials?.testEmail}</p>
                          <p>Mot de passe: {mockCredentials?.testPassword}</p>
                        </div>
                      </div>
                    </>
                  )}

                  {registrationStep === 'verification' && renderVerificationStep()}
                  {registrationStep === 'success' && renderSuccessStep()}
                </div>
              </div>

              {/* Right Column - Trust Signals & Showcase */}
              <div className="order-1 lg:order-2">
                <div className="sticky top-8">
                  
                  {/* Hero Image */}
                  <div className="relative mb-8 rounded-2xl overflow-hidden shadow-elevation-2">
                    <Image
                      src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop"
                      alt="Designer créant des t-shirts professionnels"
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-xl font-bold mb-2">
                        Créez des designs qui se vendent
                      </h3>
                      <p className="text-sm opacity-90">
                        Outils professionnels pour Amazon Merch on Demand
                      </p>
                    </div>
                  </div>

                  {/* Trust Signals */}
                  <TrustSignals />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/30 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <button className="hover:text-foreground transition-colors">
                  Conditions d'utilisation
                </button>
                <button className="hover:text-foreground transition-colors">
                  Politique de confidentialité
                </button>
                <button className="hover:text-foreground transition-colors">
                  Support
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} TeeShirt Designer Pro. Tous droits réservés.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default UserRegistration;