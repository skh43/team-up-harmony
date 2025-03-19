
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
import { motion } from 'framer-motion';

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

  // Animation variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <MainLayout>
      <section className="py-12 min-h-screen bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-blue-50 rounded-full px-6 py-2 flex items-center justify-center">
              <Users className="text-blue-600 mr-2 h-5 w-5" />
              <span className="text-blue-600 font-medium">Team Up</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold font-montserrat mb-4 text-gray-800">Choose Your Living Plan</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-2">
              Select the plan that best fits your lifestyle and preferences.
            </p>
            <p className="text-blue-600">Upgrade anytime to unlock more features!</p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 max-w-5xl mx-auto mb-16">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
                onClick={() => handleTierSelect(tier.id)}
              >
                <Card
                  className={cn(
                    "overflow-hidden shadow-md transition-all duration-300 h-full",
                    selectedTier === tier.id ? 
                      `border-2 border-[${tier.borderColor}] ring-2 ring-offset-2` : 
                      "border border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div 
                    className="h-2" 
                    style={{ backgroundColor: tier.color }}
                  ></div>
                  
                  {tier.recommended && (
                    <div 
                      className="py-1.5 text-white text-xs font-medium text-center animate-pulse"
                      style={{ backgroundColor: tier.color }}
                    >
                      RECOMMENDED
                    </div>
                  )}
                  
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4 gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${tier.color}20` }}
                      >
                        <tier.icon style={{ color: tier.color }} className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold font-montserrat">{tier.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-6">{tier.description}</p>
                    
                    <div className="mb-6">
                      <span 
                        className="text-3xl font-bold" 
                        style={{ color: tier.color }}
                      >
                        {tier.price.split('/')[0]}
                      </span>
                      {tier.price !== 'Free' && 
                        <span className="text-sm text-gray-500">/month</span>}
                    </div>
                    
                    <ul className="space-y-3 mb-8 flex-grow">
                      {tier.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx + 0.5, duration: 0.3 }}
                        >
                          <div 
                            className="h-5 w-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                            style={{ backgroundColor: `${tier.color}20` }}
                          >
                            <Check 
                              className="h-3 w-3"
                              style={{ color: tier.color }}
                            />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <Button
                      className={cn(
                        "w-full py-2 border font-medium text-white transition-all transform hover:scale-105",
                        selectedTier === tier.id ? "animate-glow" : "",
                      )}
                      style={{ 
                        backgroundColor: tier.color,
                        borderColor: tier.color,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTierSelect(tier.id);
                      }}
                    >
                      {selectedTier === tier.id ? "Selected" : "Select Plan"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold font-montserrat text-center mb-4">Compare Features</h2>
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

          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button
              className={cn(
                "rounded-md px-10 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all",
                !selectedTier && "opacity-70",
                selectedTier && "animate-pulse-slow"
              )}
              onClick={handleContinue}
              disabled={!selectedTier}
            >
              Continue
            </Button>
          </motion.div>
          
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
