
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Home, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModernLogo from '@/components/ModernLogo';

const LivingPlanSelection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  const plans = [
    {
      id: 'solo',
      title: 'Solo Living',
      description: 'Enjoy the peace and privacy of your own space.',
      icon: Home,
    },
    {
      id: 'roommate',
      title: 'Find a Roommate',
      description: 'Connect with compatible roommates and share a space.',
      icon: Users,
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      navigate(`/register?plan=${selectedPlan}`);
    } else {
      alert('Please select a living plan to continue.');
    }
  };

  return (
    <MainLayout>
      <section className="py-12 flex justify-center items-center min-h-screen">
        <div className="container grid gap-6 lg:grid-cols-2 xl:grid-cols-3 max-w-5xl">
          <div className="col-span-2 text-center">
            <ModernLogo size="large" className="mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Choose Your Living Plan</h1>
            <p className="text-muted-foreground text-lg">Select the option that best fits your needs and preferences.</p>
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
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
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
              Continue
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LivingPlanSelection;
