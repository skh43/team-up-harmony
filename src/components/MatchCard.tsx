
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MessageCircle, Star, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  imageUrl: string;
  compatibility: number;
  interests: string[];
  preferences: {
    cleanliness: number;
    noise: number;
    guests: number;
    pets: boolean;
  };
}

interface MatchCardProps {
  profile: MatchProfile;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onMessage?: (id: string) => void;
  isActive?: boolean;
}

const MatchCard = ({ 
  profile, 
  onLike, 
  onDislike, 
  onMessage,
  isActive = false 
}: MatchCardProps) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [rotation, setRotation] = useState(0);
  
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isActive) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };
  
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartX === 0 || !isActive) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX;
    
    setTranslateX(deltaX);
    setRotation(deltaX * 0.03);
    
    if (deltaX > 50) {
      setSwipeDirection('right');
    } else if (deltaX < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };
  
  const handleDragEnd = () => {
    if (!isActive) return;
    
    if (swipeDirection === 'right') {
      onLike(profile.id);
    } else if (swipeDirection === 'left') {
      onDislike(profile.id);
    } else {
      // Reset if not swiped far enough
      setTranslateX(0);
      setRotation(0);
    }
    
    setDragStartX(0);
    setSwipeDirection(null);
  };
  
  const renderPreferenceBar = (value: number, label: string) => (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}/5</span>
      </div>
      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <Card 
      className={cn(
        "w-full max-w-sm mx-auto shadow-lg border-0 overflow-hidden transition-all duration-200 relative",
        isActive ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
        swipeDirection === 'left' ? 'swipe-card-exit-left' : '',
        swipeDirection === 'right' ? 'swipe-card-exit-right' : ''
      )}
      style={{
        transform: `translateX(${translateX}px) rotate(${rotation}deg)`,
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Swipe Indicators */}
      <div 
        className={cn(
          "absolute top-4 left-4 bg-destructive text-white font-bold py-1 px-4 rounded-full z-10 transform -rotate-12 transition-opacity duration-200",
          swipeDirection === 'left' ? 'opacity-100' : 'opacity-0'
        )}
      >
        NOPE
      </div>
      <div 
        className={cn(
          "absolute top-4 right-4 bg-green-500 text-white font-bold py-1 px-4 rounded-full z-10 transform rotate-12 transition-opacity duration-200",
          swipeDirection === 'right' ? 'opacity-100' : 'opacity-0'
        )}
      >
        LIKE
      </div>
      
      {/* Profile Image */}
      <div className="relative h-72 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent z-10" />
        <div className="absolute inset-x-4 top-4 flex justify-between items-center z-20">
          <Badge className="font-medium bg-primary/90">
            {profile.compatibility}% Match
          </Badge>
        </div>
        <img 
          src={profile.imageUrl || "https://via.placeholder.com/400x550?text=Profile+Image"} 
          alt={profile.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-card to-transparent" />
      </div>
      
      {/* Profile Content */}
      <CardContent className="relative -mt-16 space-y-3 pb-0">
        <div>
          <div className="flex justify-between items-end mb-1">
            <h3 className="text-2xl font-bold">{profile.name}, {profile.age}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {profile.location}
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
        </div>
        
        {/* Interests */}
        <div>
          <h4 className="text-sm font-medium mb-2">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Preferences */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium mb-2">Living Preferences</h4>
          {renderPreferenceBar(profile.preferences.cleanliness, "Cleanliness")}
          {renderPreferenceBar(profile.preferences.noise, "Noise Level")}
          {renderPreferenceBar(profile.preferences.guests, "Guest Frequency")}
          <div className="flex items-center space-x-1 text-sm">
            <span className="font-medium">Pets:</span>
            <span>{profile.preferences.pets ? "Welcome" : "No pets"}</span>
          </div>
        </div>
      </CardContent>
      
      {/* Action Buttons */}
      <CardFooter className="flex justify-between p-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 bg-background hover:bg-destructive hover:text-white transition-colors"
          onClick={() => onDislike(profile.id)}
        >
          <X className="h-6 w-6" />
        </Button>
        
        {onMessage && (
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-10 w-10 bg-background hover:bg-primary hover:text-white transition-colors"
            onClick={() => onMessage(profile.id)}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        )}
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 bg-background hover:bg-green-500 hover:text-white transition-colors"
          onClick={() => onLike(profile.id)}
        >
          <Heart className="h-6 w-6" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
