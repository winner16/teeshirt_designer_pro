import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CanvasWorkspace = ({ toolsPanelCollapsed, propertiesPanelCollapsed, designElements, onElementsChange, onElementSelect, setDesignElements }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedElement, setSelectedElement] = useState(null);
  const [tshirtColor, setTshirtColor] = useState('#FFFFFF');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const tshirtColors = [
  { name: 'Blanc', value: '#FFFFFF' },
  { name: 'Noir', value: '#000000' },
  { name: 'Rouge', value: '#FF0000' },
  { name: 'Bleu', value: '#0000FF' },
  { name: 'Vert', value: '#008000' },
  { name: 'Jaune', value: '#FFFF00' },
  { name: 'Rose', value: '#FFC0CB' },
  { name: 'Gris', value: '#808080' }];


  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      onElementsChange?.(history?.[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history?.length - 1) {
      setHistoryIndex(historyIndex + 1);
      onElementsChange?.(history?.[historyIndex + 1]);
    }
  };

  const handleSave = () => {
    // In a real implementation, this would save to a server or local storage
    console.log('Design sauvegardé:', designElements);
    alert('Design sauvegardé avec succès !');
  };

  const handleElementClick = (element) => {
    setSelectedElement(element?.id);
    onElementSelect?.(element);
  };

  const handleMouseDown = (e, element) => {
    setIsDragging(true);
    setSelectedElement(element?.id);
    const rect = canvasRef?.current?.getBoundingClientRect();
    setDragStart({
      x: e?.clientX - rect?.left - element?.x,
      y: e?.clientY - rect?.top - element?.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedElement) return;

    const rect = canvasRef?.current?.getBoundingClientRect();
    const newX = e?.clientX - rect?.left - dragStart?.x;
    const newY = e?.clientY - rect?.top - dragStart?.y;

    setDesignElements((prev) => prev?.map((el) =>
    el?.id === selectedElement ?
    { ...el, x: Math.max(0, Math.min(newX, 300)), y: Math.max(0, Math.min(newY, 400)) } :
    el
    ));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, selectedElement, dragStart]);

  const getCanvasStyle = () => {
    let leftOffset = toolsPanelCollapsed ? 64 : 320;
    let rightOffset = propertiesPanelCollapsed ? 0 : 320;

    return {
      left: `${leftOffset}px`,
      right: `${rightOffset}px`,
      width: `calc(100% - ${leftOffset + rightOffset}px)`
    };
  };

  const renderDesignElement = (element) => {
    if (element?.type === 'text') {
      return (
        <span style={{
          fontSize: `${element?.fontSize}px`,
          color: element?.color,
          fontFamily: element?.fontFamily,
          fontWeight: element?.fontWeight || 'normal',
          fontStyle: element?.fontStyle || 'normal',
          textDecoration: element?.textDecoration || 'none'
        }}>
          {element?.content}
        </span>);

    }

    if (element?.type === 'shape') {
      const { shapeType, width, height, color } = element;

      switch (shapeType) {
        case 'rectangle':
          return (
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: color,
                border: `2px solid ${color}`
              }} />);


        case 'cercle':case 'circle':
          return (
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: color,
                borderRadius: '50%'
              }} />);


        case 'triangle':
          return (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${width / 2}px solid transparent`,
                borderRight: `${width / 2}px solid transparent`,
                borderBottom: `${height}px solid ${color}`
              }} />);


        default:
          return (
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: color
              }} />);


      }
    }

    return null;
  };

  return (
    <div
      className="fixed top-16 bottom-0 bg-muted/30 flex flex-col transition-all duration-300"
      style={getCanvasStyle()}>

      {/* Canvas Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Zone de Travail</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">T-shirt:</span>
            <div className="flex space-x-1">
              {tshirtColors?.map((color) =>
              <button
                key={color?.value}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                tshirtColor === color?.value ? 'border-primary scale-110' : 'border-border'}`
                }
                style={{ backgroundColor: color?.value }}
                onClick={() => setTshirtColor(color?.value)}
                title={color?.name} />

              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <Icon name="ZoomOut" size={16} />
          </Button>
          <span className="text-sm font-medium min-w-[60px] text-center">{zoomLevel}%</span>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <Icon name="ZoomIn" size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={handleResetZoom}>
            <Icon name="RotateCcw" size={16} />
          </Button>
        </div>
      </div>
      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="relative">
          {/* T-shirt Mockup */}
          <div
            className="relative bg-white rounded-lg shadow-elevation-2 p-8"
            style={{ transform: `scale(${zoomLevel / 100})` }}>

            <div className="relative">
              {/* T-shirt Shape */}
              <svg
                width="400"
                height="500"
                viewBox="0 0 400 500"
                className="drop-shadow-lg">

                {/* T-shirt body */}
                <path
                  d="M50 150 L50 480 L350 480 L350 150 L320 150 L320 100 L300 80 L100 80 L80 100 L80 150 Z"
                  fill={tshirtColor}
                  stroke="#e5e7eb"
                  strokeWidth="2" />

                {/* T-shirt sleeves */}
                <path
                  d="M50 150 L20 180 L20 220 L50 200 Z"
                  fill={tshirtColor}
                  stroke="#e5e7eb"
                  strokeWidth="2" />

                <path
                  d="M350 150 L380 180 L380 220 L350 200 Z"
                  fill={tshirtColor}
                  stroke="#e5e7eb"
                  strokeWidth="2" />

                {/* Neck opening */}
                <path
                  d="M150 80 Q200 60 250 80 L250 120 Q200 100 150 120 Z"
                  fill="white"
                  stroke="#e5e7eb"
                  strokeWidth="2" />

              </svg>

              {/* Design Canvas */}
              <div
                ref={canvasRef}
                className="absolute top-32 left-12 w-80 h-96 cursor-crosshair"
                style={{
                  background: 'transparent',
                  border: selectedElement ? '2px dashed #2563EB' : '2px dashed transparent'
                }}>

                {/* Design Elements */}
                {designElements?.map((element) =>
                <div
                  key={element?.id}
                  className={`absolute cursor-move select-none ${
                  selectedElement === element?.id ? 'ring-2 ring-primary ring-offset-2' : ''}`
                  }
                  style={{
                    left: `${element?.x}px`,
                    top: `${element?.y}px`,
                    transform: `rotate(${element?.rotation || 0}deg)`
                  }}
                  onClick={() => handleElementClick(element)}
                  onMouseDown={(e) => handleMouseDown(e, element)}>

                    {renderDesignElement(element)}
                    
                    {/* Selection Handles */}
                    {selectedElement === element?.id &&
                  <>
                        <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full cursor-nw-resize" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full cursor-ne-resize" />
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary rounded-full cursor-sw-resize" />
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary rounded-full cursor-se-resize" />
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full cursor-grab" />
                      </>
                  }
                  </div>
                )}

                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas Info */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-elevation-1">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Ruler" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">300 × 400 px</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Layers" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">{designElements?.length} élément(s)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Canvas Footer */}
      <div className="bg-card border-t border-border p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="MousePointer" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Cliquez pour sélectionner, glissez pour déplacer
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Undo2"
            onClick={handleUndo}
            disabled={historyIndex <= 0}>

            Annuler
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Redo2"
            onClick={handleRedo}
            disabled={historyIndex >= history?.length - 1}>

            Refaire
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Save"
            onClick={handleSave}>

            Sauvegarder
          </Button>
        </div>
      </div>
    </div>);

};

export default CanvasWorkspace;