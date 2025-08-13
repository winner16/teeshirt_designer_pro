import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MockupViewer = ({ 
  currentMockup = 0, 
  onMockupChange, 
  selectedColor = "white",
  mockups = [] 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePrevious = () => {
    if (currentMockup > 0) {
      setIsLoading(true);
      setTimeout(() => {
        onMockupChange(currentMockup - 1);
        setIsLoading(false);
      }, 200);
    }
  };

  const handleNext = () => {
    if (currentMockup < mockups?.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        onMockupChange(currentMockup + 1);
        setIsLoading(false);
      }, 200);
    }
  };

  const currentMockupData = mockups?.[currentMockup] || {};

  return (
    <div className="relative bg-muted rounded-lg overflow-hidden">
      {/* Main Preview */}
      <div className="aspect-square lg:aspect-[4/5] relative bg-gradient-to-br from-gray-100 to-gray-200">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <Image
            src={currentMockupData?.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop"}
            alt={`Aperçu du design - ${currentMockupData?.name || 'Vue principale'}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        )}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          disabled={currentMockup === 0 || isLoading}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          aria-label="Mockup précédent"
        >
          <Icon name="ChevronLeft" size={20} color="white" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentMockup === mockups?.length - 1 || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          aria-label="Mockup suivant"
        >
          <Icon name="ChevronRight" size={20} color="white" />
        </button>

        {/* Mockup Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm font-medium">{currentMockupData?.name || 'Vue principale'}</p>
                <p className="text-xs opacity-80">{currentMockupData?.description || 'Aperçu du design'}</p>
              </div>
              <div className="text-xs opacity-80">
                {currentMockup + 1} / {mockups?.length}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Thumbnail Navigation */}
      <div className="p-4 bg-card">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {mockups?.map((mockup, index) => (
            <button
              key={index}
              onClick={() => onMockupChange(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentMockup 
                  ? 'border-primary shadow-elevation-1' 
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={mockup?.thumbnail || mockup?.image}
                alt={`Miniature ${mockup?.name}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MockupViewer;