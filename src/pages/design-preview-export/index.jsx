import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import PreviewHeader from './components/PreviewHeader';
import MockupViewer from './components/MockupViewer';
import ColorSelector from './components/ColorSelector';
import ExportPanel from './components/ExportPanel';
import DesktopMockupGrid from './components/DesktopMockupGrid';
import QualityAssurance from './components/QualityAssurance';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DesignPreviewExport = () => {
  const navigate = useNavigate();
  const [currentMockup, setCurrentMockup] = useState(0);
  const [selectedColor, setSelectedColor] = useState('white');
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [lastSaved, setLastSaved] = useState('Il y a 2 minutes');

  // Mock data for t-shirt colors
  const tshirtColors = [
    { value: 'white', name: 'Blanc', hex: '#FFFFFF' },
    { value: 'black', name: 'Noir', hex: '#000000' },
    { value: 'navy', name: 'Bleu Marine', hex: '#1E3A8A' },
    { value: 'red', name: 'Rouge', hex: '#DC2626' },
    { value: 'green', name: 'Vert', hex: '#16A34A' },
    { value: 'yellow', name: 'Jaune', hex: '#EAB308' },
    { value: 'purple', name: 'Violet', hex: '#7C3AED' },
    { value: 'pink', name: 'Rose', hex: '#EC4899' },
    { value: 'gray', name: 'Gris', hex: '#6B7280' },
    { value: 'orange', name: 'Orange', hex: '#EA580C' },
    { value: 'brown', name: 'Marron', hex: '#92400E' },
    { value: 'teal', name: 'Sarcelle', hex: '#0D9488' }
  ];

  // Mock data for mockups
  const mockups = [
    {
      name: 'Vue Frontale - Homme',
      description: 'T-shirt homme vue de face',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop'
    },
    {
      name: 'Vue Frontale - Femme',
      description: 'T-shirt femme vue de face',
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=100&h=100&fit=crop'
    },
    {
      name: 'Vue Arrière - Homme',
      description: 'T-shirt homme vue de dos',
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=100&h=100&fit=crop'
    },
    {
      name: 'Vue Arrière - Femme',
      description: 'T-shirt femme vue de dos',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop'
    },
    {
      name: 'Vue Lifestyle',
      description: 'Mise en situation lifestyle',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop'
    },
    {
      name: 'Vue Détaillée',
      description: 'Gros plan sur le design',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=600&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=100&h=100&fit=crop'
    }
  ];

  // Mock design specifications
  const designSpecs = {
    width: 4500,
    height: 5400,
    dpi: 300,
    colorProfile: 'sRGB',
    fileSize: '2.4 MB'
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved('À l\'instant');
    }, 1500);
  };

  const handleExport = async (exportSettings) => {
    setIsExporting(true);
    // Simulate export operation
    setTimeout(() => {
      setIsExporting(false);
      setIsExportPanelOpen(false);
      // Show success message or download file
      console.log('Export completed with settings:', exportSettings);
    }, 2000);
  };

  const handleMockupChange = (index) => {
    setCurrentMockup(index);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const toggleExportPanel = () => {
    setIsExportPanelOpen(!isExportPanelOpen);
  };

  const handleBackToEditor = () => {
    navigate('/design-editor');
  };

  // Update last saved time periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const savedTime = new Date(now.getTime() - 2 * 60 * 1000); // 2 minutes ago
      const diff = Math.floor((now - savedTime) / 60000);
      setLastSaved(`Il y a ${diff} minute${diff > 1 ? 's' : ''}`);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader onToggleCollapse={() => {}} />
      
      {/* Preview Header */}
      <PreviewHeader
        designTitle="Design T-Shirt Créatif"
        lastSaved={lastSaved}
        onSave={handleSave}
        onExport={toggleExportPanel}
        isSaving={isSaving}
        isExporting={isExporting}
      />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-8rem)]">
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Back to Editor Button */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBackToEditor}
              iconName="ArrowLeft"
              iconPosition="left"
              size="sm"
            >
              Retour à l'Éditeur
            </Button>
            
            <Button
              variant="default"
              onClick={toggleExportPanel}
              iconName="Download"
              iconPosition="left"
              size="sm"
              className="lg:hidden"
            >
              Exporter
            </Button>
          </div>

          {/* Mobile/Tablet Mockup Viewer */}
          <div className="lg:hidden">
            <MockupViewer
              currentMockup={currentMockup}
              onMockupChange={handleMockupChange}
              selectedColor={selectedColor}
              mockups={mockups}
            />
          </div>

          {/* Desktop Mockup Grid */}
          <DesktopMockupGrid
            mockups={mockups}
            selectedColor={selectedColor}
            onMockupSelect={handleMockupChange}
            selectedMockup={currentMockup}
          />

          {/* Color Selector */}
          <ColorSelector
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            colors={tshirtColors}
          />

          {/* Quality Assurance - Desktop Only */}
          <div className="hidden lg:block">
            <QualityAssurance designSpecs={designSpecs} />
          </div>

          {/* Mobile Quality Summary */}
          <div className="lg:hidden bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} color="currentColor" className="text-success" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Design Conforme</p>
                  <p className="text-xs text-muted-foreground">Prêt pour Amazon Merch</p>
                </div>
              </div>
              <div className="px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                100%
              </div>
            </div>
          </div>
        </div>

        {/* Export Panel - Desktop Sidebar */}
        <div className="hidden lg:block w-96 border-l border-border">
          <ExportPanel
            isOpen={true}
            onClose={() => {}}
            onExport={handleExport}
            isExporting={isExporting}
          />
        </div>
      </div>

      {/* Mobile Export Panel */}
      <div className="lg:hidden">
        <ExportPanel
          isOpen={isExportPanelOpen}
          onClose={() => setIsExportPanelOpen(false)}
          onExport={handleExport}
          isExporting={isExporting}
        />
      </div>

      <MobileBottomNav />
      
      {/* Mobile Bottom Spacer */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default DesignPreviewExport;