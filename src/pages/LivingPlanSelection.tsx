import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, CheckCircle2, Star, Package, Home, Check } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';

type LivingPlan = 'basic' | 'comfort' | 'elite' | null;

interface PlanFeature {
  name: string;
  basic: boolean;
  comfort: boolean;
  elite: boolean;
}

const LivingPlanSelection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<LivingPlan>(null);
  
  const handlePlanChange = (plan: LivingPlan) => {
    setSelectedPlan(plan);
  };
  
  const handleContinue = () => {
    if (!selectedPlan) {
      toast({
        title: "Selection required",
        description: "Please select a living plan to continue",
        variant: "destructive",
      });
      return;
    }
    
    // Store selection
    localStorage.setItem('livingPlan', selectedPlan);
    
    // Navigate to path selection after selecting a plan
    navigate('/path-selection');
  };
  
  // Define plan card gradients and accent colors
  const planStyles = {
    basic: {
      gradient: "from-[#01CDFA] to-[#516CF7]",
      iconBg: "bg-[#01CDFA]/10",
      iconColor: "text-[#01CDFA]",
    },
    comfort: {
      gradient: "from-[#8563C9] to-[#A83ACB]",
      iconBg: "bg-[#8563C9]/10",
      iconColor: "text-[#8563C9]",
    },
    elite: {
      gradient: "from-[#FFD43B] to-[#FF9500]",
      iconBg: "bg-[#FFD43B]/10", 
      iconColor: "text-[#FFD43B]",
    }
  };
  
  return (
    <MainLayout className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Living Plan</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the plan that best fits your lifestyle and preferences.
          </p>
          
          {/* Show a small logo for brand alignment */}
          <div className="flex justify-center my-6">
            <Logo size="small" showText={true} />
          </div>
          
          {/* Moved step indicator down here */}
          <span className="inline-block px-3 py-1 mb-8 mt-4 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Step 1 of 4
          </span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <PlanCard
            icon={<Package className="h-8 w-8" />}
            title="Basic Living"
            price="Free"
            description="Essential matchmaking for budget-conscious roommates"
            features={[
              "5 Matches Per Day",
              "Basic Preferences",
              "Standard Filters",
              "In-App Messaging"
            ]}
            selected={selectedPlan === 'basic'}
            onClick={() => handlePlanChange('basic')}
            gradientClasses={planStyles.basic.gradient}
            iconBgClass={planStyles.basic.iconBg}
            iconColorClass={planStyles.basic.iconColor}
          />
          
          <PlanCard
            icon={<Home className="h-8 w-8" />}
            title="Comfort Living"
            price="SAR 29.99/month"
            description="Enhanced matching with detailed preferences"
            features={[
              "20 Matches Per Day",
              "Detailed Preferences",
              "Advanced Filters",
              "Priority Messaging",
              "Background Verification"
            ]}
            highlighted={true}
            selected={selectedPlan === 'comfort'}
            onClick={() => handlePlanChange('comfort')}
            gradientClasses={planStyles.comfort.gradient}
            iconBgClass={planStyles.comfort.iconBg}
            iconColorClass={planStyles.comfort.iconColor}
          />
          
          <PlanCard
            icon={<Star className="h-8 w-8" />}
            title="Elite Living"
            price="SAR 59.99/month"
            description="Premium experience for the most discerning roommates"
            features={[
              "Unlimited Matches",
              "Ultra-detailed Preferences",
              "Premium Filters",
              "Priority Support",
              "Background Verification",
              "Personality Matching",
              "Exclusive Property Listings"
            ]}
            selected={selectedPlan === 'elite'}
            onClick={() => handlePlanChange('elite')}
            gradientClasses={planStyles.elite.gradient}
            iconBgClass={planStyles.elite.iconBg}
            iconColorClass={planStyles.elite.iconColor}
          />
        </div>
        
        <div className="max-w-4xl mx-auto mb-10">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">Compare Features</h3>
            <p className="text-muted-foreground">See what each plan includes to make the right choice</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">Feature</th>
                  <th className="py-3 text-center font-medium">
                    <span className="flex flex-col items-center">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#01CDFA] to-[#516CF7]">Basic</span>
                    </span>
                  </th>
                  <th className="py-3 text-center font-medium">
                    <span className="flex flex-col items-center">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8563C9] to-[#A83ACB]">Comfort</span>
                    </span>
                  </th>
                  <th className="py-3 text-center font-medium">
                    <span className="flex flex-col items-center">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD43B] to-[#FF9500]">Elite</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {planFeatures.map((feature, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4 text-left">{feature.name}</td>
                    <td className="py-4 text-center">
                      {feature.basic ? 
                        <Check className="h-5 w-5 text-[#01CDFA] mx-auto" /> : 
                        <span className="text-muted-foreground">-</span>
                      }
                    </td>
                    <td className="py-4 text-center">
                      {feature.comfort ? 
                        <Check className="h-5 w-5 text-[#8563C9] mx-auto" /> : 
                        <span className="text-muted-foreground">-</span>
                      }
                    </td>
                    <td className="py-4 text-center">
                      {feature.elite ? 
                        <Check className="h-5 w-5 text-[#FFD43B] mx-auto" /> : 
                        <span className="text-muted-foreground">-</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleContinue}
            className="rounded-full px-8 py-6 text-base shadow-subtle"
          >
            Continue <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

interface PlanCardProps {
  icon: React.ReactNode;
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  selected: boolean;
  onClick: () => void;
  gradientClasses?: string;
  iconBgClass?: string;
  iconColorClass?: string;
}

const PlanCard = ({ 
  icon, 
  title, 
  price, 
  description, 
  features, 
  highlighted = false,
  selected, 
  onClick,
  gradientClasses = "from-primary to-primary",
  iconBgClass = "bg-primary/10",
  iconColorClass = "text-primary"
}: PlanCardProps) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer border h-full flex flex-col transition-all duration-300 hover:border-primary/50 relative overflow-hidden",
        selected ? "border-primary shadow-elegant" : "shadow-subtle",
        highlighted ? "scale-105 md:-translate-y-2" : ""
      )}
      onClick={onClick}
    >
      {/* Top gradient border */}
      <div className={cn(
        "absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r",
        gradientClasses
      )} />
      
      {selected && (
        <>
          {/* Add a subtle glow effect when selected */}
          <div className="absolute inset-0 opacity-5 bg-gradient-to-b from-transparent to-current pointer-events-none" />
          <div className="absolute top-3 right-3">
            <CheckCircle2 className={cn("h-6 w-6", iconColorClass)} />
          </div>
        </>
      )}
      
      <CardHeader>
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors",
          selected ? iconBgClass : "bg-secondary",
          selected ? iconColorClass : "text-foreground/80" 
        )}>
          {icon}
        </div>
        <CardTitle className="text-xl">
          <span className={cn(
            "bg-clip-text",
            selected && "text-transparent bg-gradient-to-r",
            selected && gradientClasses
          )}>
            {title}
          </span>
        </CardTitle>
        <div>
          <span className={cn(
            "text-2xl font-bold",
            selected && "bg-clip-text text-transparent bg-gradient-to-r",
            selected && gradientClasses
          )}>
            {price}
          </span>
          {price !== "Free" && <span className="text-sm text-muted-foreground ml-1"></span>}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="text-sm mb-4">{description}</CardDescription>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={cn("h-4 w-4 mr-2 mt-0.5 flex-shrink-0", iconColorClass)} />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-4 mt-auto">
        <Button 
          variant={selected ? "default" : "outline"} 
          className={cn(
            "w-full rounded-md",
            selected ? "bg-gradient-to-r shadow-md" : "",
            selected && gradientClasses,
            highlighted && !selected ? "border border-primary/20" : ""
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {selected ? "Selected" : "Select Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const planFeatures: PlanFeature[] = [
  {
    name: "Daily Match Limit",
    basic: true,
    comfort: true,
    elite: true
  },
  {
    name: "Basic Preferences (Gender, Budget)",
    basic: true,
    comfort: true,
    elite: true
  },
  {
    name: "In-App Messaging",
    basic: true,
    comfort: true,
    elite: true
  },
  {
    name: "Location Filters",
    basic: true,
    comfort: true,
    elite: true
  },
  {
    name: "Detailed Preferences (Lifestyle)",
    basic: false,
    comfort: true,
    elite: true
  },
  {
    name: "Background Verification",
    basic: false,
    comfort: true,
    elite: true
  },
  {
    name: "Premium Filters",
    basic: false,
    comfort: true,
    elite: true
  },
  {
    name: "Personality Matching",
    basic: false,
    comfort: false,
    elite: true
  },
  {
    name: "Priority Support",
    basic: false,
    comfort: false,
    elite: true
  },
  {
    name: "Exclusive Property Listings",
    basic: false,
    comfort: false,
    elite: true
  },
  {
    name: "Luxury Amenities Preferences",
    basic: false,
    comfort: false,
    elite: true
  }
];

export default LivingPlanSelection;
