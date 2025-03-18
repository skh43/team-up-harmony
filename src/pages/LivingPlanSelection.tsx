
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Home, Users, Award, Crown, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModernLogo from '@/components/ModernLogo';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from "@/components/ui/badge";

const LivingPlanSelection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();

  // Check if there's a previously selected plan in localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('livingPlan');
    const savedTier = localStorage.getItem('planTier');
    
    if (savedPlan) {
      setSelectedPlan(savedPlan);
    }
    
    if (savedTier) {
      setSelectedTier(savedTier);
    }
  }, []);

  const plans = [
    {
      id: 'solo',
      title: t('livingPlan.soloLiving'),
      description: t('livingPlan.soloDesc'),
      icon: Home,
    },
    {
      id: 'roommate',
      title: t('livingPlan.findRoommate'),
      description: t('livingPlan.roommateDesc'),
      icon: Users,
    },
  ];
  
  const tiers = [
    {
      id: 'basic',
      title: 'Basic',
      description: 'Essential features to get started with finding a roommate or listing your space.',
      icon: Shield,
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      borderColor: 'border-blue-500',
    },
    {
      id: 'comfort',
      title: 'Comfort',
      description: 'Enhanced matching algorithms and priority listing status.',
      icon: Award,
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
      borderColor: 'border-purple-500',
      recommended: true,
    },
    {
      id: 'elite',
      title: 'Elite',
      description: 'Premium features with dedicated support and maximum visibility.',
      icon: Crown,
      color: 'bg-amber-500',
      textColor: 'text-amber-500',
      borderColor: 'border-amber-500',
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
  };

  const handleContinue = () => {
    if (!selectedPlan) {
      toast({
        title: t('livingPlan.error'),
        description: t('livingPlan.pleaseSelect'),
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTier) {
      toast({
        title: "Select a Plan Tier",
        description: "Please select a plan tier to continue",
        variant: "destructive",
      });
      return;
    }
    
    // Store selected plan in localStorage
    localStorage.setItem('livingPlan', selectedPlan);
    localStorage.setItem('planTier', selectedTier);
    
    // Show a toast notification for better user feedback
    toast({
      title: t('livingPlan.planSelected'),
      description: `${selectedPlan === 'solo' ? t('livingPlan.soloSelected') : t('livingPlan.roommateSelected')} - ${selectedTier} tier`,
      variant: "default",
    });
    
    navigate(`/register?plan=${selectedPlan}&tier=${selectedTier}`);
  };

  return (
    <MainLayout>
      <section className="py-12 flex justify-center items-center min-h-screen">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <ModernLogo size="large" className="mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">{t('livingPlan.choosePlan')}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('livingPlan.selectOption')}</p>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-center">Step 1: Choose Your Living Arrangement</h2>
            <div className="grid gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={cn(
                    "border-2 shadow-md transition-all transform hover:scale-102 hover:shadow-lg cursor-pointer",
                    selectedPlan === plan.id ? "border-primary ring-2 ring-primary/20" : "border-muted"
                  )}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {plan.title}
                      {selectedPlan === plan.id && <Check className="text-green-500" />}
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <div className="p-4 rounded-full bg-primary/10">
                        <plan.icon className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={selectedPlan === plan.id ? "default" : "outline"}
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlanSelect(plan.id);
                      }}
                    >
                      {selectedPlan === plan.id ? t('livingPlan.selected') : t('livingPlan.selectPlan')}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {selectedPlan && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-center">Step 2: Select Your Plan Tier</h2>
              <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                {tiers.map((tier) => (
                  <Card
                    key={tier.id}
                    className={cn(
                      "border-2 shadow-md transition-all relative overflow-hidden",
                      selectedTier === tier.id ? `ring-2 ring-opacity-50 border-${tier.id === 'basic' ? 'blue' : tier.id === 'comfort' ? 'purple' : 'amber'}-500` : "border-muted",
                      "hover:shadow-lg cursor-pointer"
                    )}
                    onClick={() => handleTierSelect(tier.id)}
                  >
                    {tier.recommended && (
                      <div className="absolute top-0 right-0">
                        <Badge className="bg-purple-500 text-white border-0 rounded-tl-none rounded-br-none">
                          Recommended
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-full ${tier.color} flex items-center justify-center mb-4`}>
                        <tier.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className={cn("flex items-center justify-between", tier.textColor)}>
                        {tier.title}
                        {selectedTier === tier.id && <Check className="text-green-500" />}
                      </CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button
                        variant={selectedTier === tier.id ? "default" : "outline"}
                        className={cn(
                          "w-full",
                          selectedTier === tier.id ? tier.color : `border-${tier.borderColor}`
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTierSelect(tier.id);
                        }}
                      >
                        {selectedTier === tier.id ? "Selected" : "Select Tier"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center mt-10">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-700 hover:to-pink-700 px-8 py-6 rounded-full"
              onClick={handleContinue}
              disabled={!selectedPlan || !selectedTier}
            >
              {t('livingPlan.continue')}
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LivingPlanSelection;
