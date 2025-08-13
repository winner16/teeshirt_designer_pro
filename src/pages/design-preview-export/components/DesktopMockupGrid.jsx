import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const DesktopMockupGrid = ({ 
  mockups = [], 
  selectedColor = "white", 
  onMockupSelect,
  selectedMockup = 0 
}) => {
  return (
    <div className="hidden lg:block">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Aperçus Multiples</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Grid3X3" size={16} color="currentColor" />
          <span>{mockups?.length} variations</span>
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {mockups?.map((mockup, index) => (
          <button
            key={index}
            onClick={() => onMockupSelect(index)}
            className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
              index === selectedMockup 
                ? 'border-primary shadow-elevation-2' 
                : 'border-border hover:border-muted-foreground'
            }`}
          >
            <Image
              src={mockup?.image}
              alt={`Aperçu ${mockup?.name}`}
              className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
              <p className="text-sm font-medium">{mockup?.name}</p>
              <p className="text-xs opacity-80">{mockup?.description}</p>
            </div>

            {/* Selected Indicator */}
            {index === selectedMockup && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} color="white" strokeWidth={3} />
              </div>
            )}
          </button>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 flex items-center justify-between p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} color="currentColor" className="text-primary" />
          <span className="text-sm font-medium text-foreground">Actions Rapides</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-xs text-primary hover:underline">
            Tout sélectionner
          </button>
          <span className="text-xs text-muted-foreground">•</span>
          <button className="text-xs text-primary hover:underline">
            Export par lot
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopMockupGrid;