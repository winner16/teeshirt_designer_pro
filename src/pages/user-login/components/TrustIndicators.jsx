import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Sécurisé SSL',
      description: 'Chiffrement 256-bit'
    },
    {
      icon: 'Lock',
      title: 'Données protégées',
      description: 'RGPD conforme'
    },
    {
      icon: 'Users',
      title: '10,000+ designers',
      description: 'Nous font confiance'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      role: 'Designer Graphique',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      content: `Grâce à TeeShirt Designer Pro, j'ai vendu plus de 500 designs sur Amazon Merch. L'interface est intuitive et les outils sont professionnels.`,
      rating: 5,
      date: '2025-01-15'
    },
    {
      id: 2,
      name: 'Pierre Martin',
      role: 'Entrepreneur',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      content: `J'ai lancé ma marque de t-shirts en 3 semaines. Les templates et l'export Amazon sont parfaits pour débuter rapidement.`,
      rating: 5,
      date: '2025-01-10'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        color={index < rating ? 'var(--color-accent)' : 'var(--color-muted-foreground)'}
        strokeWidth={0}
        className={index < rating ? 'fill-current' : ''}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="ShieldCheck" size={20} color="var(--color-success)" className="mr-2" />
          Sécurité & Confiance
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg">
                <Icon name={feature?.icon} size={16} color="var(--color-success)" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {feature?.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* User Testimonials */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MessageSquare" size={20} color="var(--color-primary)" className="mr-2" />
          Témoignages
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="border-l-4 border-primary/20 pl-4">
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
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground">
                      {testimonial?.name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {renderStars(testimonial?.rating)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {testimonial?.role}
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {testimonial?.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(testimonial.date)?.toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Stats */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">10K+</p>
            <p className="text-xs text-muted-foreground">Designers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary">50K+</p>
            <p className="text-xs text-muted-foreground">Designs créés</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">€2M+</p>
            <p className="text-xs text-muted-foreground">Revenus générés</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;