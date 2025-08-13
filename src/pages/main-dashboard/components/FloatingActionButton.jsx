import React from 'react';
import Icon from '../../../components/AppIcon';

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-elevation-3 hover-lift transition-micro focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-50"
      aria-label="Créer un nouveau design"
    >
      <Icon name="Plus" size={24} color="currentColor" strokeWidth={2} />
    </button>
  );
};

export default FloatingActionButton;