import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MainLayout from '@/layouts/MainLayout';
import { ArrowRight, Home, Users, Search } from 'lucide-react';
import Logo from '@/components/Logo';

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
      <section
        id="hero"
        ref={sectionRefs.hero}
        className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-radial from-accent/40 via-background to-background" />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10 pt-24">
          <div className={cn(
            "transition-all duration-1000 transform",
            isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="inline-block mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Saudi Arabia's Premier Roommate Finder
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block">Welcome to </span>
              <div className="flex justify-center mt-3">
                <Logo size="xlarge" showText={false} />
              </div>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-3 font-medium text-blue-700">
              roommate discovery, simplified
            </p>
            
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-8 leading-relaxed">
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
          
          <div className={cn(
            "mt-16 md:mt-24 transition-all duration-1000 delay-300 transform",
            isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-elegant">
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary/20 to-accent/30 animate-pulse-slow">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <span className="text-primary/60 mb-4">App preview image goes here</span>
                  <div className="glass-panel rounded-xl px-6 py-4 max-w-md">
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
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </section>

      <section
        id="features"
        ref={sectionRefs.features}
        className="py-20 md:py-32 px-4 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4 inline-block">
              Our Features
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Everything you need to find the <span className="text-primary">perfect match</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Team Up provides a comprehensive platform designed to make finding roommates and living spaces in Saudi Arabia seamless and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={cn(
                  "glass-card rounded-xl p-6 transition-all duration-700",
                  isVisible.features ? 
                    "opacity-100 translate-y-0" : 
                    "opacity-0 translate-y-12"
                )}
                style={{ 
                  transitionDelay: isVisible.features ? `${index * 100}ms` : '0ms' 
                }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="steps"
        ref={sectionRefs.steps}
        className="py-20 md:py-32 px-4 bg-gradient-to-b from-background to-accent/10 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible.steps ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4 inline-block">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              How Team Up <span className="text-primary">works</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our simple and intuitive process makes finding your perfect roommate and home a breeze.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-0.5 h-[calc(100%-6rem)] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
            
            <div className="space-y-12 md:space-y-24 relative z-10">
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
                  <div className={cn(
                    "grid md:grid-cols-2 gap-8 items-center",
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  )}>
                    <div className={cn(
                      "relative",
                      index % 2 === 1 ? "md:order-2" : "md:order-1"
                    )}>
                      <div className="glass-card rounded-xl overflow-hidden aspect-video w-full">
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-primary/5 to-accent/5">
                          {React.createElement(step.icon, { className: "h-16 w-16 text-primary/30" })}
                        </div>
                      </div>
                    </div>
                    
                    <div className={cn(
                      "space-y-4",
                      index % 2 === 1 ? "md:order-1 md:text-right" : "md:order-2"
                    )}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                          {index + 1}
                        </div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-lg text-foreground/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="cta"
        ref={sectionRefs.cta}
        className="py-20 md:py-32 px-4 relative"
      >
        <div 
          className={cn(
            "max-w-5xl mx-auto glass-panel rounded-2xl p-8 md:p-12 text-center shadow-elegant transition-all duration-700 transform",
            isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to find your perfect <span className="text-primary">teamup</span>?
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
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

const steps = [
  {
    icon: function UserIcon(props) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
    },
    title: "Create Your Profile",
    description: "Sign up and create your detailed profile, including your lifestyle preferences, habits, and what you're looking for in a roommate."
  },
  {
    icon: function ArrowRightIcon(props) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      );
    },
    title: "Select Your Path",
    description: "Choose between 'Host My Space' or 'Seek & Settle'. Then select your living plan tier: Basic, Comfort, or Elite."
  },
  {
    icon: function SmileIcon(props) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      );
    },
    title: "Start Matching",
    description: "Browse potential roommates or properties, swipe right on profiles you like, and start conversations when you match."
  },
  {
    icon: function CorenerIcon(props) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
        </svg>
      );
    },
    title: "Team Up",
    description: "Once you've found the perfect match, arrange meetings, discuss details, and finalize your new living arrangement."
  }
];

export default Index;
