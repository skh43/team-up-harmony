
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Award, Crown, Shield, Info, Users, Star, Clock, Gift, Sparkles, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModernLogo from '@/components/ModernLogo';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

// Create a motion version of the Button component
const MotionButton = motion(Button);

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
      gradient: 'bg-gradient-to-r from-blue-400 to-blue-600',
      features: [
        { text: 'Browse roommate profiles', icon: Users },
        { text: 'Basic search filters', icon: Info },
        { text: 'Message up to 5 potential roommates', icon: Clock },
        { text: 'Create a basic profile', icon: Star },
      ],
      price: 'Free',
      popular: false,
      upgradeMessage: 'Upgrade to Comfort',
      upgradeDescription: 'Enhance your roommate search with advanced filters and unlimited messaging',
      upgradeTo: 'comfort'
    },
    {
      id: 'comfort',
      title: 'Comfort',
      description: 'Enhanced matching algorithms and priority listing status.',
      icon: Award,
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
      borderColor: 'border-purple-500',
      gradient: 'bg-gradient-to-r from-purple-400 to-purple-600',
      recommended: true,
      popular: true,
      features: [
        { text: 'All Basic features', icon: Check },
        { text: 'Advanced matching algorithm', icon: Star },
        { text: 'Unlimited messages', icon: Users },
        { text: 'Priority in search results', icon: Crown },
        { text: 'Compatibility scoring', icon: Gift },
      ],
      price: '$9.99/month',
      upgradeMessage: 'Subscribe now to Elite Living',
      upgradeDescription: 'Premium experience with advanced personality matching and exclusive features',
      upgradeTo: 'elite'
    },
    {
      id: 'elite',
      title: 'Elite',
      description: 'Premium features with dedicated support and maximum visibility.',
      icon: Crown,
      color: 'bg-amber-500',
      textColor: 'text-amber-500',
      borderColor: 'border-amber-500',
      gradient: 'bg-gradient-to-r from-amber-400 to-amber-600',
      popular: false,
      features: [
        { text: 'All Comfort features', icon: Check },
        { text: 'Dedicated support agent', icon: Info },
        { text: 'Featured profile placement', icon: Sparkles },
        { text: 'Background verification badge', icon: Shield },
        { text: 'Virtual tour scheduling', icon: Clock },
        { text: 'Access to exclusive listings', icon: Gift },
      ],
      price: '$19.99/month',
    },
  ];
  
  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
  };

  // Function to handle upgrade button click
  const handleUpgrade = (tierId: string) => {
    setSelectedTier(tierId);
    // Smooth scroll to the tier card
    const element = document.getElementById(`tier-${tierId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const pulseAnimation = {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    }
  };

  // If not authenticated, return null (will redirect in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Get currently selected tier object
  const currentTier = tiers.find(tier => tier.id === selectedTier);

  return (
    <MainLayout>
      <section className="py-12 min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div 
          className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none"
          style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundAttachment: "fixed"
          }}
        />
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container max-w-6xl mx-auto px-4 relative z-10"
        >
          <div className="text-center mb-10">
            <ModernLogo size="large" className="mx-auto mb-6" />
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
            >
              Find Your Perfect Roommate
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Choose the plan that best fits your needs and start your journey toward finding compatible roommates
            </motion.p>
          </div>

          {/* Upgrade Banner - Only shown when a tier is selected and it's not the highest tier */}
          {selectedTier && selectedTier !== 'elite' && currentTier && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "mb-8 rounded-2xl shadow-lg p-6 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4",
                selectedTier === 'basic' ? "bg-purple-50/70 border border-purple-200" : "bg-amber-50/70 border border-amber-200"
              )}
            >
              <div>
                <h3 className={cn(
                  "text-xl font-bold mb-1",
                  selectedTier === 'basic' ? "text-purple-700" : "text-amber-700"
                )}>
                  {currentTier.upgradeMessage}
                </h3>
                <p className="text-muted-foreground">{currentTier.upgradeDescription}</p>
              </div>
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "rounded-full px-5 py-2 text-white flex items-center gap-2",
                  selectedTier === 'basic' 
                    ? "bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700" 
                    : "bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700"
                )}
                onClick={() => handleUpgrade(currentTier.upgradeTo)}
              >
                Upgrade Now
                <ArrowUpRight className="w-4 h-4" />
              </MotionButton>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl mb-12 border border-gray-100"
          >
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 pb-1"
            >
              Select Your Plan Tier
              <motion.div 
                className="h-1 w-24 mx-auto mt-2 rounded bg-gradient-to-r from-blue-400 to-violet-500"
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </motion.h2>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 max-w-5xl mx-auto"
            >
              {tiers.map((tier, index) => (
                <motion.div 
                  key={tier.id}
                  id={`tier-${tier.id}`}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  animate={tier.popular ? pulseAnimation : {}}
                  className="flex"
                >
                  <Card
                    className={cn(
                      "w-full border-2 shadow-lg transition-all relative overflow-hidden hover:shadow-2xl",
                      selectedTier === tier.id ? tier.borderColor : "border-muted",
                      "cursor-pointer bg-white/90 backdrop-blur-sm"
                    )}
                    onClick={() => handleTierSelect(tier.id)}
                  >
                    {/* Decorative background elements */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-10 bg-gradient-to-br from-blue-400 to-purple-600 blur-xl" />
                    <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-5 bg-gradient-to-tr from-amber-300 to-pink-600 blur-xl" />
                    
                    {tier.recommended && (
                      <div className="absolute -top-1 -right-14 w-40 h-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold flex items-center justify-center rotate-45 shadow-lg z-10">
                        RECOMMENDED
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className={`w-20 h-20 rounded-full ${tier.gradient} flex items-center justify-center mb-5 mx-auto shadow-lg transform transition-transform duration-300 hover:scale-110`}>
                        <tier.icon className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className={cn("flex items-center justify-between text-2xl font-bold", tier.textColor)}>
                        {tier.title}
                        {selectedTier === tier.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          >
                            <Check className="text-green-500 w-6 h-6" />
                          </motion.div>
                        )}
                      </CardTitle>
                      <CardDescription className="text-center mt-2 text-base">{tier.description}</CardDescription>
                      
                      <div className="mt-4 text-center">
                        <span className="text-3xl font-extrabold">{tier.price}</span>
                        {tier.price !== 'Free' && <span className="text-sm text-muted-foreground ml-1">per month</span>}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-3">
                        {tier.features.map((feature, idx) => (
                          <motion.li 
                            key={idx}
                            variants={featureVariants}
                            transition={{ delay: 0.1 * idx, duration: 0.4 }}
                            className="flex items-center gap-3 text-sm"
                          >
                            <div className={`w-8 h-8 rounded-full ${tier.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                              <feature.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium">{feature.text}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter>
                      <Button
                        variant={selectedTier === tier.id ? "default" : "outline"}
                        className={cn(
                          "w-full py-6 text-base font-semibold rounded-xl",
                          selectedTier === tier.id ? tier.gradient : "",
                          selectedTier === tier.id ? "text-white shadow-lg" : ""
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTierSelect(tier.id);
                        }}
                      >
                        {selectedTier === tier.id ? (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center"
                          >
                            <Check className="mr-2" /> Selected
                          </motion.span>
                        ) : "Select Tier"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center mt-8"
          >
            <MotionButton
              size="lg"
              className={cn(
                "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 px-10 py-7 rounded-full shadow-lg transition-all duration-300 text-lg font-bold",
                !selectedTier && "opacity-70 pointer-events-none"
              )}
              onClick={handleContinue}
              disabled={!selectedTier}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Continue to Registration
              <ArrowRight className="ml-2 w-5 h-5" />
            </MotionButton>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 text-center text-muted-foreground text-sm max-w-2xl mx-auto"
          >
            <p>By continuing, you agree to our Terms of Service and Privacy Policy. 
            You can change your plan at any time after registration.</p>
          </motion.div>
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default LivingPlanSelection;
