import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, X, MessageCircle, Star, MapPin, Home, User, Briefcase, Clock, Flag, Globe, Check, BedDouble, BedSingle, Users, Bath, Utensils, Sofa } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

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
    pets: boolean;
    openToAllNationalities?: boolean;
  };
  roomImages?: string[];
  sharedAmenityImages?: {
    bathroom?: string;
    kitchen?: string;
    livingRoom?: string;
    other?: string;
  };
  nationality?: string;
  workProfession?: string;
  workTiming?: string;
  gender?: string;
  livingReference?: string;
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
  const { t } = useTranslation();
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [showSharedAmenities, setShowSharedAmenities] = useState(false);
  
  const userPath = localStorage.getItem('userPath') || 'seek';
  
  const matches = JSON.parse(localStorage.getItem('userMatches') || '[]');
  const isMatched = matches.includes(profile.id);
  
  const shouldBlurProfile = userPath === 'host' && !isMatched;
  
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
      setTranslateX(0);
      setRotation(0);
    }
    
    setDragStartX(0);
    setSwipeDirection(null);
  };

  const getAccommodationLabel = (livingRef: string) => {
    switch(livingRef) {
      case 'sharedRoom': return t('profileCreation.sharedRoom');
      case 'singleRoom': return t('profileCreation.singleRoom');
      case 'bedSpace': return t('profileCreation.bedSpace');
      default: return livingRef;
    }
  };

  const toggleSharedAmenities = () => {
    setShowSharedAmenities(!showSharedAmenities);
  };

  const hasSharedAmenities = profile.sharedAmenityImages && (
    profile.sharedAmenityImages.bathroom || 
    profile.sharedAmenityImages.kitchen || 
    profile.sharedAmenityImages.livingRoom || 
    profile.sharedAmenityImages.other
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
      <div 
        className={cn(
          "absolute top-4 left-4 bg-destructive text-white font-bold py-1 px-4 rounded-full z-10 transform -rotate-12 transition-opacity duration-200",
          swipeDirection === 'left' ? 'opacity-100' : 'opacity-0'
        )}
      >
        {t('matching.nope')}
      </div>
      <div 
        className={cn(
          "absolute top-4 right-4 bg-green-500 text-white font-bold py-1 px-4 rounded-full z-10 transform rotate-12 transition-opacity duration-200",
          swipeDirection === 'right' ? 'opacity-100' : 'opacity-0'
        )}
      >
        {t('matching.like')}
      </div>
      
      <div className="relative h-72 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent z-10" />
        <div className="absolute inset-x-4 top-4 flex justify-between items-center z-20">
          <Badge className="font-medium bg-primary/90">
            {profile.compatibility}% {t('matching.match')}
          </Badge>
          
          {isMatched && (
            <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30">
              {t('matching.matched')}
            </Badge>
          )}
        </div>
        
        {shouldBlurProfile ? (
          <div className="flex items-center justify-center h-full bg-gradient-to-b from-gray-700 to-gray-900">
            <div className="text-center p-4">
              <User className="h-20 w-20 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 font-medium">{t('matching.profileHidden')}</p>
              <p className="text-gray-400 text-sm mt-2">{t('matching.visibleAfterMatch')}</p>
            </div>
          </div>
        ) : (
          <img 
            src={profile.imageUrl || "https://via.placeholder.com/400x550?text=Profile+Image"} 
            alt={profile.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        )}
        
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-card to-transparent" />
      </div>
      
      <CardContent className="relative -mt-16 space-y-3 pb-0">
        <div>
          <div className="flex justify-between items-end mb-1">
            <h3 className="text-2xl font-bold">{profile.name}, {profile.age}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {profile.location}
            </div>
          </div>
        </div>
        
        <div className="space-y-2 py-2">
          {profile.gender && (
            <div className="flex items-center text-sm space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{profile.gender}</span>
            </div>
          )}
          
          {profile.livingReference && (
            <div className="flex items-center text-sm space-x-2">
              {userPath === 'host' ? (
                <>
                  <Home className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-green-600">
                    {t('matching.availableSpace')}: {getAccommodationLabel(profile.livingReference)}
                  </span>
                </>
              ) : (
                <>
                  <BedDouble className="h-4 w-4 text-muted-foreground" />
                  <span>{t('matching.lookingFor')}: {getAccommodationLabel(profile.livingReference)}</span>
                </>
              )}
            </div>
          )}
          
          {profile.nationality && (
            <div className="flex items-center text-sm space-x-2">
              <Flag className="h-4 w-4 text-muted-foreground" />
              <span>{profile.nationality}</span>
            </div>
          )}
          
          {profile.workProfession && (
            <div className="flex items-center text-sm space-x-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>{profile.workProfession}</span>
            </div>
          )}
          
          {profile.workTiming && (
            <div className="flex items-center text-sm space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{profile.workTiming}</span>
            </div>
          )}
          
          {profile.preferences.openToAllNationalities && (
            <div className="flex items-start text-sm space-x-2">
              <Globe className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-green-600">
                {t('matching.openToAllNationalities', 'Open to living with all nationalities')}
              </span>
            </div>
          )}

          {userPath === 'host' && hasSharedAmenities && (
            <div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 text-xs"
                onClick={toggleSharedAmenities}
              >
                {showSharedAmenities ? t('matching.hideAmenities') : t('matching.viewSharedAmenities')}
              </Button>

              {showSharedAmenities && (
                <div className="mt-3 space-y-3">
                  <h4 className="text-sm font-medium">{t('matching.sharedAmenities')}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {profile.sharedAmenityImages?.bathroom && (
                      <div className="relative">
                        <img 
                          src={profile.sharedAmenityImages.bathroom} 
                          alt="Bathroom" 
                          className="rounded-md h-20 w-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 flex items-center justify-center">
                          <Bath className="h-3 w-3 mr-1" /> {t('matching.bathroom')}
                        </div>
                      </div>
                    )}
                    {profile.sharedAmenityImages?.kitchen && (
                      <div className="relative">
                        <img 
                          src={profile.sharedAmenityImages.kitchen} 
                          alt="Kitchen" 
                          className="rounded-md h-20 w-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 flex items-center justify-center">
                          <Utensils className="h-3 w-3 mr-1" /> {t('matching.kitchen')}
                        </div>
                      </div>
                    )}
                    {profile.sharedAmenityImages?.livingRoom && (
                      <div className="relative">
                        <img 
                          src={profile.sharedAmenityImages.livingRoom} 
                          alt="Living Room" 
                          className="rounded-md h-20 w-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 flex items-center justify-center">
                          <Sofa className="h-3 w-3 mr-1" /> {t('matching.livingRoom')}
                        </div>
                      </div>
                    )}
                    {profile.sharedAmenityImages?.other && (
                      <div className="relative">
                        <img 
                          src={profile.sharedAmenityImages.other} 
                          alt="Other Space" 
                          className="rounded-md h-20 w-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 flex items-center justify-center">
                          <Home className="h-3 w-3 mr-1" /> {t('matching.otherSpace')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
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
