import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EditorHeader = () => {
  const navigate = useNavigate();
  const [designTitle, setDesignTitle] = useState('Nouveau Design');
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved'); // saved, saving, unsaved
  const [showActionMenu, setShowActionMenu] = useState(false);

  const handleBack = () => {
    navigate('/main-dashboard');
  };

  const handleTitleEdit = () => {
    setIsEditing(true);
  };

  const handleTitleSave = (e) => {
    if (e?.key === 'Enter' || e?.type === 'blur') {
      setIsEditing(false);
      setSaveStatus('saving');
      setTimeout(() => setSaveStatus('saved'), 1000);
    }
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 1500);
  };

  const handlePreview = () => {
    navigate('/design-preview-export');
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting design...');
  };

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return <Icon name="Loader2" size={16} className="animate-spin text-warning" />;
      case 'saved':
        return <Icon name="Check" size={16} className="text-success" />;
      case 'unsaved':
        return <Icon name="AlertCircle" size={16} className="text-warning" />;
      default:
        return null;
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Sauvegarde...';
      case 'saved':
        return 'Sauvegardé';
      case 'unsaved':
        return 'Non sauvegardé';
      default:
        return '';
    }
  };

  const actionMenuItems = [
    { id: 'duplicate', label: 'Dupliquer le design', icon: 'Copy' },
    { id: 'template', label: 'Sauver comme modèle', icon: 'Bookmark' },
    { id: 'share', label: 'Partager', icon: 'Share2' },
    { id: 'delete', label: 'Supprimer', icon: 'Trash2', variant: 'destructive' }
  ];

  return (
    <div className="fixed top-16 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="hover:bg-muted"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Palette" size={16} color="white" />
          </div>
          
          <div className="flex flex-col">
            {isEditing ? (
              <input
                type="text"
                value={designTitle}
                onChange={(e) => setDesignTitle(e?.target?.value)}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleSave}
                className="text-lg font-semibold bg-transparent border-none outline-none focus:ring-2 focus:ring-primary rounded px-1"
                autoFocus
              />
            ) : (
              <button
                onClick={handleTitleEdit}
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors text-left"
              >
                {designTitle}
              </button>
            )}
            
            <div className="flex items-center space-x-2">
              {getSaveStatusIcon()}
              <span className="text-xs text-muted-foreground">
                {getSaveStatusText()}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                Modifié il y a 2 min
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Center Section - Quick Actions */}
      <div className="hidden md:flex items-center space-x-2">
        <Button variant="outline" size="sm" iconName="Undo2">
          Annuler
        </Button>
        <Button variant="outline" size="sm" iconName="Redo2">
          Refaire
        </Button>
        <div className="w-px h-6 bg-border mx-2" />
        <Button variant="outline" size="sm" iconName="ZoomIn">
          Zoom
        </Button>
        <Button variant="outline" size="sm" iconName="Grid3X3">
          Grille
        </Button>
      </div>
      {/* Right Section */}
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          iconName="Save"
          loading={saveStatus === 'saving'}
          className="hidden sm:flex"
        >
          Sauvegarder
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreview}
          iconName="Eye"
        >
          <span className="hidden sm:inline">Aperçu</span>
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={handleExport}
          iconName="Download"
        >
          <span className="hidden sm:inline">Exporter</span>
        </Button>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowActionMenu(!showActionMenu)}
          >
            <Icon name="MoreVertical" size={20} />
          </Button>
          
          {showActionMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-2 z-50">
              <div className="py-2">
                {actionMenuItems?.map((item) => (
                  <button
                    key={item?.id}
                    onClick={() => {
                      setShowActionMenu(false);
                      // Handle action
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-sm transition-colors ${
                      item?.variant === 'destructive' ?'text-destructive hover:bg-destructive/10' :'text-popover-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;