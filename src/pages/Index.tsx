
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import RoommateJourney from './RoommateJourney';
import { useTranslation } from 'react-i18next';
import { Check, Users, Shield, Home, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ModernLogo from '@/components/ModernLogo';

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Smart Matching",
      description: "Our intelligent algorithm connects you with roommates who complement your lifestyle and align with your preferences.",
      color: "from-airbnb-red to-airbnb-purple"
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Verified Profiles",
      description: "Every user undergoes thorough verification, ensuring your complete peace of mind and safety.",
      color: "from-airbnb-purple to-airbnb-navy"
    },
    {
      icon: <Home className="h-6 w-6 text-white" />,
      title: "Quality Listings",
      description: "Browse exceptional, fully-vetted properties tailored to your specific budget requirements and preferences.",
      color: "from-airbnb-red to-airbnb-darkpink"
    },
    {
      icon: <Star className="h-6 w-6 text-white" />,
      title: "Seamless Experience",
      description: "Enjoy a premium journey from initial match to move-in day, with every step expertly designed to be effortless.",
      color: "from-airbnb-darkpink to-airbnb-navy"
    }
  ];

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
    },
    hover: {
      y: -10,
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring", 
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <MainLayout className="min-h-screen">
      <section className="py-16 bg-airbnb-light/30">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center justify-center bg-airbnb-red/10 px-4 py-1.5 rounded-full mb-6">
                <Users className="text-airbnb-red mr-2 h-4 w-4" />
                <span className="text-airbnb-red text-sm font-medium">Find Your Perfect Roommate</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6 leading-tight">
                Find Your <span className="bg-gradient-to-r from-airbnb-red to-airbnb-navy bg-clip-text text-transparent">Perfect</span> <br />
                Roommate Match
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Connect with compatible roommates based on lifestyle, habits, and preferences. Say goodbye to roommate nightmares!
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  className="bg-gradient-to-r from-airbnb-red to-airbnb-navy hover:from-airbnb-darkpink hover:to-airbnb-navy text-white font-medium py-2.5 px-6 rounded-md"
                  onClick={() => navigate('/living-plan-selection')}
                >
                  Get Started
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-airbnb-red/30 text-airbnb-navy hover:bg-airbnb-light/20 font-medium py-2.5 px-6 rounded-md"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-airbnb-red mr-1.5" />
                  <span>Verified Users</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-airbnb-red mr-1.5" />
                  <span>Smart Matching</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-airbnb-red mr-1.5" />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center items-center">
              <motion.div 
                className="flex justify-center items-center -mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="p-2 rounded-xl transition-all duration-300 hover:scale-105">
                  <ModernLogo 
                    size="giant" 
                    variant="default" 
                    className="w-auto h-auto scale-125" 
                    showTagline={true} 
                  />
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-airbnb-red to-airbnb-navy text-white py-2 px-6 rounded-full font-bold shadow-lg opacity-0 transition-opacity duration-300 team-up-label">
                    Join Our Tribe
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className={`p-6 rounded-lg bg-gradient-to-br ${feature.color} shadow-lg border border-white/30 hover:shadow-xl transition-all`}
                variants={itemVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                style={{ overflow: "hidden" }}
              >
                <motion.div 
                  className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 font-playfair text-white">{feature.title}</h3>
                <p className="text-white/85">{feature.description}</p>
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-white/10 rounded-full opacity-20 z-0"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <div id="how-it-works" className="bg-gradient-to-r from-airbnb-light/30 to-airbnb-light/10">
        <div className="container px-4 mx-auto max-w-6xl py-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-playfair mb-4 bg-gradient-to-r from-airbnb-purple to-airbnb-navy bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding the perfect roommate is easy with our guided process
            </p>
          </div>
        </div>
        <RoommateJourney />
      </div>
      
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 font-playfair bg-gradient-to-r from-airbnb-red to-airbnb-navy bg-clip-text text-transparent">
            Ready to find your ideal roommate?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of people who have found their perfect match.
          </p>
          
          <Button 
            className="bg-gradient-to-r from-airbnb-purple to-airbnb-navy hover:from-airbnb-red hover:to-airbnb-purple text-white font-medium py-3 px-8 rounded-md inline-flex items-center"
            onClick={() => navigate('/register')}
          >
            Sign Up Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="mt-6 text-sm text-gray-500">
            No credit card required. Start for free and upgrade anytime.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
