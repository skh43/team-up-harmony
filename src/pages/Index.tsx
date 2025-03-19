import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import RoommateJourney from './RoommateJourney';
import { useTranslation } from 'react-i18next';
import { Check, Users, Shield, Home, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Smart Matching",
      description: "Our intelligent algorithm connects you with roommates who complement your lifestyle and align with your preferences."
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Verified Profiles",
      description: "Every user undergoes thorough verification, ensuring your complete peace of mind and safety."
    },
    {
      icon: <Home className="h-6 w-6 text-blue-600" />,
      title: "Quality Listings",
      description: "Browse exceptional, fully-vetted properties tailored to your specific budget requirements and preferences."
    },
    {
      icon: <Star className="h-6 w-6 text-blue-600" />,
      title: "Seamless Experience",
      description: "Enjoy a premium journey from initial match to move-in day, with every step expertly designed to be effortless."
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
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center justify-center bg-blue-50 px-4 py-1.5 rounded-full mb-6">
                <Users className="text-blue-600 mr-2 h-4 w-4" />
                <span className="text-blue-600 text-sm font-medium">Find Your Perfect Roommate</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6 leading-tight">
                Find Your <span className="text-blue-600">Perfect</span> <br />
                Roommate Match
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Connect with compatible roommates based on lifestyle, habits, and preferences. Say goodbye to roommate nightmares!
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-md"
                  onClick={() => navigate('/living-plan-selection')}
                >
                  Get Started
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5 px-6 rounded-md"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1.5" />
                  <span>Verified Users</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1.5" />
                  <span>Smart Matching</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1.5" />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.img 
                src="/public/lovable-uploads/f6a689e5-9dc4-44c7-a958-19de3d72db76.png" 
                alt="Roommate matching" 
                className="w-full h-auto rounded-lg shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold font-playfair mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Premium Features Tailored For You
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              We've built powerful tools to make your roommate search efficient, safe, and successful.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="p-6 border border-gray-100 rounded-lg bg-white hover:border-blue-200 transition-all"
                variants={itemVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                style={{ overflow: "hidden" }}
              >
                <motion.div 
                  className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360, backgroundColor: "#EBF5FF" }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 font-playfair text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-50 rounded-full opacity-20 z-0"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <div id="how-it-works">
        <RoommateJourney />
      </div>
      
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-playfair mb-4">
              Hear From Our Users
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy users who found their perfect roommate match.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 overflow-hidden rounded-full border-4 border-white shadow-md">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-center text-gray-700 italic mb-4 font-playfair">"{testimonial.quote}"</p>
                <div className="text-center">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 font-playfair">
            Ready to find your ideal roommate?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of people who have found their perfect match.
          </p>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-md inline-flex items-center"
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
