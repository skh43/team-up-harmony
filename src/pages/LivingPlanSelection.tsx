
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Home, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModernLogo from '@/components/ModernLogo';
import { useTranslation } from 'react-i18next';

const LivingPlanSelection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      navigate(`/register?plan=${selectedPlan}`);
    } else {
      alert(t('livingPlan.pleaseSelect'));
    }
  };

  return (
    <MainLayout>
      <section className="py-12 flex justify-center items-center min-h-screen">
        <div className="container grid gap-6 lg:grid-cols-2 xl:grid-cols-3 max-w-5xl">
          <div className="col-span-2 text-center">
            <ModernLogo size="large" className="mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">{t('livingPlan.choosePlan')}</h1>
            <p className="text-muted-foreground text-lg">{t('livingPlan.selectOption')}</p>
          </div>

          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "border-2 shadow-md transition-all hover:shadow-lg",
                selectedPlan === plan.id ? "border-primary" : "border-muted"
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {plan.title}
                  {selectedPlan === plan.id && <Check className="text-green-500" />}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <plan.icon className="w-12 h-12 text-primary mx-auto" />
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {selectedPlan === plan.id ? t('livingPlan.selected') : t('livingPlan.selectPlan')}
                </Button>
              </CardFooter>
            </Card>
          ))}

          <div className="col-span-2 flex justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-700 hover:to-pink-700"
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
