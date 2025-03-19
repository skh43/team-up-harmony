
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Box, Check, Home, Star, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModernLogo from '@/components/ModernLogo';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

// Create a motion version of components
const MotionButton = motion(Button);
const MotionCard = motion(Card);

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
      title: 'Basic Living',
      description: 'Essential matchmaking for budget-conscious roommates',
      icon: Box,
      color: '#01CDFA',
      borderColor: 'border-[#01CDFA]',
      features: [
        '5 Matches Per Day',
        'Basic Preferences',
        'Standard Filters',
        'In-App Messaging'
      ],
      price: 'Free',
    },
    {
      id: 'comfort',
      title: 'Comfort Living',
      description: 'Enhanced matching with detailed preferences',
      icon: Home,
      color: '#8563C9',
      borderColor: 'border-[#8563C9]',
      features: [
        '20 Matches Per Day',
        'Detailed Preferences',
        'Advanced Filters',
        'Priority Messaging',
        'Background Verification'
      ],
      price: 'SAR 29.99/month',
      recommended: true
    },
    {
      id: 'elite',
      title: 'Elite Living',
      description: 'Premium experience for the most discerning roommates',
      icon: Star,
      color: '#F5B72F',
      borderColor: 'border-[#F5B72F]',
      features: [
        'Unlimited Matches',
        'Ultra-detailed Preferences',
        'Premium Filters',
        'Priority Support',
        'Background Verification',
        'Personality Matching',
        'Exclusive Property Listings'
      ],
      price: 'SAR 59.99/month',
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

  // Get color by tier id
  const getColorByTier = (tierId: string) => {
    const tier = tiers.find(t => t.id === tierId);
    return tier ? tier.color : '#01CDFA';
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100, 
        damping: 15
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400, 
        damping: 10
      }
    }
  };

  // If not authenticated, return null (will redirect in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <MainLayout>
      <section className="py-12 min-h-screen bg-white">
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-blue-50 px-6 py-2 rounded-full mb-6">
              <Users className="text-blue-600 mr-2 h-5 w-5" />
              <span className="text-blue-600 font-semibold">Team Up</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-3 text-slate-800">Choose Your Living Plan</h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-2">
              Select the plan that best fits your lifestyle and preferences.
            </p>
            <p className="text-blue-500 font-medium">Upgrade anytime to unlock more features!</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 max-w-5xl mx-auto mb-12">
            {tiers.map((tier, index) => (
              <MotionCard
                key={tier.id}
                className={cn(
                  "overflow-hidden hover:shadow-lg transition-all",
                  selectedTier === tier.id ? `border-2 ${tier.borderColor}` : "border",
                  tier.recommended ? "relative" : ""
                )}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onClick={() => handleTierSelect(tier.id)}
              >
                {tier.recommended && (
                  <div className="absolute top-0 left-0 right-0 bg-[#8563C9] text-white text-xs font-semibold py-1 text-center">
                    RECOMMENDED
                  </div>
                )}
                <div 
                  className="h-2" 
                  style={{ backgroundColor: tier.color }}
                ></div>
                <CardHeader className={cn(
                  "pt-6",
                  tier.recommended ? "pt-8" : ""
                )}>
                  <div className="mb-4 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <tier.icon style={{ color: tier.color }} />
                  </div>
                  <CardTitle className="text-2xl font-bold font-playfair">{tier.title}</CardTitle>
                  <div className="mt-2 mb-2">
                    <span className="text-2xl font-bold">{tier.price.split('/')[0]}</span>
                    {tier.price !== 'Free' && <span className="text-sm text-gray-500">/month</span>}
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check 
                          className="h-5 w-5 mt-0.5 flex-shrink-0"
                          style={{ color: tier.color }}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full py-2",
                      selectedTier === tier.id ? "bg-slate-100 border-2" : ""
                    )}
                    style={{ 
                      borderColor: selectedTier === tier.id ? tier.color : '',
                      color: selectedTier === tier.id ? tier.color : ''
                    }}
                  >
                    {selectedTier === tier.id ? "Selected" : "Select Plan"}
                  </Button>
                </CardFooter>
              </MotionCard>
            ))}
          </div>

          <div className="mt-8 mb-12">
            <h2 className="text-2xl font-bold font-playfair text-center mb-6">Compare Features</h2>
            <p className="text-center text-gray-600 mb-8">
              See what each plan includes to make the right choice
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                    <th className="py-4 px-4 font-semibold text-center" style={{ color: '#01CDFA' }}>Basic</th>
                    <th className="py-4 px-4 font-semibold text-center" style={{ color: '#8563C9' }}>Comfort</th>
                    <th className="py-4 px-4 font-semibold text-center" style={{ color: '#F5B72F' }}>Elite</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4">Daily Match Limit</td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#01CDFA' }} /></td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#8563C9' }} /></td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#F5B72F' }} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Basic Preferences (Gender, Budget)</td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#01CDFA' }} /></td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#8563C9' }} /></td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#F5B72F' }} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">In-App Messaging</td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#01CDFA' }} /></td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#8563C9' }} /></td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#F5B72F' }} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Location Filters</td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#01CDFA' }} /></td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#8563C9' }} /></td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#F5B72F' }} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Detailed Preferences (Lifestyle)</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#8563C9' }} /></td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#F5B72F' }} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Background Verification</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#8563C9' }} /></td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#F5B72F' }} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Premium Filters</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#8563C9' }} /></td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#F5B72F' }} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Personality Matching</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#F5B72F' }} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Priority Support</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#F5B72F' }} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Exclusive Property Listings</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center"><Check className="inline-block h-5 w-5" style={{ color: '#F5B72F' }} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <MotionButton
              size="lg"
              className={cn(
                "rounded-full px-10 py-6 text-base transition-all duration-300",
                !selectedTier && "opacity-70 pointer-events-none"
              )}
              onClick={handleContinue}
              disabled={!selectedTier}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                backgroundColor: selectedTier ? getColorByTier(selectedTier) : '#8563C9',
                color: 'white' 
              }}
            >
              Continue
              <ArrowRight className="ml-2 w-5 h-5" />
            </MotionButton>
          </div>
          
          <div className="mt-12 text-center text-gray-500 text-sm max-w-2xl mx-auto">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy. 
            You can change your plan at any time after registration.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LivingPlanSelection;
