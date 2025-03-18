
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Award, Crown, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModernLogo from '@/components/ModernLogo';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth';

const LivingPlanSelection = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the roommate finding features.",
        variant: "destructive",
      });
      navigate('/login', { state: { returnTo: '/living-plan-selection' } });
    }
  }, [isAuthenticated, navigate, toast]);

  // Check if there's a previously selected tier in localStorage
  useEffect(() => {
    const savedTier = localStorage.getItem('planTier');
    
    if (savedTier) {
      setSelectedTier(savedTier);
    }
  }, []);
  
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
  
  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
  };

  const handleContinue = () => {
    if (!selectedTier) {
      toast({
        title: "Select a Plan Tier",
        description: "Please select a plan tier to continue",
        variant: "destructive",
      });
      return;
    }
    
    // Always set living plan to 'roommate' since we've removed the selection
    localStorage.setItem('livingPlan', 'roommate');
    localStorage.setItem('planTier', selectedTier);
    
    // Show a toast notification for better user feedback
    toast({
      title: "Plan Selected",
      description: `Roommate Finding - ${selectedTier} tier`,
      variant: "default",
    });
    
    // If user is already registered, go directly to path selection
    if (user) {
      navigate('/path-selection');
    } else {
      navigate(`/register?plan=roommate&tier=${selectedTier}`);
    }
  };

  // If not authenticated, return null (will redirect in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <MainLayout>
      <section className="py-12 flex justify-center items-center min-h-screen">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <ModernLogo size="large" className="mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Select Your Roommate Finding Plan</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Choose the plan that best fits your needs and budget</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6 text-center">Select Your Plan Tier</h2>
            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {tiers.map((tier) => (
                <Card
                  key={tier.id}
                  className={cn(
                    "border-2 shadow-md transition-all relative overflow-hidden",
                    selectedTier === tier.id ? tier.borderColor : "border-muted",
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
                        selectedTier === tier.id ? tier.color : ""
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

          <div className="flex justify-center mt-10">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-700 hover:to-pink-700 px-8 py-6 rounded-full"
              onClick={handleContinue}
              disabled={!selectedTier}
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
