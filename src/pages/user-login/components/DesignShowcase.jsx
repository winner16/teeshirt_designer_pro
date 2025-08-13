import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const DesignShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const showcaseDesigns = [
    {
      id: 1,
      title: 'Design Minimaliste',
      category: 'Lifestyle',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      sales: '2,500+ ventes',
      revenue: '€15,000',
      designer: 'Sophie L.'
    },
    {
      id: 2,
      title: 'Art Géométrique',
      category: 'Artistique',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop',
      sales: '1,800+ ventes',
      revenue: '€12,400',
      designer: 'Marc D.'
    },
    {
      id: 3,
      title: 'Citation Motivante',
      category: 'Inspiration',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
      sales: '3,200+ ventes',
      revenue: '€18,900',
      designer: 'Julie M.'
    },
    {
      id: 4,
      title: 'Design Vintage',
      category: 'Rétro',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=400&h=400&fit=crop',
      sales: '1,400+ ventes',
      revenue: '€9,800',
      designer: 'Thomas R.'
    }
  ];

  const categories = [
    { name: 'Lifestyle', count: 1250, color: 'bg-blue-500' },
    { name: 'Artistique', count: 890, color: 'bg-purple-500' },
    { name: 'Inspiration', count: 2100, color: 'bg-green-500' },
    { name: 'Rétro', count: 750, color: 'bg-orange-500' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showcaseDesigns?.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [showcaseDesigns?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % showcaseDesigns?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + showcaseDesigns?.length) % showcaseDesigns?.length);
  };

  return (
    <div className="space-y-8">
      {/* Hero Showcase */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-elevation-2 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Designs à Succès
            </h2>
            <p className="text-sm text-muted-foreground">
              Créés par notre communauté de designers
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-micro focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Design précédent"
            >
              <Icon name="ChevronLeft" size={16} color="currentColor" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-micro focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Design suivant"
            >
              <Icon name="ChevronRight" size={16} color="currentColor" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {showcaseDesigns?.map((design) => (
                <div key={design?.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="relative group">
                      <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                        <Image
                          src={design?.image}
                          alt={design?.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          {design?.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {design?.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Par {design?.designer}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-success/10 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
                            <span className="text-xs font-medium text-success">Ventes</span>
                          </div>
                          <p className="text-sm font-semibold text-foreground">
                            {design?.sales}
                          </p>
                        </div>
                        
                        <div className="bg-accent/10 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <Icon name="DollarSign" size={16} color="var(--color-accent)" />
                            <span className="text-xs font-medium text-accent">Revenus</span>
                          </div>
                          <p className="text-sm font-semibold text-foreground">
                            {design?.revenue}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {showcaseDesigns?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-micro ${
                  index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Categories Overview */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Grid3X3" size={20} color="var(--color-primary)" className="mr-2" />
          Catégories Populaires
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {categories?.map((category, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-micro">
              <div className={`w-3 h-3 rounded-full ${category?.color}`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {category?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {category?.count?.toLocaleString('fr-FR')} designs
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-border">
        <div className="text-center space-y-2">
          <Icon name="Award" size={32} color="var(--color-primary)" className="mx-auto" />
          <h3 className="text-lg font-semibold text-foreground">
            Rejoignez les Créateurs à Succès
          </h3>
          <p className="text-sm text-muted-foreground">
            Nos designers gagnent en moyenne €1,200/mois
          </p>
        </div>
      </div>
    </div>
  );
};

export default DesignShowcase;