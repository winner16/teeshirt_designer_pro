import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import EditorHeader from './components/EditorHeader';
import ToolsPanel from './components/ToolsPanel';
import CanvasWorkspace from './components/CanvasWorkspace';
import PropertiesPanel from './components/PropertiesPanel';
import MobileToolbar from './components/MobileToolbar';

const DesignEditor = () => {
  const [toolsPanelCollapsed, setToolsPanelCollapsed] = useState(false);
  const [propertiesPanelCollapsed, setPropertiesPanelCollapsed] = useState(false);
  const [activeToolCategory, setActiveToolCategory] = useState('text');
  const [isMobile, setIsMobile] = useState(false);
  const [designElements, setDesignElements] = useState([
    {
      id: 1,
      type: 'text',
      content: 'Votre Design Ici',
      x: 150,
      y: 200,
      fontSize: 24,
      color: '#000000',
      fontFamily: 'Arial',
      rotation: 0
    }
  ]);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setToolsPanelCollapsed(true);
        setPropertiesPanelCollapsed(true);
      } else {
        setToolsPanelCollapsed(false);
        setPropertiesPanelCollapsed(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleToolsPanel = () => {
    setToolsPanelCollapsed(!toolsPanelCollapsed);
  };

  const handleTogglePropertiesPanel = () => {
    setPropertiesPanelCollapsed(!propertiesPanelCollapsed);
  };

  const handleToolCategoryChange = (category) => {
    setActiveToolCategory(category);
  };

  const handleMobileToolSelect = (toolId) => {
    setActiveToolCategory(toolId);
  };

  const handleAddElement = (newElement) => {
    setDesignElements(prev => [...prev, newElement]);
  };

  const handleElementsChange = (newElements) => {
    setDesignElements(newElements);
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header - Hidden on mobile for design editor */}
      <div className="hidden lg:block">
        <GlobalHeader onToggleCollapse={() => {}} />
      </div>
      {/* Editor Header */}
      <EditorHeader />
      {/* Main Editor Layout */}
      <div className="relative">
        {/* Desktop Tools Panel */}
        <div className="hidden lg:block">
          <ToolsPanel
            isCollapsed={toolsPanelCollapsed}
            onToggleCollapse={handleToggleToolsPanel}
            activeCategory={activeToolCategory}
            onCategoryChange={handleToolCategoryChange}
            onAddElement={handleAddElement}
          />
        </div>

        {/* Canvas Workspace */}
        <CanvasWorkspace
          toolsPanelCollapsed={isMobile ? true : toolsPanelCollapsed}
          propertiesPanelCollapsed={isMobile ? true : propertiesPanelCollapsed}
          designElements={designElements}
          setDesignElements={setDesignElements}
          onElementsChange={handleElementsChange}
          onElementSelect={handleElementSelect}
        />

        {/* Desktop Properties Panel */}
        <div className="hidden lg:block">
          <PropertiesPanel
            isCollapsed={propertiesPanelCollapsed}
            onToggleCollapse={handleTogglePropertiesPanel}
            selectedElement={selectedElement}
            onElementUpdate={(updatedElement) => {
              setDesignElements(prev => 
                prev?.map(el => el?.id === updatedElement?.id ? updatedElement : el)
              );
            }}
          />
        </div>

        {/* Mobile Toolbar */}
        <MobileToolbar
          onToolSelect={handleMobileToolSelect}
          activeCategory={activeToolCategory}
          onAddElement={handleAddElement}
        />
      </div>
      {/* Mobile Bottom Navigation - Hidden in design editor */}
      <div className="lg:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default DesignEditor;