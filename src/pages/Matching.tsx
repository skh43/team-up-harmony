import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Heart, X, Star, MessageCircle, ChevronLeft, ChevronRight, UserCircle2, Globe, AlertCircle } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';

const MOCK_ROOMMATES = [
  // Mock data for potential roommates with nationalities
  // ... keep existing code
];

const Matching = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<number[]>([]);
  const [animation, setAnimation] = useState<'swipe-left' | 'swipe-right' | null>(null);
  const [swipesUsed, setSwipesUsed] = useState<number>(0);
  const [swipesReset, setSwipesReset] = useState<string>("");
  
  const MAX_DAILY_SWIPES = 20;

  const currentProfile = MOCK_ROOMMATES[currentIndex];

  useEffect(() => {
    const storedSwipeData = localStorage.getItem('dailySwipes');
    if (storedSwipeData) {
      const { count, resetDate } = JSON.parse(storedSwipeData);
      
      const today = new Date().toDateString();
      if (resetDate === today) {
        setSwipesUsed(count);
      } else {
        setSwipesUsed(0);
        updateSwipeStorage(0);
      }
      
      setSwipesReset(resetDate);
    } else {
      updateSwipeStorage(0);
    }
  }, []);

  const updateSwipeStorage = (count: number) => {
    const today = new Date().toDateString();
    localStorage.setItem('dailySwipes', JSON.stringify({ 
      count, 
      resetDate: today 
    }));
    setSwipesReset(today);
  };

  const hasReachedSwipeLimit = swipesUsed >= MAX_DAILY_SWIPES;

  const incrementSwipeCount = () => {
    const newCount = swipesUsed + 1;
    setSwipesUsed(newCount);
    updateSwipeStorage(newCount);
  };

  const handleLike = () => {
    if (hasReachedSwipeLimit) {
      toast({
        title: "Daily Swipe Limit Reached",
        description: "You've used all 20 swipes for today. Come back tomorrow!",
        variant: "destructive",
      });
      return;
    }
    
    setAnimation('swipe-right');
    incrementSwipeCount();
    
    setMatches(prev => [...prev, currentProfile.id]);
    
    toast({
      title: "It's a match!",
      description: `You matched with ${currentProfile.name}. You can now message them.`,
    });
    
    setTimeout(() => {
      setAnimation(null);
      goToNextProfile();
    }, 500);
  };

  const handleDislike = () => {
    if (hasReachedSwipeLimit) {
      toast({
        title: "Daily Swipe Limit Reached",
        description: "You've used all 20 swipes for today. Come back tomorrow!",
        variant: "destructive",
      });
      return;
    }
    
    setAnimation('swipe-left');
    incrementSwipeCount();
    
    setTimeout(() => {
      setAnimation(null);
      goToNextProfile();
    }, 500);
  };

  const goToNextProfile = () => {
    if (currentIndex < MOCK_ROOMMATES.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: "You've seen all profiles",
        description: "No more profiles to show at the moment. Check back later!",
      });
    }
  };

  const goToPrevProfile = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  return (
    <MainLayout className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Step 4 of 4
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Match</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Swipe right on roommates you're interested in, left on those you're not.
          </p>
          
          <div className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-primary/5 rounded-full">
            <span className="text-sm text-primary font-medium mr-2">Today's Swipes:</span>
            <span className={cn(
              "font-bold",
              hasReachedSwipeLimit ? "text-destructive" : "text-primary"
            )}>
              {swipesUsed}/{MAX_DAILY_SWIPES}
            </span>
            {hasReachedSwipeLimit && (
              <div className="flex items-center ml-2 text-destructive">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">Limit reached</span>
              </div>
            )}
          </div>
        </div>

        {currentProfile && (
          <div className="relative w-full mb-8">
            <Card 
              className={cn(
                "w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-elegant transition-transform duration-500 futuristic-panel",
                animation === 'swipe-left' && "translate-x-[-100%] rotate-[-10deg]",
                animation === 'swipe-right' && "translate-x-[100%] rotate-[10deg]",
                hasReachedSwipeLimit && "opacity-70"
              )}
            >
              <div className="relative h-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentProfile.image})` }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      {currentProfile.name}, {currentProfile.age}
                    </h2>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{currentProfile.nationality}</span>
                    </div>
                  </div>
                  <p className="text-white/90 mb-2">{currentProfile.occupation}</p>
                  <p className="text-white/90 mb-4">{currentProfile.location} • {currentProfile.budget}</p>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-4 glass-card">
                    <h3 className="font-medium mb-2">Lifestyle</h3>
                    <p className="text-sm text-white/80">{currentProfile.lifestyle}</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 glass-card">
                    <h3 className="font-medium mb-2">About</h3>
                    <p className="text-sm text-white/80">{currentProfile.bio}</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center gap-4 mt-6">
              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 w-16 rounded-full bg-background/30 shadow-md hover:bg-rose-500/30 hover:text-rose-500 backdrop-blur-sm border-none neon-border"
                onClick={handleDislike}
                disabled={hasReachedSwipeLimit}
              >
                <X className="h-8 w-8" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 w-16 rounded-full bg-background/30 shadow-md hover:bg-blue-500/30 hover:text-blue-500 backdrop-blur-sm border-none neon-border"
                onClick={goToPrevProfile}
                disabled={currentIndex === 0 || hasReachedSwipeLimit}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 w-16 rounded-full bg-background/30 shadow-md hover:bg-green-500/30 hover:text-green-500 backdrop-blur-sm border-none neon-border"
                onClick={handleLike}
                disabled={hasReachedSwipeLimit}
              >
                <Heart className="h-8 w-8" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 w-16 rounded-full bg-background/30 shadow-md hover:bg-blue-500/30 hover:text-blue-500 backdrop-blur-sm border-none neon-border"
                onClick={goToNextProfile}
                disabled={currentIndex === MOCK_ROOMMATES.length - 1 || hasReachedSwipeLimit}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
            
            {hasReachedSwipeLimit && (
              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                <h3 className="font-semibold text-destructive mb-1">Swipe Limit Reached</h3>
                <p className="text-sm text-muted-foreground">You've used all 20 daily swipes. Your swipes will reset at midnight.</p>
              </div>
            )}
          </div>
        )}

        {matches.length > 0 && (
          <div className="mt-8 glass-panel p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Your Matches</h2>
            <div className="flex flex-wrap gap-4">
              {matches.map(matchId => {
                const matchProfile = MOCK_ROOMMATES.find(r => r.id === matchId);
                if (!matchProfile) return null;
                
                return (
                  <div key={matchId} className="flex flex-col items-center">
                    <div className="relative">
                      <div 
                        className="h-16 w-16 rounded-full bg-cover bg-center border-2 border-primary/50"
                        style={{ backgroundImage: `url(${matchProfile.image})` }}
                      />
                      <Button 
                        size="icon" 
                        className="h-6 w-6 absolute -bottom-1 -right-1 rounded-full bg-primary hover:bg-primary/90 shadow-neon"
                        onClick={() => {
                          toast({
                            description: "Messaging functionality will be implemented soon.",
                          });
                        }}
                      >
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-sm mt-1 text-white">{matchProfile.name}</span>
                    <span className="text-xs mt-0.5 text-primary/80">{matchProfile.nationality}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Button 
            onClick={() => navigate('/properties')}
            className="rounded-full px-6 bg-primary/80 hover:bg-primary backdrop-blur-sm shadow-neon"
          >
            Browse Properties
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Matching;
