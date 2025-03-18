
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { CheckCircle2, Calendar, UserCircle, Users, Home } from 'lucide-react';

const RoommateJourney = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
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
      icon: <Calendar className="h-8 w-8" />
    },
    {
      number: 2,
      title: "Create Your Profile",
      description: "Sign up and create your detailed profile, including your lifestyle preferences, habits, and what you're looking for in a roommate.",
      icon: <UserCircle className="h-8 w-8" />
    },
    {
      number: 3,
      title: "Start Matching",
      description: "Browse potential roommates or properties, swipe right on profiles you like, and start conversations when you match.",
      icon: <Users className="h-8 w-8" />
    },
    {
      number: 4,
      title: "Team Up",
      description: "Once you've found the perfect match, arrange meetings, discuss details, and finalize your new living arrangement.",
      icon: <Home className="h-8 w-8" />
    }
  ];
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Finding the perfect roommate is easy with our guided process
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto mb-12">
          {steps.map((step) => (
            <Card key={step.number} className="relative border-none shadow-md hover:shadow-lg transition-shadow">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {step.number}
              </span>
              <CardContent className="pt-8 pb-6">
                <div className="mb-4 w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleStartJourney}
            className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoommateJourney;
