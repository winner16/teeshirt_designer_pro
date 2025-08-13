import React from 'react';
import Icon from '../../../components/AppIcon';

const ColorSelector = ({ 
  selectedColor = "white", 
  onColorChange, 
  colors = [] 
}) => {
  const handleColorSelect = (color) => {
    onColorChange(color?.value);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Palette" size={20} color="currentColor" className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Couleurs du T-Shirt</h3>
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-3">
        {colors?.map((color) => (
          <button
            key={color?.value}
            onClick={() => handleColorSelect(color)}
            className={`relative w-12 h-12 rounded-lg border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
              selectedColor === color?.value 
                ? 'border-primary shadow-elevation-2' 
                : 'border-border hover:border-muted-foreground'
            }`}
            style={{ backgroundColor: color?.hex }}
            aria-label={`Sélectionner la couleur ${color?.name}`}
            title={color?.name}
          >
            {selectedColor === color?.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon 
                  name="Check" 
                  size={16} 
                  color={color?.value === 'white' || color?.value === 'yellow' ? '#000000' : '#ffffff'} 
                  strokeWidth={3}
                />
              </div>
            )}
          </button>
        ))}
      </div>
      {/* Selected Color Info */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-3">
          <div 
            className="w-6 h-6 rounded border border-border"
            style={{ backgroundColor: colors?.find(c => c?.value === selectedColor)?.hex || '#ffffff' }}
          />
          <div>
            <p className="text-sm font-medium text-foreground">
              {colors?.find(c => c?.value === selectedColor)?.name || 'Blanc'}
            </p>
            <p className="text-xs text-muted-foreground">
              Code: {colors?.find(c => c?.value === selectedColor)?.hex || '#ffffff'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;