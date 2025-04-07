
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Heart, X, Star, MessageCircle, ChevronLeft, ChevronRight, UserCircle2, Globe, AlertCircle, Home } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import MatchCard, { MatchProfile } from '@/components/MatchCard';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Mock data for potential roommates
const MOCK_ROOMMATES: MatchProfile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 27,
    location: 'Downtown Dubai',
    bio: 'Marketing professional who loves cooking and yoga. Looking for a clean and quiet roommate to share my apartment.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    compatibility: 95,
    interests: ['Yoga', 'Cooking', 'Reading', 'Travel'],
    preferences: {
      pets: false,
      openToAllNationalities: true
    },
    roomImages: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop'
    ],
    nationality: 'Canadian',
    workProfession: 'Marketing Manager',
    workTiming: '9 AM - 5 PM'
  },
  {
    id: '2',
    name: 'Mohammed Al-Farsi',
    age: 30,
    location: 'Business Bay',
    bio: 'Software engineer working for a tech startup. Neat, organized, and looking for a similar roommate.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    compatibility: 87,
    interests: ['Technology', 'Gaming', 'Fitness', 'Movies'],
    preferences: {
      pets: true,
      openToAllNationalities: false
    },
    roomImages: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop'
    ],
    nationality: 'Emirati',
    workProfession: 'Software Engineer',
    workTiming: 'Flexible hours'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    age: 26,
    location: 'Silicon Oasis',
    bio: 'Medical student who enjoys music and art. Looking for a peaceful environment to study and relax.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    compatibility: 82,
    interests: ['Art', 'Music', 'Medicine', 'Hiking'],
    preferences: {
      pets: false,
      openToAllNationalities: true
    },
    roomImages: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617104678098-de229db51175?q=80&w=2070&auto=format&fit=crop'
    ],
    nationality: 'Indian',
    workProfession: 'Medical Student',
    workTiming: 'Variable schedule'
  },
  {
    id: '4',
    name: 'John Smith',
    age: 32,
    location: 'The Greens',
    bio: 'Finance professional who loves sports and travel. Looking for a sociable roommate who respects privacy.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
    compatibility: 78,
    interests: ['Finance', 'Football', 'Travel', 'Cooking'],
    preferences: {
      pets: true,
      openToAllNationalities: true
    },
    roomImages: [
      'https://images.unsplash.com/photo-1602872030219-ad2b9a54315c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2070&auto=format&fit=crop'
    ],
    nationality: 'British',
    workProfession: 'Financial Analyst',
    workTiming: '8 AM - 6 PM'
  },
  {
    id: '5',
    name: 'Lee Min-ho',
    age: 28,
    location: 'Dubai Marina',
    bio: 'Designer who loves photography and trying new restaurants. Looking for a creative and clean roommate.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
    compatibility: 90,
    interests: ['Design', 'Photography', 'Food', 'Travel'],
    preferences: {
      pets: false,
      openToAllNationalities: false
    },
    roomImages: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556702571-3e11dd2b1a92?q=80&w=2076&auto=format&fit=crop'
    ],
    nationality: 'Korean',
    workProfession: 'UX Designer',
    workTiming: 'Hybrid - 3 days in office'
  }
];

const Matching = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [animation, setAnimation] = useState<'swipe-left' | 'swipe-right' | null>(null);
  const [swipesUsed, setSwipesUsed] = useState<number>(0);
  const [swipesReset, setSwipesReset] = useState<string>("");
  const [userPath, setUserPath] = useState<string>("seek"); // Default to "seek"
  
  const MAX_DAILY_SWIPES = 20;

  const currentProfile = MOCK_ROOMMATES[currentIndex];

  // Load user path from localStorage
  useEffect(() => {
    const savedPath = localStorage.getItem('userPath');
    if (savedPath) {
      setUserPath(savedPath);
    }
    
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
    
    // Load saved matches
    const savedMatches = localStorage.getItem('userMatches');
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    }
  }, []);

  // Save matches to localStorage when they change
  useEffect(() => {
    if (matches.length > 0) {
      localStorage.setItem('userMatches', JSON.stringify(matches));
    }
  }, [matches]);

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
        title: t("matching.swipeLimitReached"),
        description: t("matching.swipeLimitDescription"),
        variant: "destructive",
      });
      return;
    }
    
    setAnimation('swipe-right');
    incrementSwipeCount();
    
    // Add to matches
    setMatches(prev => [...prev, currentProfile.id]);
    
    toast({
      title: t("matching.itsAMatch"),
      description: t("matching.matchDescription", { name: currentProfile.name }),
    });
    
    setTimeout(() => {
      setAnimation(null);
      goToNextProfile();
    }, 500);
  };

  const handleDislike = () => {
    if (hasReachedSwipeLimit) {
      toast({
        title: t("matching.swipeLimitReached"),
        description: t("matching.swipeLimitDescription"),
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
        title: t("matching.noMoreProfiles"),
        description: t("matching.checkBackLater"),
      });
    }
  };

  const goToPrevProfile = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleMessage = (id: string) => {
    toast({
      description: t("matching.messagingComingSoon"),
    });
  };

  // Convert current profile to MatchProfile type
  const convertToMatchProfile = (profile: any): MatchProfile => {
    return {
      id: profile.id,
      name: profile.name,
      age: profile.age,
      location: profile.location,
      bio: profile.bio,
      imageUrl: profile.imageUrl,
      compatibility: profile.compatibility,
      interests: profile.interests,
      preferences: profile.preferences,
      roomImages: profile.roomImages,
      nationality: profile.nationality,
      workProfession: profile.workProfession,
      workTiming: profile.workTiming
    };
  };

  const isAlreadyMatched = currentProfile && matches.includes(currentProfile.id);

  return (
    <MainLayout className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {t("matching.step")}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("matching.title")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {userPath === 'host' 
              ? t("matching.descriptionHost") 
              : t("matching.descriptionSeek")}
          </p>
          
          <div className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-primary/5 rounded-full">
            <span className="text-sm text-primary font-medium mr-2">{t("matching.todaySwipes")}:</span>
            <span className={cn(
              "font-bold",
              hasReachedSwipeLimit ? "text-destructive" : "text-primary"
            )}>
              {swipesUsed}/{MAX_DAILY_SWIPES}
            </span>
            {hasReachedSwipeLimit && (
              <div className="flex items-center ml-2 text-destructive">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">{t("matching.limitReached")}</span>
              </div>
            )}
          </div>
        </div>

        {currentProfile && (
          <div className="relative w-full mb-8">
            {/* Card for swiping */}
            <div className="flex justify-center">
              <MatchCard
                profile={convertToMatchProfile(currentProfile)}
                onLike={handleLike}
                onDislike={handleDislike}
                onMessage={isAlreadyMatched ? handleMessage : undefined}
                isActive={!hasReachedSwipeLimit}
              />
            </div>

            {/* Display room images if the path is 'host' */}
            {userPath === 'host' && currentProfile.roomImages && currentProfile.roomImages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">{t("matching.availableRooms")}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {currentProfile.roomImages.map((image, index) => (
                    <div 
                      key={index} 
                      className="aspect-[4/3] rounded-lg overflow-hidden shadow-md"
                    >
                      <img 
                        src={image} 
                        alt={`Room ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                <h3 className="font-semibold text-destructive mb-1">{t("matching.swipeLimitReached")}</h3>
                <p className="text-sm text-muted-foreground">{t("matching.swipesResetMidnight")}</p>
              </div>
            )}
          </div>
        )}

        {matches.length > 0 && (
          <div className="mt-8 glass-panel p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-white">{t("matching.yourMatches")}</h2>
            <div className="flex flex-wrap gap-4">
              {matches.map(matchId => {
                const matchProfile = MOCK_ROOMMATES.find(r => r.id === matchId);
                if (!matchProfile) return null;
                
                return (
                  <div key={matchId} className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-2 border-primary/50">
                        <AvatarImage src={matchProfile.imageUrl} alt={matchProfile.name} />
                        <AvatarFallback>
                          {matchProfile.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button 
                        size="icon" 
                        className="h-6 w-6 absolute -bottom-1 -right-1 rounded-full bg-primary hover:bg-primary/90 shadow-neon"
                        onClick={() => handleMessage(matchId)}
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
            {t("matching.browseProperties")}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Matching;
