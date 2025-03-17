
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Heart, X, Star, MessageCircle, ChevronLeft, ChevronRight, UserCircle2, Globe } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';

// Mock data for potential roommates with nationalities
const MOCK_ROOMMATES = [
  {
    id: 1,
    name: 'Ahmed',
    age: 28,
    nationality: 'Saudi Arabian',
    occupation: 'Software Engineer',
    budget: 'SAR 1,500-2,000/month',
    bio: 'I work remotely and enjoy cooking. Looking for a quiet roommate with similar interests.',
    location: 'Riyadh',
    lifestyle: 'Clean, non-smoker, early riser',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    name: 'Fatima',
    age: 25,
    nationality: 'Egyptian',
    occupation: 'Marketing Specialist',
    budget: 'SAR 2,000-2,500/month',
    bio: 'I love meeting new people and exploring the city on weekends.',
    location: 'Jeddah',
    lifestyle: 'Sociable, clean, loves to cook',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    name: 'Mohammad',
    age: 30,
    nationality: 'Jordanian',
    occupation: 'Financial Analyst',
    budget: 'SAR 2,500-3,000/month',
    bio: 'Looking for a responsible roommate. I work long hours during weekdays.',
    location: 'Riyadh',
    lifestyle: 'Neat, quiet, occasional cook',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    name: 'Nora',
    age: 26,
    nationality: 'Lebanese',
    occupation: 'Graphic Designer',
    budget: 'SAR 1,800-2,200/month',
    bio: 'Creative soul looking for a like-minded roommate. I work from home most days.',
    location: 'Dammam',
    lifestyle: 'Artistic, neat, night owl',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1998&ixlib=rb-4.0.3'
  },
  {
    id: 5,
    name: 'Yusuf',
    age: 29,
    nationality: 'Turkish',
    occupation: 'Chef',
    budget: 'SAR 2,300-2,700/month',
    bio: 'Professional chef who loves to share cultural dishes. Looking for someone who appreciates good food.',
    location: 'Riyadh',
    lifestyle: 'Foodie, clean, social on weekends',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3'
  },
  {
    id: 6,
    name: 'Amina',
    age: 27,
    nationality: 'Moroccan',
    occupation: 'Doctor',
    budget: 'SAR 3,000-3,500/month',
    bio: 'Medical resident with irregular hours. Looking for understanding roommate who respects privacy.',
    location: 'Jeddah',
    lifestyle: 'Quiet, organized, health-conscious',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1976&ixlib=rb-4.0.3'
  },
  {
    id: 7,
    name: 'Khalid',
    age: 31,
    nationality: 'Emirati',
    occupation: 'Business Consultant',
    budget: 'SAR 4,000-4,500/month',
    bio: 'Travel frequently for work. Seeking a reliable roommate for a luxury apartment.',
    location: 'Riyadh',
    lifestyle: 'Minimalist, tidy, sports enthusiast',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3'
  },
  {
    id: 8,
    name: 'Leila',
    age: 24,
    nationality: 'Iranian',
    occupation: 'Software Developer',
    budget: 'SAR 2,200-2,600/month',
    bio: 'Tech enthusiast who works from home. Looking for a roommate who respects quiet work hours.',
    location: 'Dammam',
    lifestyle: 'Tech-savvy, reader, early sleeper',
    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&q=80&w=1989&ixlib=rb-4.0.3'
  }
];

const Matching = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<number[]>([]);
  const [animation, setAnimation] = useState<'swipe-left' | 'swipe-right' | null>(null);

  const currentProfile = MOCK_ROOMMATES[currentIndex];

  const handleLike = () => {
    setAnimation('swipe-right');
    
    // Add to matches (in a real app, this would be a match only if they also liked you)
    setMatches(prev => [...prev, currentProfile.id]);
    
    // Show toast
    toast({
      title: "It's a match!",
      description: `You matched with ${currentProfile.name}. You can now message them.`,
    });
    
    // Delayed animation reset and move to next profile
    setTimeout(() => {
      setAnimation(null);
      goToNextProfile();
    }, 500);
  };

  const handleDislike = () => {
    setAnimation('swipe-left');
    
    // Delayed animation reset and move to next profile
    setTimeout(() => {
      setAnimation(null);
      goToNextProfile();
    }, 500);
  };

  const goToNextProfile = () => {
    if (currentIndex < MOCK_ROOMMATES.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      // End of profiles
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
        </div>

        {currentProfile && (
          <div className="relative w-full mb-8">
            <Card 
              className={cn(
                "w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-elegant transition-transform duration-500 futuristic-panel",
                animation === 'swipe-left' && "translate-x-[-100%] rotate-[-10deg]",
                animation === 'swipe-right' && "translate-x-[100%] rotate-[10deg]"
              )}
            >
              <div className="relative h-full">
                {/* Profile Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentProfile.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Profile Information */}
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

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 w-16 rounded-full bg-background/30 shadow-md hover:bg-rose-500/30 hover:text-rose-500 backdrop-blur-sm border-none neon-border"
                onClick={handleDislike}
              >
                <X className="h-8 w-8" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 w-16 rounded-full bg-background/30 shadow-md hover:bg-blue-500/30 hover:text-blue-500 backdrop-blur-sm border-none neon-border"
                onClick={goToPrevProfile}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 w-16 rounded-full bg-background/30 shadow-md hover:bg-green-500/30 hover:text-green-500 backdrop-blur-sm border-none neon-border"
                onClick={handleLike}
              >
                <Heart className="h-8 w-8" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 w-16 rounded-full bg-background/30 shadow-md hover:bg-blue-500/30 hover:text-blue-500 backdrop-blur-sm border-none neon-border"
                onClick={goToNextProfile}
                disabled={currentIndex === MOCK_ROOMMATES.length - 1}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
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
