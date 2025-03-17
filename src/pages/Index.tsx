
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MainLayout from '@/layouts/MainLayout';
import { ArrowRight, Home, Users, Search, UserPlus, Route, MessageCircle, Handshake } from 'lucide-react';
import Logo from '@/components/Logo';
import { Card, CardContent, CardDescription } from "@/components/ui/card";

const Index = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({
    hero: false,
    features: false,
    steps: false,
    cta: false
  });
  
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    steps: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          setIsVisible(prev => ({ ...prev, [targetId]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsVisible(prev => ({ ...prev, hero: true }));
  }, []);

  return (
    <MainLayout hideNavbar={false} className="px-0 py-0">
      {/* Hero Section */}
      <section
        id="hero"
        ref={sectionRefs.hero}
        className="min-h-screen flex items-center justify-center px-4 pt-16 relative"
      >
        <div className="max-w-7xl mx-auto text-center relative z-10 pt-10">
          <div className={cn(
            "transition-all duration-1000 transform",
            isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="mb-10 text-center">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Saudi Arabia's Premier Roommate Finder
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to</h1>
              <div className="flex justify-center mb-3">
                <Logo size="xlarge" showText={false} />
              </div>
              
              <p className="text-lg md:text-xl text-blue-700 font-medium mb-3">
                roommate discovery, simplified
              </p>
              
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Shared living made easy. Find your perfect roommate match and ideal home in Saudi Arabia.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <Button asChild size="lg" className="rounded-full px-8 py-6 text-base shadow-subtle">
                  <Link to="/register">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-base">
                  <Link to="/properties">Browse Properties</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "mt-16 md:mt-24 transition-all duration-1000 delay-300 transform",
            isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-elegant">
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary/20 to-accent/30">
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
                  <div className="glass-panel rounded-xl px-6 py-4 max-w-md backdrop-blur-md bg-white/10">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary/60" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Find Your Perfect Match</h3>
                        <p className="text-sm text-foreground/70">Swipe, match, and connect with compatible roommates</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={sectionRefs.features}
        className="py-20 md:py-32 px-4 relative"
      >        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4 inline-block">
              Our Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Everything you need to find the <span className="text-primary">perfect match</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Team Up provides a comprehensive platform designed to make finding roommates and living spaces in Saudi Arabia seamless and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className={cn(
                  "overflow-hidden shadow-subtle",
                  isVisible.features ? 
                    "opacity-100 translate-y-0" : 
                    "opacity-0 translate-y-12"
                )}
                style={{ 
                  transitionDelay: isVisible.features ? `${index * 100}ms` : '0ms' 
                }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="steps"
        ref={sectionRefs.steps}
        className="py-20 md:py-32 px-4 bg-gradient-to-b from-background via-purple-50/20 to-accent/10 relative"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible.steps ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-4 inline-block">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9]">
              How Team Up <span className="text-primary">works</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our simple and intuitive process makes finding your perfect roommate and home a breeze.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-1 h-[calc(100%-6rem)] bg-gradient-to-b from-[#9b87f5] via-[#0EA5E9] to-transparent rounded-full"></div>
            
            <div className="space-y-16 md:space-y-32 relative z-10">
              {steps.map((step, index) => (
                <div 
                  key={step.title}
                  className={cn(
                    "transition-all duration-700",
                    isVisible.steps ? 
                      "opacity-100 translate-y-0" : 
                      "opacity-0 translate-y-12"
                  )}
                  style={{ 
                    transitionDelay: isVisible.steps ? `${index * 200}ms` : '0ms' 
                  }}
                >
                  <Card className={cn(
                    "overflow-hidden shadow-md border-0",
                    index % 2 === 0 
                      ? "bg-gradient-to-tr from-background to-blue-50/20" 
                      : "bg-gradient-to-bl from-background to-purple-50/20"
                  )}>
                    <CardContent className="p-6">
                      <div className={cn(
                        "grid md:grid-cols-2 gap-8 items-center",
                        index % 2 === 1 ? "md:flex-row-reverse" : ""
                      )}>
                        <div className={cn(
                          "relative",
                          index % 2 === 1 ? "md:order-2" : "md:order-1"
                        )}>
                          <div className="rounded-xl overflow-hidden aspect-video w-full bg-gradient-to-tr from-primary/5 to-accent/10">
                            <div className="w-full h-full flex items-center justify-center">
                              <step.icon className="w-16 h-16 text-primary/60" />
                            </div>
                          </div>
                        </div>
                        
                        <div className={cn(
                          "space-y-4",
                          index % 2 === 1 ? "md:order-1 md:text-right" : "md:order-2"
                        )}>
                          <div className={cn(
                            "flex items-center", 
                            index % 2 === 1 ? "md:justify-end" : ""
                          )}>
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#0EA5E9] text-white font-bold">
                              {index + 1}
                            </div>
                            <div className="ml-4">
                              <h3 className="text-2xl font-bold flex items-center gap-2">
                                {step.title}
                                <span className="text-[#8B5CF6]">{step.icon && <step.icon className="h-6 w-6" />}</span>
                              </h3>
                            </div>
                          </div>
                          <p className="text-lg text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        ref={sectionRefs.cta}
        className="py-20 md:py-32 px-4 relative"
      >
        <div 
          className={cn(
            "max-w-5xl mx-auto glass-panel rounded-2xl p-8 md:p-12 text-center shadow-elegant transition-all duration-700 transform relative z-10",
            isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to find your perfect <span className="text-primary">teamup</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join thousands of users in Saudi Arabia who have found their ideal living situation with Team Up.
          </p>
          <Button asChild size="lg" className="rounded-full px-8 text-base shadow-subtle">
            <Link to="/register">Create Your Profile <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

// Features data
const features = [
  {
    icon: Users,
    title: "Intelligent Matching",
    description: "Our advanced algorithm finds roommates based on your lifestyle, preferences, and compatibility factors."
  },
  {
    icon: Home,
    title: "Property Listings",
    description: "Browse verified property listings from landlords and agents across Saudi Arabia."
  },
  {
    icon: Search,
    title: "Flexible Search Options",
    description: "Filter by location, price range, amenities, and more to find your perfect living space."
  },
  {
    icon: function ProfileGroupIcon(props) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 1 0 7.75"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      );
    },
    title: "Different Living Plans",
    description: "Choose from Basic, Comfort, or Elite living plans to match your lifestyle and budget needs."
  },
  {
    icon: function GridIcon(props) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      );
    },
    title: "Detailed Preferences",
    description: "Set detailed preferences for roommates, from daily habits to lifestyle choices for better matches."
  },
  {
    icon: function ShieldIcon(props) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      );
    },
    title: "Verified Profiles",
    description: "All users undergo verification to ensure a safe and secure platform for everyone."
  }
];

// Steps data with enhanced animation effects but without images
const steps = [
  {
    title: "Select Your Path",
    description: "Choose between 'Host My Space' or 'Seek & Settle'. Then select your living plan tier: Basic, Comfort, or Elite.",
    icon: Route
  },
  {
    title: "Create Your Profile",
    description: "Sign up and create your detailed profile, including your lifestyle preferences, habits, and what you're looking for in a roommate.",
    icon: UserPlus
  },
  {
    title: "Start Matching",
    description: "Browse potential roommates or properties, swipe right on profiles you like, and start conversations when you match.",
    icon: MessageCircle
  },
  {
    title: "Team Up",
    description: "Once you've found the perfect match, arrange meetings, discuss details, and finalize your new living arrangement.",
    icon: Handshake
  }
];

export default Index;
