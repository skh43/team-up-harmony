
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import RoommateJourney from './RoommateJourney';
import ModernLogo from '@/components/ModernLogo';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Check, Shield, Users, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const MotionButton = motion(Button);

const Index = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Smart Matching",
      description: "Our AI-powered algorithm finds roommates with compatible lifestyles and preferences."
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      title: "Verified Profiles",
      description: "Every user is verified for your safety and peace of mind."
    },
    {
      icon: <Home className="h-6 w-6 text-emerald-500" />,
      title: "Quality Listings",
      description: "Browse high-quality, verified properties that match your budget and needs."
    },
    {
      icon: <Star className="h-6 w-6 text-amber-500" />,
      title: "Seamless Experience",
      description: "From matching to moving in, we make the entire process smooth and stress-free."
    }
  ];

  const testimonials = [
    {
      quote: "I found my perfect roommate within a week! The matching process was spot on.",
      author: "Sarah K.",
      role: "Graduate Student",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "As a landlord, finding reliable tenants has never been easier. Highly recommended!",
      author: "Michael T.",
      role: "Property Owner",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The verification process gave me peace of mind when choosing who to live with.",
      author: "Jessica M.",
      role: "Young Professional",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <MainLayout className="min-h-screen">
      {/* Hero Section with enhanced visuals */}
      <section className="py-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-purple-50 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-pink-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-6">
                <ModernLogo size="xlarge" className="mx-auto lg:mx-0" variant="glow" />
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Badge 
                  variant="gradientPurple" 
                  animation="shimmer"
                  className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
                >
                  Find Your Perfect Living Match
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600">{t('index.title')}</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground mb-8 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {t('index.subtitle')}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <MotionButton 
                  variant="gradientPurple" 
                  size="xl" 
                  radius="full"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="font-semibold shadow-lg"
                  asChild
                >
                  <a href="#how-it-works">
                    {t('common.getStarted')}
                    <ChevronRight className="ml-1 w-5 h-5" />
                  </a>
                </MotionButton>
                
                <MotionButton 
                  variant="outline" 
                  size="xl" 
                  radius="full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-purple-300 text-purple-700 font-semibold"
                  asChild
                >
                  <a href="/about">
                    {t('common.learnMore')}
                  </a>
                </MotionButton>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex items-center gap-4 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  <span>Verified Users</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  <span>Smart Matching</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  <span>100% Secure</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="relative">
                {/* Decorative elements around the image */}
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-purple-200 rounded-full blur-xl opacity-70"></div>
                <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-blue-200 rounded-full blur-xl opacity-70"></div>
                
                <img 
                  src="/public/lovable-uploads/f6a689e5-9dc4-44c7-a958-19de3d72db76.png" 
                  alt={t('common.logoAlt')} 
                  className="w-full h-auto rounded-2xl shadow-2xl relative z-10 border border-white/50"
                />
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-6 left-10 bg-white rounded-lg shadow-lg px-3 py-2 flex items-center z-20"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
                  <span className="text-sm font-medium">1000+ Active Users</span>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-6 right-10 bg-white rounded-lg shadow-lg px-3 py-2 flex items-center z-20"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="bg-purple-500 rounded-full w-3 h-3 mr-2"></div>
                  <span className="text-sm font-medium">500+ Successful Matches</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Feature Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              variant="softPurple" 
              className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
            >
              Why Choose TeamUp
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
              Features Designed for You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built powerful tools to make your roommate search efficient, safe, and successful.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card variant="glass" radius="xl" className="h-full">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 mb-5 rounded-full bg-gray-100 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <div id="how-it-works">
        <RoommateJourney />
      </div>
      
      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              variant="softBlue" 
              className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
            >
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 mb-4">
              Hear From Our Users
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of happy users who found their perfect roommate match.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card variant="glass" radius="xl" className="h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 overflow-hidden rounded-full border-4 border-white shadow-md">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="text-center text-lg italic mb-4">"{testimonial.quote}"</p>
                    <div className="text-center">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        
        <div className="container px-4 mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {t('index.ready')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('index.joinThousands')}
            </p>
            
            <MotionButton 
              variant="gradientPurple"
              size="xl"
              radius="full"
              className="px-10 py-6 text-base font-bold shadow-lg"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)" 
              }}
              whileTap={{ scale: 0.95 }}
              asChild
            >
              <a href="/register">
                {t('common.signUpNow')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </MotionButton>
            
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required. Start for free and upgrade anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
