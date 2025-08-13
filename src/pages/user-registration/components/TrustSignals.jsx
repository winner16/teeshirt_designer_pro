import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Sécurité Garantie',
      description: 'Vos données sont protégées par un chiffrement de niveau bancaire'
    },
    {
      icon: 'Users',
      title: '50,000+ Designers',
      description: 'Rejoignez une communauté active de créateurs professionnels'
    },
    {
      icon: 'Award',
      title: 'Certifié RGPD',
      description: 'Conforme aux réglementations européennes de protection des données'
    },
    {
      icon: 'Zap',
      title: 'Démarrage Rapide',
      description: 'Commencez à créer vos designs en moins de 2 minutes'
    }
  ];

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Designer Freelance',
      location: 'Paris, France',
      content: `Grâce à TeeShirt Designer Pro, j'ai pu créer plus de 200 designs acceptés sur Amazon Merch. L'interface est intuitive et les outils sont parfaits pour les créateurs professionnels.`,
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Jean-Luc Martin',
      role: 'Entrepreneur',
      location: 'Lyon, France',
      content: `En 6 mois, j'ai généré plus de 3000€ de revenus passifs. Les templates et les conseils de compliance Amazon sont excellents.`,
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Designers Actifs' },
    { value: '1M+', label: 'Designs Créés' },
    { value: '95%', label: 'Taux d\'Acceptation' },
    { value: '24/7', label: 'Support Client' }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={feature?.icon} size={16} color="var(--color-primary)" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-primary/5 rounded-lg border border-primary/10">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {stat?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground text-center mb-6">
          Ce que disent nos utilisateurs
        </h3>
        {testimonials?.map((testimonial, index) => (
          <div key={index} className="p-4 bg-card rounded-lg border border-border shadow-sm">
            <div className="flex items-start space-x-3">
              <img
                src={testimonial?.avatar}
                alt={testimonial?.name}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    {testimonial?.name}
                  </h4>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {testimonial?.role}
                  </span>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={12} color="var(--color-accent)" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">
                    {testimonial?.location}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {testimonial?.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 py-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} color="var(--color-success)" />
          <span className="text-xs text-muted-foreground">SSL Sécurisé</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} color="var(--color-success)" />
          <span className="text-xs text-muted-foreground">RGPD Conforme</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span className="text-xs text-muted-foreground">Certifié EU</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;