
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Box, Check, Home, Star, Users, StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

const LivingPlanSelection = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showEliteUpgrade, setShowEliteUpgrade] = useState(false);
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
      textColor: '#01CDFA',
      borderColor: '#01CDFA',
      checkColor: '#01CDFA',
      buttonGradient: 'from-blue-400 to-blue-600',
      iconBgColor: 'rgba(1, 205, 250, 0.1)',
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
      textColor: '#8563C9',
      borderColor: '#8563C9',
      checkColor: '#8563C9',
      buttonGradient: 'from-purple-400 to-purple-600',
      iconBgColor: 'rgba(133, 99, 201, 0.1)',
      features: [
        '20 Matches Per Day',
        'Detailed Preferences',
        'Advanced Filters',
        'Priority Messaging',
        'Background Verification'
      ],
      price: 'SAR 29.99/month',
      showEliteBenefits: true
    },
    {
      id: 'elite',
      title: 'Elite Living',
      description: 'Premium experience for the most discerning roommates',
      icon: Star,
      color: '#F5B72F',
      textColor: '#F5B72F',
      borderColor: '#F5B72F',
      checkColor: '#F5B72F',
      buttonGradient: 'from-amber-400 to-amber-600',
      iconBgColor: 'rgba(245, 183, 47, 0.1)',
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
    // Show upgrade banner for basic and comfort tiers
    if (tierId === 'basic' || tierId === 'comfort') {
      setShowEliteUpgrade(true);
    } else {
      setShowEliteUpgrade(false);
    }
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

  const handleUpgradeToElite = () => {
    setSelectedTier('elite');
    setShowEliteUpgrade(false);
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
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold font-montserrat mb-4 text-gray-800">Choose Your Living Plan</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-2">
              Select the plan that best fits your lifestyle and preferences.
            </p>
          </motion.div>

          {/* Elite Upgrade Banner */}
          {showEliteUpgrade && (
            <motion.div 
              className="mx-auto mb-8 rounded-xl overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-yellow-100 p-4 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 rounded-full -mr-8 -mt-8 z-0"></div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center">
                    <div className="bg-yellow-300 h-14 w-14 rounded-full flex items-center justify-center mr-4">
                      <Star className="h-7 w-7 text-white" fill="white" />
                    </div>
                    <div>
                      <h3 className="font-montserrat text-xl font-bold text-amber-600">Unlock Elite Living</h3>
                      <p className="text-amber-800">
                        Premium experience with <span className="font-semibold">advanced personality matching</span> and <span className="font-semibold">exclusive features</span>
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleUpgradeToElite}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white px-4 py-2 rounded-full flex items-center"
                  >
                    Upgrade to Elite <Star className="ml-1 h-4 w-4" fill="white" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

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
                    "overflow-hidden shadow-md transition-all duration-300 h-full border rounded-xl",
                    selectedTier === tier.id ? 
                      `border-2 ring-2 ring-offset-2` : 
                      "border hover:border-gray-300"
                  )}
                  style={{ 
                    borderColor: selectedTier === tier.id ? tier.borderColor : 'transparent',
                    boxShadow: selectedTier === tier.id ? `0 0 0 2px ${tier.borderColor}20` : ''
                  }}
                >
                  <div 
                    className="h-2" 
                    style={{ backgroundColor: tier.color }}
                  ></div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: tier.iconBgColor }}
                      >
                        <tier.icon style={{ color: tier.color }} className="h-8 w-8" />
                      </div>
                      
                      {selectedTier === tier.id && (
                        <div 
                          className="h-8 w-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: tier.iconBgColor }}
                        >
                          <Check style={{ color: tier.color }} className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    
                    <h3 
                      className="text-xl font-semibold font-montserrat mb-1"
                      style={{ color: tier.textColor }}
                    >
                      {tier.title}
                    </h3>
                    
                    <h2 
                      className="text-3xl font-bold mb-3"
                      style={{ color: tier.textColor }}
                    >
                      {tier.price === 'Free' ? 'Free' : tier.price.split('/')[0]}
                      {tier.price !== 'Free' && 
                        <span className="text-sm text-gray-500">/month</span>}
                    </h2>
                    
                    <p className="text-gray-600 text-sm mb-6">{tier.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx + 0.5, duration: 0.3 }}
                        >
                          <Check 
                            className="h-5 w-5 mt-0.5 flex-shrink-0"
                            style={{ color: tier.checkColor }}
                          />
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {tier.showEliteBenefits && (
                      <div 
                        className="flex items-center justify-center mb-4 text-sm text-purple-600 cursor-pointer hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpgradeToElite();
                        }}
                      >
                        <Star className="h-4 w-4 mr-1 text-purple-600" />
                        See Elite benefits
                      </div>
                    )}
                    
                    <Button
                      className={cn(
                        "w-full py-2 border font-medium text-white transition-all",
                        selectedTier === tier.id ? "" : "transform hover:scale-105",
                      )}
                      style={{ 
                        background: selectedTier === tier.id 
                          ? tier.color 
                          : `linear-gradient(to right, ${tier.color}, ${tier.color})`, 
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
