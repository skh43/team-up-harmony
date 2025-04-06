
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Box, Check, Home, Star, Users, LockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import ModernLogo from '@/components/ModernLogo';

const LivingPlanSelection = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

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

  useEffect(() => {
    const savedTier = localStorage.getItem('planTier');
    
    if (savedTier === 'basic') {
      setSelectedTier(savedTier);
    } else {
      // Reset to basic if they had comfort or elite previously selected
      setSelectedTier('basic');
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
      disabled: false
    },
    {
      id: 'comfort',
      title: 'Comfort Living',
      description: 'Enhanced matching with detailed preferences',
      icon: Home,
      color: '#8563C9',
      textColor: 'gray',
      borderColor: 'gray',
      checkColor: 'gray',
      buttonGradient: 'from-gray-400 to-gray-600',
      iconBgColor: 'rgba(133, 99, 201, 0.1)',
      features: [
        '20 Matches Per Day',
        'Detailed Preferences',
        'Advanced Filters',
        'Priority Messaging',
        'Background Verification'
      ],
      price: 'Coming Soon',
      showEliteBenefits: false,
      disabled: true
    },
    {
      id: 'elite',
      title: 'Elite Living',
      description: 'Premium experience for the most discerning roommates',
      icon: Star,
      color: '#F5B72F',
      textColor: 'gray',
      borderColor: 'gray',
      checkColor: 'gray',
      buttonGradient: 'from-gray-400 to-gray-600',
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
      price: 'Coming Soon',
      disabled: true
    },
  ];
  
  const handleTierSelect = (tierId: string) => {
    if (tierId !== 'basic') {
      toast({
        title: "Coming Soon",
        description: "This plan is not available yet. Please select the Basic plan for now.",
        variant: "default",
      });
      return;
    }
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
    
    toast({
      title: "Plan Selected",
      description: `Roommate Finding - ${selectedTier} tier`,
      variant: "default",
    });
    
    navigate('/path-selection');
  };

  if (!isAuthenticated) {
    return null;
  }

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
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <ModernLogo size="hero" variant="gradient" className="mb-4" showTagline={true} />
          </motion.div>
          
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold font-montserrat mb-4 text-gray-800">Choose Your Living Plan</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-2">
              Select the plan that best fits your lifestyle and preferences.
            </p>
            <div className="text-amber-600 font-medium mt-4 bg-amber-50 inline-block px-4 py-2 rounded-md">
              Premium plans are coming soon! Only Basic plan is available at the moment.
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 max-w-5xl mx-auto mb-16">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover={tier.disabled ? undefined : "hover"}
                variants={cardVariants}
                onClick={() => !tier.disabled && handleTierSelect(tier.id)}
              >
                <Card
                  className={cn(
                    "overflow-hidden shadow-md transition-all duration-300 h-full border rounded-xl flex flex-col",
                    selectedTier === tier.id ? 
                      `border-2 ring-2 ring-offset-2` : 
                      "border hover:border-gray-300",
                    tier.disabled && "opacity-70 cursor-not-allowed"
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
                  
                  <div className="p-6 flex-grow flex flex-col relative">
                    {tier.disabled && (
                      <div className="absolute top-2 right-2">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                    
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
                      {tier.price}
                    </h2>
                    
                    <p className="text-gray-600 text-sm mb-6">{tier.description}</p>
                    
                    <ul className="space-y-3 mb-8 flex-grow">
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
                            style={{ color: tier.disabled ? "#9CA3AF" : tier.checkColor }}
                          />
                          <span className={tier.disabled ? "text-gray-500" : "text-gray-700"}>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto">
                      <Button
                        variant="outline"
                        size="lg"
                        radius="md"
                        disabled={tier.disabled}
                        className={cn(
                          "w-full font-medium transition-all border text-center whitespace-nowrap",
                          selectedTier === tier.id 
                            ? "bg-gradient-to-r text-white" 
                            : "bg-white text-gray-800 border-gray-200 hover:scale-105",
                          tier.disabled && "cursor-not-allowed opacity-70"
                        )}
                        style={selectedTier === tier.id ? {
                          background: `linear-gradient(to right, ${tier.color}, ${tier.color})`,
                          borderColor: tier.color
                        } : {}}
                        onClick={(e) => {
                          e.stopPropagation();
                          !tier.disabled && handleTierSelect(tier.id);
                        }}
                      >
                        {tier.disabled ? "Coming Soon" : (selectedTier === tier.id ? "Selected" : "Select Plan")}
                      </Button>
                    </div>
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
            Premium plans will be available soon.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LivingPlanSelection;
