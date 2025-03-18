
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Award, Crown, Shield, Info, Users, Star, Clock, Gift, Sparkles } from 'lucide-react';
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
      features: [
        { text: 'All Basic features', icon: Check },
        { text: 'Advanced matching algorithm', icon: Star },
        { text: 'Unlimited messages', icon: Users },
        { text: 'Priority in search results', icon: Crown },
        { text: 'Compatibility scoring', icon: Gift },
      ],
      price: '$9.99/month',
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

  // If not authenticated, return null (will redirect in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <MainLayout>
      <section className="py-12 min-h-screen bg-gradient-to-b from-white to-gray-50">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container max-w-6xl mx-auto px-4"
        >
          <div className="text-center mb-10">
            <ModernLogo size="large" className="mx-auto mb-6" />
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-12 border border-gray-100"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">Select Your Plan Tier</h2>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto"
            >
              {tiers.map((tier, index) => (
                <motion.div 
                  key={tier.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="flex"
                >
                  <Card
                    className={cn(
                      "w-full border-2 shadow-md transition-all relative overflow-hidden hover:shadow-xl",
                      selectedTier === tier.id ? tier.borderColor : "border-muted",
                      "cursor-pointer bg-white"
                    )}
                    onClick={() => handleTierSelect(tier.id)}
                  >
                    {/* Decorative background element */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-10 bg-gradient-to-br from-blue-400 to-purple-600 blur-xl" />
                    
                    {tier.recommended && (
                      <div className="absolute top-0 right-0">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 rounded-tl-none rounded-br-none">
                          Recommended
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-full ${tier.gradient} flex items-center justify-center mb-4 mx-auto shadow-lg transform transition-transform duration-300 hover:scale-110`}>
                        <tier.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className={cn("flex items-center justify-between", tier.textColor)}>
                        {tier.title}
                        {selectedTier === tier.id && <Check className="text-green-500" />}
                      </CardTitle>
                      <CardDescription className="text-center mt-2">{tier.description}</CardDescription>
                      
                      <div className="mt-4 text-center">
                        <span className="text-2xl font-bold">{tier.price}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-2">
                        {tier.features.map((feature, idx) => (
                          <motion.li 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx, duration: 0.4 }}
                            className="flex items-center gap-2 text-sm"
                          >
                            <feature.icon className={`w-4 h-4 ${tier.textColor} flex-shrink-0`} />
                            <span>{feature.text}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter>
                      <Button
                        variant={selectedTier === tier.id ? "default" : "outline"}
                        className={cn(
                          "w-full py-6",
                          selectedTier === tier.id ? tier.gradient : "",
                          selectedTier === tier.id ? "text-white" : ""
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
            {/* Replace Button with MotionButton to support motion props */}
            <MotionButton
              size="lg"
              className={cn(
                "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 px-8 py-6 rounded-full shadow-md transition-all duration-300",
                !selectedTier && "opacity-70 pointer-events-none"
              )}
              onClick={handleContinue}
              disabled={!selectedTier}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue to Registration
              <ArrowRight className="ml-2" />
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
