import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Bed, Bath, Square, Heart, Filter, House, Sofa, Crown, Plus, Hospital, ShoppingCart, PlusCircle, Bus, Train, Map, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';

// Mock data for properties
const MOCK_PROPERTIES = [
  {
    id: 1,
    title: 'Modern Apartment with Balcony',
    location: 'Al Olaya, Riyadh',
    price: 'SAR 3,500/month',
    priceValue: 3500,
    bedrooms: 2,
    bathrooms: 2,
    size: '120 sqm',
    description: 'Spacious and bright apartment in a central location with modern amenities.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Balcony', 'Pool', 'Gym', 'Parking'],
    mapLink: 'https://maps.google.com/?q=Al+Olaya+Riyadh',
    amenities: {
      hospital: '2.5 km',
      supermarket: '0.3 km',
      medicalStore: '0.5 km',
      publicTransport: '0.2 km',
      metro: '1.5 km'
    }
  },
  {
    id: 2,
    title: 'Cozy Studio near University',
    location: 'Al Malaz, Riyadh',
    price: 'SAR 2,200/month',
    priceValue: 2200,
    bedrooms: 1,
    bathrooms: 1,
    size: '65 sqm',
    description: 'Perfect for students, this studio apartment is just a 5-minute walk from the university.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Furnished', 'Near University', 'Public Transport'],
    mapLink: 'https://maps.google.com/?q=Al+Malaz+Riyadh',
    amenities: {
      hospital: '3 km',
      supermarket: '0.2 km',
      medicalStore: '0.8 km',
      publicTransport: '0.1 km',
      metro: '2 km'
    }
  },
  {
    id: 3,
    title: 'Luxury Villa with Garden',
    location: 'Al Narjis, Riyadh',
    price: 'SAR 9,000/month',
    priceValue: 9000,
    bedrooms: 4,
    bathrooms: 3,
    size: '300 sqm',
    description: 'Elegant villa with a beautiful garden, perfect for families or groups of friends.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Garden', 'Private Parking', 'Security', 'Pets Allowed']
  },
  {
    id: 4,
    title: 'Shared Room in Modern Flat',
    location: 'Al Muruj, Riyadh',
    price: 'SAR 1,300/month',
    priceValue: 1300,
    bedrooms: 1,
    bathrooms: 1,
    size: '20 sqm (room)',
    description: 'Shared apartment with private room. Common areas include kitchen, living room and bathroom.',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Shared', 'Furnished', 'Bills Included', 'Internet']
  },
  {
    id: 5,
    title: 'Penthouse with Stunning Views',
    location: 'Al Hamra, Jeddah',
    price: 'SAR 7,500/month',
    priceValue: 7500,
    bedrooms: 3,
    bathrooms: 2,
    size: '180 sqm',
    description: 'Luxurious penthouse with panoramic sea views. Includes private rooftop terrace.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Terrace', 'Sea View', 'Luxury', 'Furnished']
  },
  {
    id: 6,
    title: 'Spacious Room for Rent',
    location: 'Al Rawdah, Jeddah',
    price: 'SAR 1,800/month',
    priceValue: 1800,
    bedrooms: 1,
    bathrooms: 1,
    size: '25 sqm (room)',
    description: 'Large private room in a shared apartment. Close to shops and public transport.',
    image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Private Room', 'Female Only', 'Bills Included']
  }
];

// Price thresholds for property categories
const PRICE_THRESHOLDS = {
  BASIC: 2500,    // Properties below 2500 SAR/month
  COMFORT: 6000   // Properties between 2500-6000 SAR/month
                  // Properties above 6000 SAR/month are Elite
};

const Properties = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(propId => propId !== id) 
        : [...prev, id]
    );
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
  category: 'basic' | 'comfort' | 'elite';
}

const PropertyCard = ({ property, isFavorite, onToggleFavorite, category }: PropertyCardProps) => {
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
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "absolute top-2 right-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40",
            isFavorite ? "text-red-500" : "text-white"
          )}
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite();
          }}
        >
          <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
        </Button>
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
      
      <CardFooter>
        <Button className="w-full rounded-md">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default Properties;
