import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import MetricsCard from './components/MetricsCard';
import QuickActionButton from './components/QuickActionButton';
import DesignCard from './components/DesignCard';
import SidebarWidget from './components/SidebarWidget';
import PerformanceChart from './components/PerformanceChart';
import ComplianceTips from './components/ComplianceTips';
import TrendingCategories from './components/TrendingCategories';
import FloatingActionButton from './components/FloatingActionButton';
import Icon from '../../components/AppIcon';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for metrics
  const metricsData = [
    {
      title: "Total Designs",
      value: "47",
      subtitle: "Créés ce mois",
      icon: "Palette",
      trend: 12,
      color: "primary"
    },
    {
      title: "Soumissions Amazon",
      value: "23",
      subtitle: "En attente d\'approbation",
      icon: "Upload",
      trend: 8,
      color: "warning"
    },
    {
      title: "Revenus",
      value: "1.247,50 €",
      subtitle: "Ce mois-ci",
      icon: "Euro",
      trend: 15,
      color: "success"
    },
    {
      title: "Taux d\'approbation",
      value: "87%",
      subtitle: "Moyenne mensuelle",
      icon: "CheckCircle",
      trend: 3,
      color: "accent"
    }
  ];

  // Mock data for performance chart
  const performanceData = [
    { name: 'Jan', sales: 12 },
    { name: 'Fév', sales: 19 },
    { name: 'Mar', sales: 15 },
    { name: 'Avr', sales: 25 },
    { name: 'Mai', sales: 22 },
    { name: 'Jun', sales: 30 },
    { name: 'Jul', sales: 28 }
  ];

  // Mock data for designs
  const designsData = [
    {
      id: 1,
      title: "Design Motivation Quotidienne",
      thumbnail: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop",
      status: "approved",
      compliance: "compliant",
      category: "motivation",
      tags: ["motivation", "texte", "moderne"],
      createdAt: "2025-01-08T10:30:00Z"
    },
    {
      id: 2,
      title: "Vintage Coffee Lover",
      thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
      status: "submitted",
      compliance: "warning",
      category: "vintage",
      tags: ["vintage", "café", "rétro"],
      createdAt: "2025-01-07T14:15:00Z"
    },
    {
      id: 3,
      title: "Minimaliste Géométrique",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      status: "draft",
      compliance: "compliant",
      category: "minimaliste",
      tags: ["géométrique", "simple", "moderne"],
      createdAt: "2025-01-06T09:45:00Z"
    },
    {
      id: 4,
      title: "Humour Chat Drôle",
      thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
      status: "rejected",
      compliance: "non_compliant",
      category: "humour",
      tags: ["chat", "drôle", "animal"],
      createdAt: "2025-01-05T16:20:00Z"
    },
    {
      id: 5,
      title: "Nature Aventure",
      thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
      status: "approved",
      compliance: "compliant",
      category: "nature",
      tags: ["nature", "aventure", "montagne"],
      createdAt: "2025-01-04T11:10:00Z"
    },
    {
      id: 6,
      title: "Typographie Moderne",
      thumbnail: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      status: "approved",
      compliance: "compliant",
      category: "typographie",
      tags: ["typo", "moderne", "élégant"],
      createdAt: "2025-01-03T13:30:00Z"
    }
  ];

  const quickActions = [
    {
      title: "Nouveau Design",
      description: "Créer un design",
      icon: "Plus",
      color: "primary",
      action: () => navigate('/design-editor')
    },
    {
      title: "Parcourir Templates",
      description: "Modèles prêts",
      icon: "Layout",
      color: "secondary",
      action: () => navigate('/design-editor')
    },
    {
      title: "Vérifier Conformité",
      description: "Analyser designs",
      icon: "Shield",
      color: "success",
      action: () => handleComplianceCheck()
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'Tous', icon: 'Grid' },
    { value: 'approved', label: 'Approuvés', icon: 'CheckCircle' },
    { value: 'submitted', label: 'Soumis', icon: 'Upload' },
    { value: 'draft', label: 'Brouillons', icon: 'Edit' }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleComplianceCheck = () => {
    // Mock compliance check functionality
    alert('Vérification de conformité lancée pour tous vos designs.');
  };

  const handleDesignEdit = (design) => {
    navigate('/design-editor', { state: { designId: design?.id } });
  };

  const handleDesignPreview = (design) => {
    navigate('/design-preview-export', { state: { designId: design?.id } });
  };

  const handleDesignDelete = (design) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${design?.title}" ?`)) {
      // Mock delete functionality
      console.log('Design deleted:', design?.id);
    }
  };

  const handleDesignDuplicate = (design) => {
    // Mock duplicate functionality
    console.log('Design duplicated:', design?.id);
  };

  const filteredDesigns = designsData?.filter(design => 
    selectedFilter === 'all' || design?.status === selectedFilter
  );

  useEffect(() => {
    // Check authentication
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/user-login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader onToggleCollapse={() => {}} />
      <main className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                    Tableau de Bord
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Gérez votre portfolio de designs et suivez vos performances
                  </p>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-2 rounded-lg hover:bg-muted transition-micro focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Actualiser les données"
                >
                  <Icon 
                    name="RefreshCw" 
                    size={20} 
                    color="currentColor" 
                    className={isRefreshing ? 'animate-spin' : ''}
                  />
                </button>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {metricsData?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  subtitle={metric?.subtitle}
                  icon={metric?.icon}
                  trend={metric?.trend}
                  color={metric?.color}
                />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Actions Rapides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {quickActions?.map((action, index) => (
                  <QuickActionButton
                    key={index}
                    title={action?.title}
                    description={action?.description}
                    icon={action?.icon}
                    color={action?.color}
                    onClick={action?.action}
                  />
                ))}
              </div>
            </div>

            {/* Designs Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Mes Designs</h2>
                <div className="flex items-center space-x-2">
                  {filterOptions?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => setSelectedFilter(option?.value)}
                      className={`
                        flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-micro
                        ${selectedFilter === option?.value
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }
                      `}
                    >
                      <Icon name={option?.icon} size={16} color="currentColor" />
                      <span className="hidden sm:inline">{option?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDesigns?.map((design) => (
                  <DesignCard
                    key={design?.id}
                    design={design}
                    onEdit={handleDesignEdit}
                    onPreview={handleDesignPreview}
                    onDelete={handleDesignDelete}
                    onDuplicate={handleDesignDuplicate}
                  />
                ))}
              </div>

              {filteredDesigns?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Palette" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Aucun design trouvé</h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedFilter === 'all' ? 'Commencez par créer votre premier design'
                      : `Aucun design avec le statut "${filterOptions?.find(f => f?.value === selectedFilter)?.label}"`
                    }
                  </p>
                  <QuickActionButton
                    title="Créer un Design"
                    description="Commencer maintenant"
                    icon="Plus"
                    color="primary"
                    onClick={() => navigate('/design-editor')}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block w-80 space-y-6">
            <SidebarWidget title="Performance" icon="TrendingUp">
              <PerformanceChart data={performanceData} />
            </SidebarWidget>

            <SidebarWidget title="Conseils de Conformité" icon="Shield">
              <ComplianceTips />
            </SidebarWidget>

            <SidebarWidget title="Catégories Tendances" icon="Star">
              <TrendingCategories />
            </SidebarWidget>
          </div>
        </div>
      </main>
      <FloatingActionButton onClick={() => navigate('/design-editor')} />
      <MobileBottomNav />
      {/* Bottom spacing for mobile navigation */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default MainDashboard;