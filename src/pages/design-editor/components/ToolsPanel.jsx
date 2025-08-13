import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ToolsPanel = ({ isCollapsed, onToggleCollapse, activeCategory, onCategoryChange, onAddElement }) => {
  const [expandedTool, setExpandedTool] = useState(null);
  const fileInputRef = useRef(null);

  const toolCategories = [
    {
      id: 'text',
      name: 'Texte',
      icon: 'Type',
      description: 'Ajouter et modifier du texte'
    },
    {
      id: 'shapes',
      name: 'Formes',
      icon: 'Square',
      description: 'Formes géométriques'
    },
    {
      id: 'images',
      name: 'Images',
      icon: 'Image',
      description: 'Télécharger des images'
    },
    {
      id: 'templates',
      name: 'Modèles',
      icon: 'Layout',
      description: 'Designs pré-faits'
    },
    {
      id: 'colors',
      name: 'Couleurs',
      icon: 'Palette',
      description: 'Palette de couleurs'
    }
  ];

  const textTools = [
    { id: 'font-family', name: 'Police', type: 'select', options: ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana'] },
    { id: 'font-size', name: 'Taille', type: 'slider', min: 8, max: 72, value: 16 },
    { id: 'font-weight', name: 'Graisse', type: 'buttons', options: ['Normal', 'Gras'] },
    { id: 'text-align', name: 'Alignement', type: 'buttons', options: ['Gauche', 'Centre', 'Droite'] }
  ];

  const shapeTools = [
    { id: 'rectangle', name: 'Rectangle', icon: 'Square' },
    { id: 'circle', name: 'Cercle', icon: 'Circle' },
    { id: 'triangle', name: 'Triangle', icon: 'Triangle' },
    { id: 'star', name: 'Étoile', icon: 'Star' },
    { id: 'heart', name: 'Cœur', icon: 'Heart' },
    { id: 'arrow', name: 'Flèche', icon: 'ArrowRight' }
  ];

  const colorPalettes = [
    { name: 'Couleurs principales', colors: ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'] },
    { name: 'Tons chauds', colors: ['#FF6B35', '#F7931E', '#FFD23F', '#EE4B2B', '#C21807', '#8B0000'] },
    { name: 'Tons froids', colors: ['#4A90E2', '#50C878', '#40E0D0', '#6495ED', '#00CED1', '#4169E1'] },
    { name: 'Pastels', colors: ['#FFB6C1', '#98FB98', '#87CEEB', '#DDA0DD', '#F0E68C', '#FFA07A'] }
  ];

  const handleCategoryClick = (categoryId) => {
    if (activeCategory === categoryId) {
      onCategoryChange(null);
    } else {
      onCategoryChange(categoryId);
    }
  };

  const handleImageUpload = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.click();
    }
  };

  const handleFileChange = (event) => {
    const files = event?.target?.files;
    if (files && files?.length > 0) {
      const file = files?.[0];
      
      // Validate file type
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
      if (!allowedTypes?.includes(file?.type)) {
        alert('Seuls les fichiers PNG, JPG, JPEG et GIF sont autorisés.');
        return;
      }
      
      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file?.size > maxSize) {
        alert('Le fichier ne peut pas dépasser 10MB.');
        return;
      }
      
      // Create URL for preview/use
      const imageUrl = URL.createObjectURL(file);
      
      // Here you would typically:
      // 1. Upload to server/cloud storage
      // 2. Add image to canvas
      // 3. Save to recent images
      console.log('Fichier sélectionné:', file?.name);
      console.log('URL de prévisualisation:', imageUrl);
      
      // Reset input for future uploads
      event.target.value = '';
    }
  };

  const handleDragOver = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
  };

  const handleDrop = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    
    const files = event?.dataTransfer?.files;
    if (files && files?.length > 0) {
      const file = files?.[0];
      
      // Validate file type
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
      if (!allowedTypes?.includes(file?.type)) {
        alert('Seuls les fichiers PNG, JPG, JPEG et GIF sont autorisés.');
        return;
      }
      
      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file?.size > maxSize) {
        alert('Le fichier ne peut pas dépasser 10MB.');
        return;
      }
      
      // Create URL for preview/use
      const imageUrl = URL.createObjectURL(file);
      
      // Here you would typically process the dropped file
      console.log('Fichier déposé:', file?.name);
      console.log('URL de prévisualisation:', imageUrl);
    }
  };

  const handleAddText = () => {
    const newTextElement = {
      id: Date.now(),
      type: 'text',
      content: 'Nouveau Texte',
      x: Math.random() * 200 + 50,
      y: Math.random() * 200 + 100,
      fontSize: 24,
      color: '#000000',
      fontFamily: 'Arial',
      rotation: 0
    };
    onAddElement?.(newTextElement);
  };

  const handleAddShape = (shapeType) => {
    const newShapeElement = {
      id: Date.now(),
      type: 'shape',
      shapeType: shapeType,
      x: Math.random() * 200 + 50,
      y: Math.random() * 200 + 100,
      width: 80,
      height: 80,
      color: '#000000',
      rotation: 0
    };
    onAddElement?.(newShapeElement);
  };

  const handleColorSelect = (color) => {
    // For now, we'll just log the selected color // In a full implementation, this would update the selected element's color
    console.log('Couleur sélectionnée:', color);
  };

  const handleFontChange = (property, value) => {
    // For now, we'll just log the font change // In a full implementation, this would update the selected element's font properties
    console.log('Propriété de police modifiée:', property, value);
  };

  const renderTextTools = () => (
    <div className="space-y-4">
      <div className="mb-4">
        <Button
          variant="outline"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          onClick={handleAddText}
        >
          Ajouter du texte
        </Button>
      </div>
      
      {textTools?.map((tool) => (
        <div key={tool?.id} className="space-y-2">
          <label className="text-sm font-medium text-foreground">{tool?.name}</label>
          {tool?.type === 'select' && (
            <select 
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground"
              onChange={(e) => handleFontChange('fontFamily', e?.target?.value)}
            >
              {tool?.options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
          {tool?.type === 'slider' && (
            <div className="space-y-2">
              <input
                type="range"
                min={tool?.min}
                max={tool?.max}
                defaultValue={tool?.value}
                className="w-full"
                onChange={(e) => handleFontChange('fontSize', e?.target?.value)}
              />
              <div className="text-xs text-muted-foreground text-center">{tool?.value}px</div>
            </div>
          )}
          {tool?.type === 'buttons' && (
            <div className="flex space-x-2">
              {tool?.options?.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleFontChange(tool?.id, option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderShapeTools = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {shapeTools?.map((shape) => (
          <Button
            key={shape?.id}
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2"
            onClick={() => handleAddShape(shape?.id)}
          >
            <Icon name={shape?.icon} size={24} />
            <span className="text-xs">{shape?.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  const renderImageTools = () => (
    <div className="space-y-4">
      <Button
        variant="outline"
        fullWidth
        iconName="Upload"
        iconPosition="left"
        onClick={handleImageUpload}
      >
        Télécharger une image
      </Button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/gif"
       
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      
      <div 
        className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleImageUpload}
      >
        <Icon name="Image" size={32} className="mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">Glissez-déposez vos images ici</p>
        <p className="text-xs text-muted-foreground">PNG, JPG jusqu'à 10MB</p>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Images récentes</h4>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6]?.map((i) => (
            <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80">
              <Icon name="Image" size={16} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTemplateTools = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Modèles populaires</h4>
        <Button variant="ghost" size="sm" iconName="Search">
          Rechercher
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5, 6]?.map((i) => (
          <div 
            key={i} 
            className="aspect-square bg-muted rounded-lg p-2 cursor-pointer hover:bg-muted/80 border border-border"
            onClick={() => console.log(`Modèle ${i} sélectionné`)}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded flex items-center justify-center">
              <span className="text-xs font-medium">Modèle {i}</span>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="outline" fullWidth iconName="Plus">
        Voir plus de modèles
      </Button>
    </div>
  );

  const renderColorTools = () => (
    <div className="space-y-4">
      {colorPalettes?.map((palette) => (
        <div key={palette?.name} className="space-y-2">
          <h4 className="text-sm font-medium">{palette?.name}</h4>
          <div className="grid grid-cols-6 gap-2">
            {palette?.colors?.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-lg border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      ))}
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Couleur personnalisée</h4>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            className="w-12 h-8 rounded border border-border cursor-pointer"
            defaultValue="#000000"
            onChange={(e) => handleColorSelect(e?.target?.value)}
          />
          <input
            type="text"
            placeholder="#000000"
            className="flex-1 px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
            onBlur={(e) => handleColorSelect(e?.target?.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderToolContent = () => {
    switch (activeCategory) {
      case 'text':
        return renderTextTools();
      case 'shapes':
        return renderShapeTools();
      case 'images':
        return renderImageTools();
      case 'templates':
        return renderTemplateTools();
      case 'colors':
        return renderColorTools();
      default:
        return null;
    }
  };

  if (isCollapsed) {
    return (
      <div className="fixed left-0 top-16 bottom-0 w-16 bg-card border-r border-border z-40 flex flex-col">
        <div className="p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="w-12 h-12"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
        <div className="flex-1 flex flex-col space-y-2 p-2">
          {toolCategories?.map((category) => (
            <Button
              key={category?.id}
              variant={activeCategory === category?.id ? "default" : "ghost"}
              size="icon"
              onClick={() => handleCategoryClick(category?.id)}
              className="w-12 h-12"
              title={category?.name}
            >
              <Icon name={category?.icon} size={20} />
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-16 bottom-0 w-80 bg-card border-r border-border z-40 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Outils de Design</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
      </div>
      <div className="flex-1 flex">
        <div className="w-20 border-r border-border flex flex-col space-y-1 p-2">
          {toolCategories?.map((category) => (
            <Button
              key={category?.id}
              variant={activeCategory === category?.id ? "default" : "ghost"}
              size="icon"
              onClick={() => handleCategoryClick(category?.id)}
              className="w-16 h-16 flex flex-col space-y-1"
              title={category?.description}
            >
              <Icon name={category?.icon} size={20} />
              <span className="text-xs">{category?.name}</span>
            </Button>
          ))}
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          {activeCategory ? (
            <div>
              <div className="mb-4">
                <h3 className="text-base font-medium text-foreground mb-1">
                  {toolCategories?.find(cat => cat?.id === activeCategory)?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {toolCategories?.find(cat => cat?.id === activeCategory)?.description}
                </p>
              </div>
              {renderToolContent()}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Icon name="MousePointer" size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Sélectionnez un outil</h3>
              <p className="text-sm text-muted-foreground">
                Choisissez une catégorie d'outils pour commencer à créer votre design
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsPanel;