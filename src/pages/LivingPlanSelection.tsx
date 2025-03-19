
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Box, Check, Home, Star, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';
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
      title: 'Basic Living',
      description: 'Essential matchmaking for budget-conscious roommates',
      icon: Box,
      color: '#01CDFA',
      borderColor: '#01CDFA',
      checkColor: '#01CDFA',
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
      borderColor: '#8563C9',
      checkColor: '#8563C9',
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
      borderColor: '#F5B72F',
      checkColor: '#F5B72F',
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

  // If not authenticated, return null (will redirect in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <MainLayout>
      <section className="py-12 min-h-screen bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-50 rounded-full px-6 py-2 flex items-center justify-center">
              <Users className="text-blue-600 mr-2 h-5 w-5" />
              <span className="text-blue-600 font-medium">Team Up</span>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-playfair mb-4 text-gray-800">Choose Your Living Plan</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-2">
              Select the plan that best fits your lifestyle and preferences.
            </p>
            <p className="text-blue-600">Upgrade anytime to unlock more features!</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 max-w-5xl mx-auto mb-16">
            {tiers.map((tier) => (
              <Card
                key={tier.id}
                className={cn(
                  "overflow-hidden hover:shadow-lg transition-all border border-gray-200",
                  selectedTier === tier.id ? `border-2 border-[${tier.borderColor}]` : ""
                )}
                onClick={() => handleTierSelect(tier.id)}
              >
                <div 
                  className="h-1.5" 
                  style={{ backgroundColor: tier.color }}
                ></div>
                
                {tier.recommended && (
                  <div className="bg-[#8563C9] text-white text-xs font-medium py-1 text-center">
                    RECOMMENDED
                  </div>
                )}
                
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <tier.icon style={{ color: tier.color }} />
                  </div>
                  
                  <h3 className="text-xl font-bold font-playfair">{tier.title}</h3>
                  <div className="mt-2 mb-2">
                    <span className="text-2xl font-bold">{tier.price.split('/')[0]}</span>
                    {tier.price !== 'Free' && <span className="text-sm text-gray-500">/month</span>}
                  </div>
                  <p className="text-gray-600 text-sm mb-6">{tier.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check 
                          className="h-5 w-5 mt-0.5 flex-shrink-0"
                          style={{ color: tier.checkColor }}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {tier.id === 'comfort' && (
                    <div className="mb-6 flex items-center justify-center text-purple-600 text-sm">
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        See Elite benefits
                      </span>
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full py-2 border font-medium",
                      selectedTier === tier.id ? "bg-gray-50" : ""
                    )}
                    style={{ 
                      borderColor: tier.color,
                      color: tier.color
                    }}
                  >
                    Select Plan
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold font-playfair text-center mb-4">Compare Features</h2>
            <p className="text-center text-gray-600 mb-8">
              See what each plan includes to make the right choice
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-medium">Feature</th>
                    <th className="py-4 px-4 font-medium text-center" style={{ color: '#01CDFA' }}>Basic</th>
                    <th className="py-4 px-4 font-medium text-center" style={{ color: '#8563C9' }}>Comfort</th>
                    <th className="py-4 px-4 font-medium text-center" style={{ color: '#F5B72F' }}>Elite</th>
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
            <Button
              className={cn(
                "rounded-md px-10 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all",
                !selectedTier && "opacity-70"
              )}
              onClick={handleContinue}
              disabled={!selectedTier}
            >
              Continue
            </Button>
          </div>
          
          <div className="mt-8 text-center text-gray-500 text-sm max-w-2xl mx-auto">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy. 
            You can change your plan at any time after registration.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LivingPlanSelection;
