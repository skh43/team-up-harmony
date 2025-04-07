
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Bed, Bath, Square, Heart, Filter, House, Sofa, Crown, Plus, Hospital, ShoppingCart, PlusCircle, Bus, Train, Map, ExternalLink, Share2, MessageCircle, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "Luxury Apartment in Al Olaya",
    location: "Al Olaya, Riyadh",
    price: "SAR 90,000/year",
    priceValue: 7500, // monthly equivalent in SAR
    bedrooms: 2,
    bathrooms: 2,
    size: "120 sq.m",
    description: "Modern luxury apartment in the heart of Al Olaya district with premium finishes, floor-to-ceiling windows, and amazing city views. The apartment features an open kitchen, spacious living area, and a balcony overlooking the bustling city center.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    tags: ["Furnished", "Balcony", "Gym", "Swimming Pool", "24/7 Security"],
    mapLink: "https://maps.google.com/?q=Al+Olaya+Riyadh",
    amenities: {
      hospital: "3.5 km",
      supermarket: "400 m",
      medicalStore: "600 m",
      publicTransport: "250 m",
      metro: "1.2 km"
    }
  },
  {
    id: 2,
    title: "Spacious Villa in Al Nakheel",
    location: "Al Nakheel, Riyadh",
    price: "SAR 180,000/year",
    priceValue: 15000, // monthly equivalent in SAR
    bedrooms: 4,
    bathrooms: 5,
    size: "350 sq.m",
    description: "Elegant villa in Al Nakheel with modern architecture and high-quality finishes. Features include a private garden, spacious living areas, maid's room, driver's room, and a two-car garage. Perfect for families looking for comfort and privacy.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    tags: ["Villa", "Private Garden", "Maid's Room", "Driver's Room", "Garage"],
    mapLink: "https://maps.google.com/?q=Al+Nakheel+Riyadh",
    amenities: {
      hospital: "4.2 km",
      supermarket: "1.5 km",
      medicalStore: "1.8 km",
      publicTransport: "800 m"
    }
  },
  {
    id: 3,
    title: "Modern Studio in Al Malqa",
    location: "Al Malqa, Riyadh",
    price: "SAR 40,000/year",
    priceValue: 3333, // monthly equivalent in SAR
    bedrooms: 0,
    bathrooms: 1,
    size: "55 sq.m",
    description: "Cozy and stylish studio apartment in Al Malqa, perfect for singles or young professionals. Features a kitchenette, modern bathroom, and smart storage solutions. The building offers 24-hour security and covered parking.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    tags: ["Studio", "Covered Parking", "Smart Home", "New Building"],
    mapLink: "https://maps.google.com/?q=Al+Malqa+Riyadh"
  },
  {
    id: 4,
    title: "Beachfront Apartment in Jeddah",
    location: "Corniche Road, Jeddah",
    price: "SAR 120,000/year",
    priceValue: 10000, // monthly equivalent in SAR
    bedrooms: 3,
    bathrooms: 3,
    size: "180 sq.m",
    description: "Stunning beachfront apartment with panoramic Red Sea views on Corniche Road. Featuring high-end finishes, a spacious balcony, and direct beach access. The building includes a swimming pool, fitness center, and beachside cafe.",
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2384&q=80",
    tags: ["Waterfront", "Sea View", "Fitness Center", "Beach Access", "Fully Furnished"],
    mapLink: "https://maps.google.com/?q=Corniche+Road+Jeddah",
    amenities: {
      hospital: "5 km",
      supermarket: "700 m",
      publicTransport: "450 m"
    }
  },
  {
    id: 5,
    title: "Apartment in Al Khobar Corniche",
    location: "Corniche, Al Khobar",
    price: "SAR 85,000/year",
    priceValue: 7083, // monthly equivalent in SAR
    bedrooms: 2,
    bathrooms: 2,
    size: "130 sq.m",
    description: "Modern apartment with partial sea view in Al Khobar Corniche. Features two bedrooms, a spacious living area, and a balcony. Located near shopping centers and restaurants. Building amenities include a gym and children's play area.",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    tags: ["Sea View", "Gym", "Children's Play Area", "Near Malls"],
    mapLink: "https://maps.google.com/?q=Corniche+Al+Khobar",
    amenities: {
      hospital: "3.8 km",
      supermarket: "500 m",
      medicalStore: "850 m",
      publicTransport: "300 m"
    }
  },
  {
    id: 6,
    title: "Traditional Townhouse in Al Balad",
    location: "Al Balad, Jeddah",
    price: "SAR 75,000/year",
    priceValue: 6250, // monthly equivalent in SAR
    bedrooms: 3,
    bathrooms: 2,
    size: "160 sq.m",
    description: "Restored traditional townhouse in the historic Al Balad district with authentic architectural details and modern amenities. Features a rooftop terrace with city views, three bedrooms, and a charming courtyard.",
    image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    tags: ["Historic", "Rooftop Terrace", "Courtyard", "Renovated", "UNESCO Area"],
    mapLink: "https://maps.google.com/?q=Al+Balad+Jeddah",
    amenities: {
      hospital: "4.5 km",
      supermarket: "900 m",
      medicalStore: "1.2 km",
      publicTransport: "600 m"
    }
  },
  {
    id: 7,
    title: "Budget Apartment in Al Naseem",
    location: "Al Naseem, Jeddah",
    price: "SAR 30,000/year",
    priceValue: 2500, // monthly equivalent in SAR
    bedrooms: 1,
    bathrooms: 1,
    size: "70 sq.m",
    description: "Affordable one-bedroom apartment in Al Naseem district, perfect for students or young professionals. The property is well-maintained with basic amenities and is located near public transportation and shopping areas.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    tags: ["Budget", "Student-friendly", "Near Transportation", "Unfurnished"],
    mapLink: "https://maps.google.com/?q=Al+Naseem+Jeddah",
    amenities: {
      hospital: "6 km",
      supermarket: "350 m",
      medicalStore: "500 m",
      publicTransport: "200 m"
    }
  },
  {
    id: 8,
    title: "Executive Apartment in KAFD",
    location: "King Abdullah Financial District, Riyadh",
    price: "SAR 140,000/year",
    priceValue: 11666, // monthly equivalent in SAR
    bedrooms: 2,
    bathrooms: 2,
    size: "140 sq.m",
    description: "High-end apartment in the prestigious King Abdullah Financial District with smart home technology, premium finishes, and panoramic city views. Building amenities include concierge service, business center, and fine dining restaurants.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    tags: ["Smart Home", "Concierge", "Business District", "Premium", "City View"],
    mapLink: "https://maps.google.com/?q=KAFD+Riyadh",
    amenities: {
      hospital: "2.5 km",
      supermarket: "In Building",
      medicalStore: "In Building",
      publicTransport: "300 m",
      metro: "400 m"
    }
  }
];

const MOCK_MATCHES = [
  {
    id: 101,
    name: "Ahmed Al-Farsi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    status: "online",
    matchScore: 92,
    occupation: "Software Engineer",
    interests: ["Reading", "Technology", "Hiking"]
  },
  {
    id: 102,
    name: "Fatima Hassan",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    status: "offline",
    matchScore: 87,
    occupation: "Marketing Specialist",
    interests: ["Photography", "Cooking", "Travel"]
  },
  {
    id: 103,
    name: "Omar Khalid",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    status: "online",
    matchScore: 85,
    occupation: "Doctor",
    interests: ["Music", "Sports", "Movies"]
  }
];

const PRICE_THRESHOLDS = {
  BASIC: 2500,
  COMFORT: 6000
};

const Properties = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [sharePropertyId, setSharePropertyId] = useState<number | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(propId => propId !== id) 
        : [...prev, id]
    );
  };
  
  const handleShareProperty = (propertyId: number) => {
    setSharePropertyId(propertyId);
    setIsShareDialogOpen(true);
  };
  
  const handleShareWithMatch = (matchId: number) => {
    const property = MOCK_PROPERTIES.find(p => p.id === sharePropertyId);
    const match = MOCK_MATCHES.find(m => m.id === matchId);
    
    if (property && match) {
      toast({
        title: t('properties.propertyShared'),
        description: t('properties.sharedWithDescription', { propertyTitle: property.title, matchName: match.name }),
      });
      setIsShareDialogOpen(false);
    }
  };
  
  const handleViewDetails = (propertyId: number) => {
    setSelectedProperty(propertyId);
    setIsDetailsDialogOpen(true);
  };
  
  const filteredProperties = MOCK_PROPERTIES
    .filter(property => 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(property => {
      if (activeTab === 'all') return true;
      if (activeTab === 'basic') return property.priceValue < PRICE_THRESHOLDS.BASIC;
      if (activeTab === 'comfort') return property.priceValue >= PRICE_THRESHOLDS.BASIC && property.priceValue < PRICE_THRESHOLDS.COMFORT;
      if (activeTab === 'elite') return property.priceValue >= PRICE_THRESHOLDS.COMFORT;
      return true;
    });

  return (
    <MainLayout className="flex flex-col min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="my-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('properties.findPerfectSpace')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            {t('properties.browseProperties')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-4">
            <div className="relative flex-1">
              <Input
                placeholder={t('properties.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 pr-10 rounded-full"
              />
              <svg 
                className="absolute right-3 top-3.5 text-gray-400 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <Button
              variant="outline"
              className="h-12 gap-2 rounded-full"
            >
              <Filter className="h-4 w-4" />
              {t('properties.filters')}
            </Button>
          </div>
          
          <Button 
            onClick={() => navigate('/list-property')}
            variant="default" 
            size="lg" 
            className="gap-2 rounded-full px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md mb-6"
          >
            <Plus className="h-4 w-4" />
            {t('properties.listYourProperty')}
          </Button>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 max-w-3xl mx-auto bg-muted/60">
              <TabsTrigger value="all" className="data-[state=active]:bg-background">
                {t('properties.allProperties')}
              </TabsTrigger>
              <TabsTrigger value="basic" className="data-[state=active]:bg-background flex items-center gap-2">
                <House className="h-4 w-4" />
                <span>{t('properties.basic')}</span>
              </TabsTrigger>
              <TabsTrigger value="comfort" className="data-[state=active]:bg-background flex items-center gap-2">
                <Sofa className="h-4 w-4" />
                <span>{t('properties.comfort')}</span>
              </TabsTrigger>
              <TabsTrigger value="elite" className="data-[state=active]:bg-background flex items-center gap-2">
                <Crown className="h-4 w-4" />
                <span>{t('properties.elite')}</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <CategoryDescription category={activeTab} />
            </div>
          </Tabs>
        </div>
        
        {filteredProperties.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-medium mb-2">{t('properties.noPropertiesFound')}</h2>
            <p className="text-muted-foreground">{t('properties.tryChangingSearch')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredProperties.map(property => (
              <PropertyCard 
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={() => toggleFavorite(property.id)}
                onShare={() => handleShareProperty(property.id)}
                onViewDetails={() => handleViewDetails(property.id)}
                category={
                  property.priceValue < PRICE_THRESHOLDS.BASIC 
                    ? 'basic' 
                    : property.priceValue < PRICE_THRESHOLDS.COMFORT 
                      ? 'comfort' 
                      : 'elite'
                }
              />
            ))}
          </div>
        )}
      </div>
      
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('properties.sharePropertyWithMatch')}</DialogTitle>
            <DialogDescription>
              {t('properties.selectRoommateToShare')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {MOCK_MATCHES.length > 0 ? (
              MOCK_MATCHES.map(match => (
                <div 
                  key={match.id} 
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer"
                  onClick={() => handleShareWithMatch(match.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={match.avatar} alt={match.name} />
                      <AvatarFallback>{match.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{match.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${match.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        <span>{match.status === 'online' ? t('properties.online') : t('properties.offline')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="ghost">
                    <Share2 className="h-4 w-4 mr-2" />
                    {t('properties.shareWithMatch')}
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-3">{t('properties.noMatches')}</p>
                <Button onClick={() => navigate('/matching')} variant="outline">
                  {t('properties.findRoommates')}
                </Button>
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setIsShareDialogOpen(false)}
            >
              {t('common.cancel')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProperty !== null && (
            <PropertyDetails 
              property={MOCK_PROPERTIES.find(p => p.id === selectedProperty)!}
              onClose={() => setIsDetailsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

interface CategoryDescriptionProps {
  category: string;
}

const CategoryDescription = ({ category }: CategoryDescriptionProps) => {
  const { t } = useTranslation();
  
  if (category === 'all') {
    return (
      <div className="text-center text-muted-foreground mb-6">
        <p>{t('properties.viewAllAvailable')}</p>
      </div>
    );
  }
  
  if (category === 'basic') {
    return (
      <div className="text-center text-muted-foreground mb-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full mb-2">
          <House className="h-4 w-4" />
          <span className="font-medium">{t('properties.basicProperties')}</span>
          <span className="text-xs bg-blue-100 px-2 py-0.5 rounded-full">{t('properties.underPrice', { price: PRICE_THRESHOLDS.BASIC })}</span>
        </div>
        <p>{t('properties.basicDescription')}</p>
      </div>
    );
  }
  
  if (category === 'comfort') {
    return (
      <div className="text-center text-muted-foreground mb-6">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full mb-2">
          <Sofa className="h-4 w-4" />
          <span className="font-medium">{t('properties.comfortProperties')}</span>
          <span className="text-xs bg-purple-100 px-2 py-0.5 rounded-full">{t('properties.priceRange', { min: PRICE_THRESHOLDS.BASIC, max: PRICE_THRESHOLDS.COMFORT })}</span>
        </div>
        <p>{t('properties.comfortDescription')}</p>
      </div>
    );
  }
  
  if (category === 'elite') {
    return (
      <div className="text-center text-muted-foreground mb-6">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full mb-2">
          <Crown className="h-4 w-4" />
          <span className="font-medium">{t('properties.eliteProperties')}</span>
          <span className="text-xs bg-amber-100 px-2 py-0.5 rounded-full">{t('properties.abovePrice', { price: PRICE_THRESHOLDS.COMFORT })}</span>
        </div>
        <p>{t('properties.eliteDescription')}</p>
      </div>
    );
  }
  
  return null;
};

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: string;
    priceValue: number;
    bedrooms: number;
    bathrooms: number;
    size: string;
    description: string;
    image: string;
    tags: string[];
    mapLink?: string;
    amenities?: {
      hospital?: string;
      supermarket?: string;
      medicalStore?: string;
      publicTransport?: string;
      metro?: string;
    };
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
  onViewDetails: () => void;
  category: 'basic' | 'comfort' | 'elite';
}

const PropertyCard = ({ property, isFavorite, onToggleFavorite, onShare, onViewDetails, category }: PropertyCardProps) => {
  const { t } = useTranslation();
  
  const getCategoryStyles = () => {
    switch (category) {
      case 'basic':
        return {
          badge: 'bg-blue-100 text-blue-700',
          icon: <House className="h-4 w-4" />
        };
      case 'comfort':
        return {
          badge: 'bg-purple-100 text-purple-700',
          icon: <Sofa className="h-4 w-4" />
        };
      case 'elite':
        return {
          badge: 'bg-amber-100 text-amber-700',
          icon: <Crown className="h-4 w-4" />
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-700',
          icon: <House className="h-4 w-4" />
        };
    }
  };

  const categoryStyle = getCategoryStyles();

  return (
    <Card className="overflow-hidden shadow-subtle hover:shadow-elegant transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 text-white"
            onClick={(e) => {
              e.preventDefault();
              onShare();
            }}
            title={t('properties.shareWithMatch')}
          >
            <Share2 className="h-5 w-5" />
            <span className="sr-only">{t('properties.shareWithMatch')}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40",
              isFavorite ? "text-red-500" : "text-white"
            )}
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
          >
            <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
          </Button>
        </div>
        <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-sm font-medium">
          {property.price}
        </div>
        
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${categoryStyle.badge}`}>
          {categoryStyle.icon}
          <span className="capitalize">{t(`properties.${category}`)}</span>
        </div>
      </div>
      
      <CardHeader className="py-4">
        <CardTitle className="text-xl">{property.title}</CardTitle>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <CardDescription className="text-sm">{property.location}</CardDescription>
          
          {property.mapLink && (
            <a 
              href={property.mapLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary inline-flex items-center hover:underline ml-2"
            >
              <Map className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{t('properties.viewMap')}</span>
            </a>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{property.bedrooms} {property.bedrooms === 1 ? t('properties.bed') : t('properties.beds')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{property.bathrooms} {property.bathrooms === 1 ? t('properties.bath') : t('properties.baths')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{property.size}</span>
          </div>
        </div>
        
        {property.amenities && (
          <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            {property.amenities.hospital && (
              <div className="flex items-center gap-1">
                <Hospital className="h-3.5 w-3.5" />
                <span>{t('properties.hospital')}: {property.amenities.hospital}</span>
              </div>
            )}
            {property.amenities.supermarket && (
              <div className="flex items-center gap-1">
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>{t('properties.supermarket')}: {property.amenities.supermarket}</span>
              </div>
            )}
            {property.amenities.medicalStore && (
              <div className="flex items-center gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>{t('properties.medicalStore')}: {property.amenities.medicalStore}</span>
              </div>
            )}
            {property.amenities.publicTransport && (
              <div className="flex items-center gap-1">
                <Bus className="h-3.5 w-3.5" />
                <span>{t('properties.publicTransport')}: {property.amenities.publicTransport}</span>
              </div>
            )}
            {property.amenities.metro && (
              <div className="flex items-center gap-1">
                <Train className="h-3.5 w-3.5" />
                <span>{t('properties.metro')}: {property.amenities.metro}</span>
              </div>
            )}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.tags.map((tag, index) => (
            <span key={index} className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{property.description}</p>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button 
          className="w-full rounded-md flex items-center gap-2"
          onClick={onViewDetails}
        >
          <Eye className="h-4 w-4" />
          {t('properties.viewDetails')}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-md"
          onClick={onShare}
          title={t('properties.shareWithMatch')}
        >
          <Share2 className="h-5 w-5" />
          <span className="sr-only">{t('properties.shareWithMatch')}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface PropertyDetailsProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: string;
    priceValue: number;
    bedrooms: number;
    bathrooms: number;
    size: string;
    description: string;
    image: string;
    tags: string[];
    mapLink?: string;
    amenities?: {
      hospital?: string;
      supermarket?: string;
      medicalStore?: string;
      publicTransport?: string;
      metro?: string;
    };
  };
  onClose: () => void;
}

const PropertyDetails = ({ property, onClose }: PropertyDetailsProps) => {
  const { t } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const propertyImages = [
    property.image,
    `${property.image}?v=2`,
    `${property.image}?v=3`,
    `${property.image}?v=4`,
  ];
  
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % propertyImages.length);
  };
  
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">{property.title}</DialogTitle>
        <DialogDescription className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
          {property.mapLink && (
            <a 
              href={property.mapLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary inline-flex items-center hover:underline ml-2"
            >
              <Map className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{t('properties.viewOnMap')}</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          )}
        </DialogDescription>
      </DialogHeader>
      
      <div className="my-4 relative">
        <div className="w-full aspect-video relative overflow-hidden rounded-lg">
          <img 
            src={propertyImages[activeImageIndex]} 
            alt={`${property.title} - Image ${activeImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
            {activeImageIndex + 1} / {propertyImages.length}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
          onClick={prevImage}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
          onClick={nextImage}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
        
        <div className="flex gap-2 mt-3 overflow-x-auto py-2">
          {propertyImages.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={cn(
                "w-20 h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2",
                activeImageIndex === idx ? "border-primary" : "border-transparent"
              )}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-primary">{property.price}</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{property.bedrooms} {property.bedrooms === 1 ? t('properties.bed') : t('properties.beds')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{property.bathrooms} {property.bathrooms === 1 ? t('properties.bath') : t('properties.baths')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{property.size}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">{t('properties.description')}</h4>
          <p className="text-muted-foreground">{property.description}</p>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">{t('properties.features')}</h4>
          <div className="flex flex-wrap gap-2">
            {property.tags.map((tag, index) => (
              <span key={index} className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {property.amenities && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">{t('properties.nearbyAmenities')}</h4>
            <div className="grid grid-cols-2 gap-3">
              {property.amenities.hospital && (
                <div className="flex items-center gap-2">
                  <Hospital className="h-4 w-4 text-blue-500" />
                  <span>{t('properties.hospital')}: {property.amenities.hospital}</span>
                </div>
              )}
              {property.amenities.supermarket && (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-green-500" />
                  <span>{t('properties.supermarket')}: {property.amenities.supermarket}</span>
                </div>
              )}
              {property.amenities.medicalStore && (
                <div className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4 text-red-500" />
                  <span>{t('properties.medicalStore')}: {property.amenities.medicalStore}</span>
                </div>
              )}
              {property.amenities.publicTransport && (
                <div className="flex items-center gap-2">
                  <Bus className="h-4 w-4 text-orange-500" />
                  <span>{t('properties.publicTransport')}: {property.amenities.publicTransport}</span>
                </div>
              )}
              {property.amenities.metro && (
                <div className="flex items-center gap-2">
                  <Train className="h-4 w-4 text-purple-500" />
                  <span>{t('properties.metro')}: {property.amenities.metro}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 gap-2">
          <MessageCircle className="h-4 w-4" />
          {t('properties.contactOwner')}
        </Button>
        <Button variant="outline" className="flex-1 gap-2">
          <Share2 className="h-4 w-4" />
          {t('properties.shareProperty')}
        </Button>
        <Button 
          variant={property.id ? "ghost" : "outline"} 
          size="icon"
          onClick={onClose}
          className="sm:flex-none"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
};

export default Properties;
