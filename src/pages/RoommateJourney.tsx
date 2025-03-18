
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { Badge } from "@/components/ui/badge";
import { 
  Compass, 
  UserCog, 
  UsersRound, 
  HomeIcon, 
  ChevronRight 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
      title: t('roommate.step1Title'),
      description: t('roommate.step1Description'),
      icon: <Compass className="h-10 w-10" />,
      gradientFrom: "from-indigo-400",
      gradientTo: "to-purple-500",
      cardBg: "bg-purple-50"
    },
    {
      number: 2,
      title: t('roommate.step2Title'),
      description: t('roommate.step2Description'),
      icon: <UserCog className="h-10 w-10" />,
      gradientFrom: "from-cyan-400",
      gradientTo: "to-blue-500",
      cardBg: "bg-blue-50"
    },
    {
      number: 3,
      title: t('roommate.step3Title'),
      description: t('roommate.step3Description'),
      icon: <UsersRound className="h-10 w-10" />,
      gradientFrom: "from-orange-400",
      gradientTo: "to-pink-500",
      cardBg: "bg-pink-50"
    },
    {
      number: 4,
      title: t('roommate.step4Title'),
      description: t('roommate.step4Description'),
      icon: <HomeIcon className="h-10 w-10" />,
      gradientFrom: "from-green-400",
      gradientTo: "to-emerald-500",
      cardBg: "bg-green-50"
    }
  ];
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-700">
            {t('roommate.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('roommate.subtitle')}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto mb-12">
          {steps.map((step) => (
            <Card 
              key={step.number} 
              className={`relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${step.cardBg}`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 rounded-full bg-gradient-to-br opacity-20"></div>
              
              <Badge 
                className={`absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-r ${step.gradientFrom} ${step.gradientTo} border-0`}
              >
                {step.number}
              </Badge>
              
              <CardContent className="pt-12 pb-8 px-6">
                <div className={`mb-6 w-16 h-16 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${step.gradientFrom} ${step.gradientTo} shadow-md`}>
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleStartJourney}
            className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {t('common.startJourney')}
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoommateJourney;
