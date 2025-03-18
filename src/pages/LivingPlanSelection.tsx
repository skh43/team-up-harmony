
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Home, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModernLogo from '@/components/ModernLogo';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';

const LivingPlanSelection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();

  // Check if there's a previously selected plan in localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('livingPlan');
    if (savedPlan) {
      setSelectedPlan(savedPlan);
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

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      // Store selected plan in localStorage
      localStorage.setItem('livingPlan', selectedPlan);
      
      // Show a toast notification for better user feedback
      toast({
        title: t('livingPlan.planSelected'),
        description: selectedPlan === 'solo' 
          ? t('livingPlan.soloSelected') 
          : t('livingPlan.roommateSelected'),
        variant: "default",
      });
      
      navigate(`/register?plan=${selectedPlan}`);
    } else {
      toast({
        title: t('livingPlan.error'),
        description: t('livingPlan.pleaseSelect'),
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <section className="py-12 flex justify-center items-center min-h-screen">
        <div className="container grid gap-6 lg:grid-cols-2 xl:grid-cols-3 max-w-5xl">
          <div className="col-span-2 text-center lg:col-span-full">
            <ModernLogo size="large" className="mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">{t('livingPlan.choosePlan')}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('livingPlan.selectOption')}</p>
          </div>

          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "border-2 shadow-md transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer",
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

          <div className="col-span-2 flex justify-center lg:col-span-full mt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-700 hover:to-pink-700 px-8 py-6 rounded-full"
              onClick={handleContinue}
              disabled={!selectedPlan}
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
