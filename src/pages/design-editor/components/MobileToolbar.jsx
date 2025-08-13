import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileToolbar = ({ onToolSelect, activeCategory, onAddElement }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const mobileFileInputRef = useRef(null);

  const quickTools = [
    { id: 'text', name: 'Texte', icon: 'Type' },
    { id: 'shapes', name: 'Formes', icon: 'Square' },
    { id: 'images', name: 'Images', icon: 'Image' },
    { id: 'colors', name: 'Couleurs', icon: 'Palette' }
  ];

  const expandedTools = [
    { id: 'templates', name: 'Modèles', icon: 'Layout' },
    { id: 'effects', name: 'Effets', icon: 'Sparkles' },
    { id: 'layers', name: 'Calques', icon: 'Layers' },
    { id: 'export', name: 'Export', icon: 'Download' }
  ];

  const handleToolClick = (toolId) => {
    onToolSelect(toolId);
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  const handleMobileImageUpload = () => {
    if (mobileFileInputRef?.current) {
      mobileFileInputRef?.current?.click();
    }
  };

  const handleMobileFileChange = (event) => {
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
      console.log('Fichier sélectionné (mobile):', file?.name);
      console.log('URL de prévisualisation:', imageUrl);
      
      // Reset input for future uploads
      event.target.value = '';
    }
  };

  const handleMobileDragOver = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
  };

  const handleMobileDrop = (event) => {
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
      console.log('Fichier déposé (mobile):', file?.name);
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

  const handleAddShape = (shapeName) => {
    const newShapeElement = {
      id: Date.now(),
      type: 'shape',
      shapeType: shapeName?.toLowerCase(),
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
    console.log('Couleur sélectionnée (mobile):', color);
  };

  return (
    <>
      {/* Mobile Bottom Toolbar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-pb">
        <div className="flex items-center justify-around px-2 py-2">
          {quickTools?.map((tool) => (
            <Button
              key={tool?.id}
              variant={activeCategory === tool?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => handleToolClick(tool?.id)}
              className="flex flex-col items-center space-y-1 min-h-[48px] px-3"
            >
              <Icon name={tool?.icon} size={18} />
              <span className="text-xs">{tool?.name}</span>
            </Button>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-col items-center space-y-1 min-h-[48px] px-3"
          >
            <Icon name={isExpanded ? "X" : "MoreHorizontal"} size={18} />
            <span className="text-xs">Plus</span>
          </Button>
        </div>
        
        {/* Expanded Tools */}
        {isExpanded && (
          <div className="border-t border-border bg-card">
            <div className="grid grid-cols-4 gap-1 p-2">
              {expandedTools?.map((tool) => (
                <Button
                  key={tool?.id}
                  variant={activeCategory === tool?.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleToolClick(tool?.id)}
                  className="flex flex-col items-center space-y-1 min-h-[48px]"
                >
                  <Icon name={tool?.icon} size={18} />
                  <span className="text-xs">{tool?.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Mobile Tool Panel Overlay */}
      {activeCategory && (
        <div className="lg:hidden fixed inset-0 top-32 bottom-16 bg-card z-40 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {quickTools?.find(t => t?.id === activeCategory)?.name || 
                 expandedTools?.find(t => t?.id === activeCategory)?.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToolSelect(null)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            {/* Tool Content */}
            <div className="space-y-4">
              {activeCategory === 'text' && (
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    iconName="Plus"
                    onClick={handleAddText}
                  >
                    Ajouter du texte
                  </Button>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground">Police</label>
                      <select 
                        className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground"
                        onChange={(e) => console.log('Police modifiée:', e?.target?.value)}
                      >
                        <option>Arial</option>
                        <option>Helvetica</option>
                        <option>Times New Roman</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground">Taille</label>
                      <input
                        type="range"
                        min="8"
                        max="72"
                        defaultValue="16"
                        className="mt-1 w-full"
                        onChange={(e) => console.log('Taille modifiée:', e?.target?.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        iconName="Bold"
                        onClick={() => console.log('Gras appliqué')}
                      >
                        Gras
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        iconName="Italic"
                        onClick={() => console.log('Italique appliqué')}
                      >
                        Italique
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        iconName="Underline"
                        onClick={() => console.log('Souligné appliqué')}
                      >
                        Souligné
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeCategory === 'shapes' && (
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'Rectangle', icon: 'Square' },
                    { name: 'Cercle', icon: 'Circle' },
                    { name: 'Triangle', icon: 'Triangle' },
                    { name: 'Étoile', icon: 'Star' },
                    { name: 'Cœur', icon: 'Heart' },
                    { name: 'Flèche', icon: 'ArrowRight' }
                  ]?.map((shape) => (
                    <Button
                      key={shape?.name}
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2"
                      onClick={() => handleAddShape(shape?.name)}
                    >
                      <Icon name={shape?.icon} size={24} />
                      <span className="text-xs">{shape?.name}</span>
                    </Button>
                  ))}
                </div>
              )}
              
              {activeCategory === 'images' && (
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    iconName="Upload"
                    onClick={handleMobileImageUpload}
                  >
                    Télécharger une image
                  </Button>
                  
                  <input
                    ref={mobileFileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/gif"
                   
                    style={{ display: 'none' }}
                    onChange={handleMobileFileChange}
                  />
                  
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onDragOver={handleMobileDragOver}
                    onDrop={handleMobileDrop}
                    onClick={handleMobileImageUpload}
                  >
                    <Icon name="Image" size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Glissez-déposez vos images ici
                    </p>
                  </div>
                </div>
              )}
              
              {activeCategory === 'colors' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-2">
                    {['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
                      '#FF6B35', '#F7931E', '#FFD23F', '#EE4B2B', '#C21807', '#8B0000']?.map((color) => (
                      <button
                        key={color}
                        className="w-12 h-12 rounded-lg border border-border hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                      />
                    ))}
                  </div>
                  
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
              )}
            </div>
          </div>
        </div>
      )}
      {/* Spacer for bottom toolbar */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default MobileToolbar;