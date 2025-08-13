import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillingSubscriptionSection = ({ billingInfo, onUpdateBilling }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const subscriptionPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '9,99',
      period: 'mois',
      features: [
        '10 designs par mois',
        'Templates de base',
        'Export PNG/JPG',
        'Support email'
      ],
      current: false
    },
    {
      id: 'pro',
      name: 'Professionnel',
      price: '29,99',
      period: 'mois',
      features: [
        'Designs illimités',
        'Tous les templates',
        'Export haute qualité',
        'Intégration Amazon',
        'Support prioritaire'
      ],
      current: true,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Entreprise',
      price: '99,99',
      period: 'mois',
      features: [
        'Tout du plan Pro',
        'API personnalisée',
        'Support dédié',
        'Formation personnalisée',
        'SLA garanti'
      ],
      current: false
    }
  ];

  const usageStats = [
    {
      label: 'Designs créés ce mois',
      value: '47',
      limit: 'Illimité',
      percentage: 0,
      icon: 'Palette'
    },
    {
      label: 'Exports réalisés',
      value: '23',
      limit: 'Illimité',
      percentage: 0,
      icon: 'Download'
    },
    {
      label: 'Stockage utilisé',
      value: '2,3 GB',
      limit: '10 GB',
      percentage: 23,
      icon: 'HardDrive'
    },
    {
      label: 'Intégrations API',
      value: '156',
      limit: '1000',
      percentage: 15.6,
      icon: 'Zap'
    }
  ];

  const paymentMethods = [
    {
      id: 'card-1',
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 'card-2',
      type: 'Mastercard',
      last4: '8888',
      expiry: '08/26',
      isDefault: false
    }
  ];

  const invoiceHistory = [
    {
      id: 'inv-001',
      date: '01/12/2024',
      amount: '29,99 €',
      status: 'Payée',
      description: 'Abonnement Professionnel - Décembre 2024'
    },
    {
      id: 'inv-002',
      date: '01/11/2024',
      amount: '29,99 €',
      status: 'Payée',
      description: 'Abonnement Professionnel - Novembre 2024'
    },
    {
      id: 'inv-003',
      date: '01/10/2024',
      amount: '29,99 €',
      status: 'Payée',
      description: 'Abonnement Professionnel - Octobre 2024'
    }
  ];

  const handlePlanChange = (planId) => {
    onUpdateBilling({
      type: 'planChange',
      planId: planId
    });
  };

  const handlePaymentMethodUpdate = () => {
    // Simulate payment method update
    alert('Redirection vers le portail de paiement sécurisé...');
  };

  const handleDownloadInvoice = (invoiceId) => {
    // Simulate invoice download
    alert(`Téléchargement de la facture ${invoiceId}...`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString.split('/').reverse().join('-'));
    return date?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-micro rounded-t-lg"
      >
        <div className="flex items-center">
          <Icon name="CreditCard" size={24} className="mr-3 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Facturation & Abonnement</h2>
            <p className="text-sm text-muted-foreground">
              Plan actuel: {subscriptionPlans?.find(p => p?.current)?.name} - {subscriptionPlans?.find(p => p?.current)?.price}€/{subscriptionPlans?.find(p => p?.current)?.period}
            </p>
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-border">
          {/* Current Plan Status */}
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary">Plan Professionnel</h3>
                <p className="text-sm text-primary/80">
                  Prochain renouvellement: 01/01/2025
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">29,99€</p>
                <p className="text-sm text-primary/80">par mois</p>
              </div>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="BarChart3" size={20} className="mr-2 text-primary" />
              Utilisation ce Mois
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {usageStats?.map((stat, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Icon name={stat?.icon} size={16} className="mr-2 text-primary" />
                      <span className="text-sm font-medium text-foreground">{stat?.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{stat?.value} / {stat?.limit}</span>
                  </div>
                  {stat?.percentage > 0 && (
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(stat?.percentage, 100)}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Available Plans */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Package" size={20} className="mr-2 text-primary" />
              Plans Disponibles
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {subscriptionPlans?.map((plan) => (
                <div 
                  key={plan?.id}
                  className={`p-6 rounded-lg border-2 transition-micro ${
                    plan?.current 
                      ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
                  } ${plan?.popular ? 'relative' : ''}`}
                >
                  {plan?.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        Populaire
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-semibold text-foreground">{plan?.name}</h4>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-foreground">{plan?.price}€</span>
                      <span className="text-muted-foreground">/{plan?.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {plan?.features?.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Icon name="Check" size={16} className="mr-2 text-success" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant={plan?.current ? "outline" : "default"}
                    fullWidth
                    disabled={plan?.current}
                    onClick={() => handlePlanChange(plan?.id)}
                  >
                    {plan?.current ? 'Plan Actuel' : 'Choisir ce Plan'}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground flex items-center">
                <Icon name="CreditCard" size={20} className="mr-2 text-primary" />
                Méthodes de Paiement
              </h3>
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={handlePaymentMethodUpdate}
              >
                Ajouter
              </Button>
            </div>
            
            <div className="space-y-3">
              {paymentMethods?.map((method) => (
                <div key={method?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center">
                    <Icon name="CreditCard" size={20} className="mr-3 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {method?.type} •••• {method?.last4}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Expire {method?.expiry}
                        {method?.isDefault && ' • Méthode par défaut'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method?.isDefault && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        <Icon name="CheckCircle" size={12} className="mr-1" />
                        Par défaut
                      </span>
                    )}
                    <Button variant="ghost" size="sm" iconName="Edit" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invoice History */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="FileText" size={20} className="mr-2 text-primary" />
              Historique des Factures
            </h3>
            
            <div className="space-y-3">
              {invoiceHistory?.map((invoice) => (
                <div key={invoice?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{invoice?.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(invoice?.date)} • {invoice?.amount}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      {invoice?.status}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      onClick={() => handleDownloadInvoice(invoice?.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              iconName="ExternalLink"
              iconPosition="left"
              onClick={() => window.open('/billing-portal', '_blank')}
            >
              Portail de Facturation
            </Button>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={() => alert('Téléchargement de toutes les factures...')}
            >
              Télécharger Toutes les Factures
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingSubscriptionSection;