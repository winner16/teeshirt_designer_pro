import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreviewHeader = ({ 
  designTitle = "Mon Design T-Shirt", 
  lastSaved = "Il y a 2 minutes",
  onSave,
  onExport,
  isSaving = false,
  isExporting = false 
}) => {
  return (
    <div className="bg-card border-b border-border px-4 py-3 lg:px-6 lg:py-4">
      <div className="flex items-center justify-between">
        {/* Design Info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg lg:text-xl font-semibold text-foreground truncate">
            {designTitle}
          </h1>
          <div className="flex items-center space-x-2 mt-1">
            <Icon name="Clock" size={14} color="currentColor" className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Dernière sauvegarde: {lastSaved}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
            className="hidden sm:flex"
          >
            Sauvegarder
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={onExport}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
          >
            <span className="hidden sm:inline">Exporter</span>
            <span className="sm:hidden">Export</span>
          </Button>

          {/* Mobile Save Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
            loading={isSaving}
            className="sm:hidden"
            iconName="Save"
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewHeader;