
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, X, MessageCircle, Star, MapPin, Home, User, Briefcase, Clock, Flag, Globe, Check, BedDouble, BedSingle, Users, Bath, Utensils, Sofa, ChevronLeft, ChevronRight, Hospital, ShoppingCart, Bus, Train } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export type MatchProfile = {
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
    openToAllNationalities: boolean;
  };
  roomImages?: string[];
  sharedAmenityImages?: {
    bathroom?: string | string[];
    kitchen?: string | string[];
    livingRoom?: string | string[];
    other?: string | string[];
  };
  nationality: string;
  workProfession: string;
  workTiming: string;
  gender: string;
  livingReference: string;
  roomDescription?: string;
  sharedAmenities?: string;
  distanceHospital?: string;
  distanceSupermarket?: string;
  distanceMedicalStore?: string;
  distancePublicTransport?: string;
  distanceMetroStation?: string;
  distanceBusStand?: string;
  userType?: 'host' | 'seek';
};

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
  const [activeSection, setActiveSection] = useState<'profile' | 'room'>('profile');
  
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

  const toggleSection = () => {
    setActiveSection(prev => prev === 'profile' ? 'room' : 'profile');
  };

  const hasLocationInfo = profile.distanceHospital || profile.distanceSupermarket || 
                          profile.distanceMedicalStore || profile.distancePublicTransport || 
                          profile.distanceMetroStation || profile.distanceBusStand;

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
      
      {activeSection === 'profile' ? (
        <>
          <div className="relative h-72 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent z-10" />
            <div className="absolute inset-x-4 top-4 flex justify-between items-center z-20">
              <Badge className="font-medium bg-primary/90">
                {profile.compatibility}% {t('matching.match')}
              </Badge>
              
              {profile.userType && (
                <Badge variant={profile.userType === 'host' ? 'secondary' : 'outline'} className={profile.userType === 'host' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}>
                  {profile.userType === 'host' ? t('pathSelection.hostSpace') : t('pathSelection.seekSettle')}
                </Badge>
              )}
              
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
              <div className="grid grid-cols-2 gap-2">
                {profile.gender && (
                  <div className="flex items-center text-sm space-x-2 bg-primary/5 rounded-lg p-2">
                    <User className="h-4 w-4 text-primary" />
                    <span>{profile.gender}</span>
                  </div>
                )}
                
                {profile.nationality && (
                  <div className="flex items-center text-sm space-x-2 bg-primary/5 rounded-lg p-2">
                    <Flag className="h-4 w-4 text-primary" />
                    <span>{profile.nationality}</span>
                  </div>
                )}
                
                {profile.workProfession && (
                  <div className="flex items-center text-sm space-x-2 bg-primary/5 rounded-lg p-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="truncate">{profile.workProfession}</span>
                  </div>
                )}
                
                {profile.workTiming && (
                  <div className="flex items-center text-sm space-x-2 bg-primary/5 rounded-lg p-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="truncate">{profile.workTiming}</span>
                  </div>
                )}
              </div>
              
              {profile.livingReference && (
                <div className="flex items-center text-sm space-x-2 mt-2">
                  {profile.userType === 'host' ? (
                    <>
                      <Home className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-green-600">
                        {t('matching.availableSpace')}: {getAccommodationLabel(profile.livingReference)}
                      </span>
                    </>
                  ) : (
                    <>
                      <BedDouble className="h-4 w-4 text-primary" />
                      <span>{t('matching.lookingFor')}: {getAccommodationLabel(profile.livingReference)}</span>
                    </>
                  )}
                </div>
              )}
              
              {profile.preferences.openToAllNationalities && (
                <div className="flex items-start text-sm space-x-2 mt-1">
                  <Globe className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-green-600">
                    {t('matching.openToAllNationalities', 'Open to living with all nationalities')}
                  </span>
                </div>
              )}

              {/* Location information section - Now including distances to facilities */}
              {hasLocationInfo && (
                <div className="mt-3 pt-2 border-t border-border/50">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-primary mr-1.5" />
                    <p className="text-sm font-medium">{t('matching.locationDetails', 'Location Details')}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                    {profile.distanceHospital && (
                      <div className="flex items-center">
                        <Hospital className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                        <span>Hospital: {profile.distanceHospital}</span>
                      </div>
                    )}
                    
                    {profile.distanceSupermarket && (
                      <div className="flex items-center">
                        <ShoppingCart className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                        <span>Supermarket: {profile.distanceSupermarket}</span>
                      </div>
                    )}
                    
                    {profile.distanceMedicalStore && (
                      <div className="flex items-center">
                        <Hospital className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                        <span>Medical Store: {profile.distanceMedicalStore}</span>
                      </div>
                    )}
                    
                    {profile.distancePublicTransport && (
                      <div className="flex items-center">
                        <Bus className="h-3.5 w-3.5 text-yellow-500 mr-1.5" />
                        <span>Public Transport: {profile.distancePublicTransport}</span>
                      </div>
                    )}
                    
                    {profile.distanceMetroStation && (
                      <div className="flex items-center">
                        <Train className="h-3.5 w-3.5 text-purple-500 mr-1.5" />
                        <span>Metro Station: {profile.distanceMetroStation}</span>
                      </div>
                    )}
                    
                    {profile.distanceBusStand && (
                      <div className="flex items-center">
                        <Bus className="h-3.5 w-3.5 text-orange-500 mr-1.5" />
                        <span>Bus Stand: {profile.distanceBusStand}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {profile.roomDescription && (
                <div className="mt-3 pt-2 border-t border-border/50">
                  <p className="text-sm font-medium mb-1">{t('profileCreation.roomDescription')}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{profile.roomDescription}</p>
                </div>
              )}

              {profile.sharedAmenities && (
                <div className="mt-3 pt-2 border-t border-border/50">
                  <p className="text-sm font-medium mb-1">{t('profileCreation.sharedAmenities')}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{profile.sharedAmenities}</p>
                </div>
              )}
            </div>
            
            {profile.bio && (
              <div className="mt-1 pt-2 border-t border-border/50">
                <p className="text-sm text-muted-foreground line-clamp-2">{profile.bio}</p>
              </div>
            )}
          </CardContent>
        </>
      ) : (
        <>
          {!profile.roomImages || profile.roomImages.length === 0 ? (
            <div className="h-72 flex items-center justify-center bg-muted/30">
              <div className="text-center p-6">
                <Home className="h-16 w-16 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">
                  {profile.userType === 'seek' 
                    ? t('matching.noRoomImages')
                    : t('matching.profileHidden')}
                </p>
                {profile.userType !== 'seek' && !isMatched && (
                  <p className="text-xs text-muted-foreground">{t('matching.visibleAfterMatch')}</p>
                )}
              </div>
            </div>
          ) : (
            <Carousel className="w-full">
              <CarouselContent>
                {profile.roomImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="h-72 relative">
                      <img 
                        src={image} 
                        alt={`Room ${index + 1}`}
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                        {index + 1}/{profile.roomImages?.length}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
                <CarouselPrevious className="h-8 w-8 opacity-70 hover:opacity-100" />
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
                <CarouselNext className="h-8 w-8 opacity-70 hover:opacity-100" />
              </div>
            </Carousel>
          )}

          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base">{profile.name}'s {t('matching.accommodation')}</h3>
              <Badge variant="outline" className="font-medium">
                {getAccommodationLabel(profile.livingReference)}
              </Badge>
            </div>
            
            {profile.roomDescription && (
              <div className="mt-2">
                <h4 className="text-sm font-medium mb-1">{t('profileCreation.roomDescription')}</h4>
                <p className="text-xs text-muted-foreground line-clamp-3">{profile.roomDescription}</p>
              </div>
            )}
            
            {profile.sharedAmenities && (
              <div className="mt-2 border-t border-border/50 pt-2">
                <h4 className="text-sm font-medium mb-1">{t('profileCreation.sharedAmenities')}</h4>
                <p className="text-xs text-muted-foreground line-clamp-3">{profile.sharedAmenities}</p>
              </div>
            )}
            
            {profile.sharedAmenityImages && Object.keys(profile.sharedAmenityImages).length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">{t('matching.sharedAmenities')}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {profile.sharedAmenityImages.bathroom && (
                    <div className="relative rounded-md overflow-hidden aspect-square">
                      <img 
                        src={Array.isArray(profile.sharedAmenityImages.bathroom) 
                          ? profile.sharedAmenityImages.bathroom[0] 
                          : profile.sharedAmenityImages.bathroom} 
                        alt="Bathroom"
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Bath className="h-5 w-5 mx-auto mb-1" />
                          <span className="text-xs">{t('matching.bathroom')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {profile.sharedAmenityImages.kitchen && (
                    <div className="relative rounded-md overflow-hidden aspect-square">
                      <img 
                        src={Array.isArray(profile.sharedAmenityImages.kitchen) 
                          ? profile.sharedAmenityImages.kitchen[0] 
                          : profile.sharedAmenityImages.kitchen} 
                        alt="Kitchen"
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Utensils className="h-5 w-5 mx-auto mb-1" />
                          <span className="text-xs">{t('matching.kitchen')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {profile.sharedAmenityImages.livingRoom && (
                    <div className="relative rounded-md overflow-hidden aspect-square">
                      <img 
                        src={Array.isArray(profile.sharedAmenityImages.livingRoom) 
                          ? profile.sharedAmenityImages.livingRoom[0] 
                          : profile.sharedAmenityImages.livingRoom} 
                        alt="Living Room"
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Sofa className="h-5 w-5 mx-auto mb-1" />
                          <span className="text-xs">{t('matching.livingRoom')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {hasLocationInfo && (
              <div className="border-t border-border/50 pt-2 mt-2">
                <h4 className="text-sm font-medium mb-2">{t('matching.distancesToFacilities', 'Distance to Facilities')}</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {profile.distanceHospital && (
                    <div className="flex items-center text-xs">
                      <Hospital className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                      <span>Hospital: {profile.distanceHospital}</span>
                    </div>
                  )}
                  
                  {profile.distanceSupermarket && (
                    <div className="flex items-center text-xs">
                      <ShoppingCart className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                      <span>Supermarket: {profile.distanceSupermarket}</span>
                    </div>
                  )}
                  
                  {profile.distanceMedicalStore && (
                    <div className="flex items-center text-xs">
                      <Hospital className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                      <span>Medical: {profile.distanceMedicalStore}</span>
                    </div>
                  )}
                  
                  {profile.distancePublicTransport && (
                    <div className="flex items-center text-xs">
                      <Bus className="h-3.5 w-3.5 text-yellow-500 mr-1.5" />
                      <span>Transport: {profile.distancePublicTransport}</span>
                    </div>
                  )}
                  
                  {profile.distanceMetroStation && (
                    <div className="flex items-center text-xs">
                      <Train className="h-3.5 w-3.5 text-purple-500 mr-1.5" />
                      <span>Metro: {profile.distanceMetroStation}</span>
                    </div>
                  )}
                  
                  {profile.distanceBusStand && (
                    <div className="flex items-center text-xs">
                      <Bus className="h-3.5 w-3.5 text-orange-500 mr-1.5" />
                      <span>Bus Stand: {profile.distanceBusStand}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </>
      )}
      
      <CardFooter className="flex justify-between p-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 bg-background hover:bg-destructive hover:text-white transition-colors"
          onClick={() => onDislike(profile.id)}
        >
          <X className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-10 w-10 bg-background hover:bg-blue-500 hover:text-white transition-colors"
          onClick={toggleSection}
        >
          {activeSection === 'profile' ? <Home className="h-4 w-4" /> : <User className="h-4 w-4" />}
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
