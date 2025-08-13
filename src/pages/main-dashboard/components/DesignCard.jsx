import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DesignCard = ({ design, onEdit, onPreview, onDelete, onDuplicate }) => {
  const [showMenu, setShowMenu] = useState(false);

  const statusColors = {
    draft: 'bg-muted text-muted-foreground',
    submitted: 'bg-warning text-warning-foreground',
    approved: 'bg-success text-success-foreground',
    rejected: 'bg-error text-error-foreground'
  };

  const statusLabels = {
    draft: 'Brouillon',
    submitted: 'Soumis',
    approved: 'Approuvé',
    rejected: 'Rejeté'
  };

  const complianceColors = {
    compliant: 'text-success',
    warning: 'text-warning',
    non_compliant: 'text-error'
  };

  const complianceIcons = {
    compliant: 'CheckCircle',
    warning: 'AlertTriangle',
    non_compliant: 'XCircle'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuAction = (action) => {
    setShowMenu(false);
    switch (action) {
      case 'edit':
        onEdit(design);
        break;
      case 'preview':
        onPreview(design);
        break;
      case 'duplicate':
        onDuplicate(design);
        break;
      case 'delete':
        onDelete(design);
        break;
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 border border-border overflow-hidden hover-lift transition-micro">
      {/* Design Preview */}
      <div className="relative aspect-square bg-muted">
        <Image
          src={design?.thumbnail}
          alt={design?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors?.[design?.status]}`}>
            {statusLabels?.[design?.status]}
          </span>
        </div>
        <div className="absolute bottom-2 left-2">
          <Icon
            name={complianceIcons?.[design?.compliance]}
            size={20}
            color="currentColor"
            className={complianceColors?.[design?.compliance]}
          />
        </div>
      </div>
      {/* Design Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-sm line-clamp-2">{design?.title}</h3>
          <div className="relative">
            <button
              onClick={handleMenuToggle}
              className="p-1 rounded-lg hover:bg-muted transition-micro focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Icon name="MoreVertical" size={16} color="currentColor" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-8 w-40 bg-popover border border-border rounded-lg shadow-elevation-2 z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleMenuAction('edit')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                  >
                    <Icon name="Edit" size={14} color="currentColor" />
                    <span>Modifier</span>
                  </button>
                  <button
                    onClick={() => handleMenuAction('preview')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                  >
                    <Icon name="Eye" size={14} color="currentColor" />
                    <span>Aperçu</span>
                  </button>
                  <button
                    onClick={() => handleMenuAction('duplicate')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                  >
                    <Icon name="Copy" size={14} color="currentColor" />
                    <span>Dupliquer</span>
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button
                    onClick={() => handleMenuAction('delete')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-micro"
                  >
                    <Icon name="Trash2" size={14} color="currentColor" />
                    <span>Supprimer</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {design?.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDate(design?.createdAt)}</span>
          <span className="capitalize">{design?.category}</span>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;