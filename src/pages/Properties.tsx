import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  // ... keep existing MOCK_PROPERTIES array
];

const MOCK_MATCHES = [
  // ... keep existing MOCK_MATCHES array
];

const PRICE_THRESHOLDS = {
  BASIC: 2500,
  COMFORT: 6000
};

const Properties = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
        title: "Property Shared",
        description: `You've shared "${property.title}" with ${match.name}.`,
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Space</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Browse available properties that match your needs and budget.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search by location, property type..."
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
              Filters
            </Button>
          </div>
          
          <Button 
            onClick={() => navigate('/list-property')}
            variant="default" 
            size="lg" 
            className="gap-2 rounded-full px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md mb-6"
          >
            <Plus className="h-4 w-4" />
            List Your Property
          </Button>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 max-w-3xl mx-auto bg-muted/60">
              <TabsTrigger value="all" className="data-[state=active]:bg-background">
                All Properties
              </TabsTrigger>
              <TabsTrigger value="basic" className="data-[state=active]:bg-background flex items-center gap-2">
                <House className="h-4 w-4" />
                <span>Basic</span>
              </TabsTrigger>
              <TabsTrigger value="comfort" className="data-[state=active]:bg-background flex items-center gap-2">
                <Sofa className="h-4 w-4" />
                <span>Comfort</span>
              </TabsTrigger>
              <TabsTrigger value="elite" className="data-[state=active]:bg-background flex items-center gap-2">
                <Crown className="h-4 w-4" />
                <span>Elite</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <CategoryDescription category={activeTab} />
            </div>
          </Tabs>
        </div>
        
        {filteredProperties.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-medium mb-2">No properties found</h2>
            <p className="text-muted-foreground">Try changing your search terms or filters.</p>
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
            <DialogTitle>Share Property with Match</DialogTitle>
            <DialogDescription>
              Select a roommate match to share this property with.
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
                        <span>{match.status === 'online' ? 'Online' : 'Offline'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="ghost">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share with Match
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-3">You don't have any matches yet.</p>
                <Button onClick={() => navigate('/matching')} variant="outline">
                  Find Roommates
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
              Cancel
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
  if (category === 'all') {
    return (
      <div className="text-center text-muted-foreground mb-6">
        <p>View all available properties from our listings</p>
      </div>
    );
  }
  
  if (category === 'basic') {
    return (
      <div className="text-center text-muted-foreground mb-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full mb-2">
          <House className="h-4 w-4" />
          <span className="font-medium">Basic Properties</span>
          <span className="text-xs bg-blue-100 px-2 py-0.5 rounded-full">Under SAR {PRICE_THRESHOLDS.BASIC}/month</span>
        </div>
        <p>Affordable and functional living spaces for budget-conscious renters</p>
      </div>
    );
  }
  
  if (category === 'comfort') {
    return (
      <div className="text-center text-muted-foreground mb-6">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full mb-2">
          <Sofa className="h-4 w-4" />
          <span className="font-medium">Comfort Properties</span>
          <span className="text-xs bg-purple-100 px-2 py-0.5 rounded-full">SAR {PRICE_THRESHOLDS.BASIC}-{PRICE_THRESHOLDS.COMFORT}/month</span>
        </div>
        <p>Mid-range properties with modern amenities and convenient locations</p>
      </div>
    );
  }
  
  if (category === 'elite') {
    return (
      <div className="text-center text-muted-foreground mb-6">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full mb-2">
          <Crown className="h-4 w-4" />
          <span className="font-medium">Elite Properties</span>
          <span className="text-xs bg-amber-100 px-2 py-0.5 rounded-full">Above SAR {PRICE_THRESHOLDS.COMFORT}/month</span>
        </div>
        <p>Premium properties with luxury features, spacious layouts and exclusive locations</p>
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
            title="Share with Match"
          >
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share with Match</span>
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
          <span className="capitalize">{category}</span>
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
              <span className="text-xs">View Map</span>
            </a>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
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
                <span>Hospital: {property.amenities.hospital}</span>
              </div>
            )}
            {property.amenities.supermarket && (
              <div className="flex items-center gap-1">
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Supermarket: {property.amenities.supermarket}</span>
              </div>
            )}
            {property.amenities.medicalStore && (
              <div className="flex items-center gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Medical Store: {property.amenities.medicalStore}</span>
              </div>
            )}
            {property.amenities.publicTransport && (
              <div className="flex items-center gap-1">
                <Bus className="h-3.5 w-3.5" />
                <span>Public Transport: {property.amenities.publicTransport}</span>
              </div>
            )}
            {property.amenities.metro && (
              <div className="flex items-center gap-1">
                <Train className="h-3.5 w-3.5" />
                <span>Metro: {property.amenities.metro}</span>
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
          View Details
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-md"
          onClick={onShare}
          title="Share with Match"
        >
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share with Match</span>
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
              <span className="text-xs">View on Map</span>
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
              <span className="text-sm">{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{property.size}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-muted-foreground">{property.description}</p>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Features</h4>
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
            <h4 className="font-medium mb-2">Nearby Amenities</h4>
            <div className="grid grid-cols-2 gap-3">
              {property.amenities.hospital && (
                <div className="flex items-center gap-2">
                  <Hospital className="h-4 w-4 text-blue-500" />
                  <span>Hospital: {property.amenities.hospital}</span>
                </div>
              )}
              {property.amenities.supermarket && (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-green-500" />
                  <span>Supermarket: {property.amenities.supermarket}</span>
                </div>
              )}
              {property.amenities.medicalStore && (
                <div className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4 text-red-500" />
                  <span>Medical Store: {property.amenities.medicalStore}</span>
                </div>
              )}
              {property.amenities.publicTransport && (
                <div className="flex items-center gap-2">
                  <Bus className="h-4 w-4 text-orange-500" />
                  <span>Public Transport: {property.amenities.publicTransport}</span>
                </div>
              )}
              {property.amenities.metro && (
                <div className="flex items-center gap-2">
                  <Train className="h-4 w-4 text-purple-500" />
                  <span>Metro: {property.amenities.metro}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 gap-2">
          <MessageCircle className="h-4 w-4" />
          Contact Owner
        </Button>
        <Button variant="outline" className="flex-1 gap-2">
          <Share2 className="h-4 w-4" />
          Share Property
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
