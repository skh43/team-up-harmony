import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import AdComponent from '@/components/AdComponent';
import { 
  Compass, 
  UserCog, 
  UsersRound, 
  HomeIcon, 
  ChevronRight,
  Handshake,
  Sparkles
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MotionCard = motion(Card);
const MotionButton = motion(Button);

const RoommateJourney = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  
  const handleStartJourney = () => {
    if (isAuthenticated) {
      navigate('/living-plan-selection');
    } else {
      navigate('/login');
    }
  };
  
  const steps = [
    {
      number: 1,
      title: "Select Your Path",
      description: "Choose between 'Host My Space' or 'Seek & Settle'. Then select your living plan tier: Basic, Comfort, or Elite.",
      icon: <Compass className="h-10 w-10" />,
      gradientFrom: "from-airbnb-red",
      gradientTo: "to-airbnb-navy",
      cardBg: "bg-airbnb-light"
    },
    {
      number: 2,
      title: "Create Your Profile",
      description: "Sign up and create your detailed profile, including your lifestyle preferences, habits, and what you're looking for in a roommate.",
      icon: <UserCog className="h-10 w-10" />,
      gradientFrom: "from-airbnb-red",
      gradientTo: "to-airbnb-darkpink",
      cardBg: "bg-airbnb-light"
    },
    {
      number: 3,
      title: "Start Matching",
      description: "Browse potential roommates or properties, swipe right on profiles you like, and start conversations when you match.",
      icon: <UsersRound className="h-10 w-10" />,
      gradientFrom: "from-airbnb-darkpink",
      gradientTo: "to-airbnb-navy",
      cardBg: "bg-airbnb-light"
    },
    {
      number: 4,
      title: "Team Up",
      description: "Once you've found the perfect match, arrange meetings, discuss details, and finalize your new living arrangement.",
      icon: <Handshake className="h-10 w-10" />,
      gradientFrom: "from-airbnb-red",
      gradientTo: "to-airbnb-purple",
      cardBg: "bg-airbnb-light"
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
    hidden: { opacity: 0, y: 30 },
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
    <section className="py-16 bg-gradient-to-b from-white to-airbnb-light/30 overflow-hidden">
      <div className="absolute left-0 top-1/3 w-32 h-32 bg-gradient-to-br from-airbnb-red/20 to-airbnb-navy/20 rounded-full blur-3xl"></div>
      <div className="absolute right-0 top-2/3 w-40 h-40 bg-gradient-to-br from-airbnb-red/20 to-airbnb-darkpink/20 rounded-full blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-3">
            <Badge 
              variant="gradientPurple" 
              size="lg" 
              animation="shimmer"
              className="rounded-full px-4 py-1.5 font-medium text-white bg-gradient-to-r from-airbnb-red to-airbnb-navy"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              How It Works
            </Badge>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-airbnb-red to-airbnb-navy">
            {t('roommate.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('roommate.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto mb-10">
          <AdComponent type="inline" isSpinning={true} />
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto mb-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.3 } 
              }}
            >
              <MotionCard 
                variant="glass"
                radius="xl"
                className={`relative overflow-hidden border-none shadow-lg h-full ${step.cardBg}`}
                whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 164, 212, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 rounded-full bg-gradient-to-br opacity-20"></div>
                
                <Badge 
                  variant="gradient"
                  size="lg"
                  className={`absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-r ${step.gradientFrom} ${step.gradientTo} border-0 shadow-md`}
                >
                  {step.number}
                </Badge>
                
                <CardContent className="pt-12 pb-8 px-6">
                  <motion.div 
                    className={`mb-6 w-16 h-16 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${step.gradientFrom} ${step.gradientTo} shadow-md`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {step.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-3 text-airbnb-navy">{step.title}</h3>
                  <p className="text-airbnb-gray">{step.description}</p>
                </CardContent>
              </MotionCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="max-w-xl mx-auto mb-10">
          <AdComponent type="inline" />
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <MotionButton 
            variant="airbnbGradient"
            size="xl"
            radius="full"
            onClick={handleStartJourney}
            className="px-10 py-6 text-base font-bold shadow-lg bg-gradient-to-r from-airbnb-red to-airbnb-navy hover:from-airbnb-darkpink hover:to-airbnb-navy"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px -5px rgba(0, 164, 212, 0.5)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            {t('common.startJourney')}
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </MotionButton>
          
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <p className="text-airbnb-gray">
              No credit card required. Start your journey today!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoommateJourney;
