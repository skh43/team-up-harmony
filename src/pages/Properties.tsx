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
import { MapPin, Bed, Bath, Square, Heart, Filter, House, Sofa, Crown, Plus, Hospital, ShoppingCart, PlusCircle, Bus, Train, Map, ExternalLink, Share2, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: 'Spacious 2-Bedroom Apartment in Al Nahdah',
    location: 'Al Nahdah, Riyadh',
    price: 'SAR 22,000/year',
    priceValue: 1833,
    bedrooms: 2,
    bathrooms: 2,
    size: '105 sqm',
    description: 'Luxurious 2-bedroom apartment with modern finishes, central AC, and built-in wardrobes. Located near King Khalid International Airport with easy access to main roads.',
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Central AC', 'Built-in Kitchen', 'Security', 'Covered Parking'],
    mapLink: 'https://maps.google.com/?q=Al+Nahdah+Riyadh',
    amenities: {
      hospital: '3.5 km',
      supermarket: '0.5 km',
      medicalStore: '1.2 km',
      publicTransport: '0.4 km',
      metro: '5 km'
    }
  },
  {
    id: 2,
    title: 'Modern Studio Apartment in Aziziyah District',
    location: 'Al Aziziyah, Jeddah',
    price: 'SAR 18,000/year',
    priceValue: 1500,
    bedrooms: 1,
    bathrooms: 1,
    size: '60 sqm',
    description: 'Newly furnished studio apartment with sea view, perfect for singles or young couples. Features security, gym access, and high-speed internet.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Furnished', 'Sea View', 'Gym Access', 'Internet'],
    mapLink: 'https://maps.google.com/?q=Al+Aziziyah+Jeddah',
    amenities: {
      hospital: '2 km',
      supermarket: '0.3 km',
      medicalStore: '0.7 km',
      publicTransport: '0.2 km',
      metro: 'N/A'
    }
  },
  {
    id: 3,
    title: 'Premium 3-Bedroom Apartment in Al Olaya',
    location: 'Al Olaya, Riyadh',
    price: 'SAR 65,000/year',
    priceValue: 5417,
    bedrooms: 3,
    bathrooms: 3,
    size: '165 sqm',
    description: 'Upscale apartment in the heart of Al Olaya business district with premium finishes, smart home features, and 24/7 concierge service. Walking distance to Kingdom Centre.',
    image: 'https://images.unsplash.com/photo-1614107062077-086ba2489615?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Smart Home', 'Concierge', 'Swimming Pool', 'Gym', 'Premium Finishes'],
    mapLink: 'https://maps.google.com/?q=Al+Olaya+Riyadh',
    amenities: {
      hospital: '1.5 km',
      supermarket: '0.3 km',
      medicalStore: '0.5 km',
      publicTransport: '0.2 km',
      metro: '0.8 km'
    }
  },
  {
    id: 4,
    title: 'Budget-Friendly 1-Bedroom in Al Salamah',
    location: 'Al Salamah, Jeddah',
    price: 'SAR 15,000/year',
    priceValue: 1250,
    bedrooms: 1,
    bathrooms: 1,
    size: '75 sqm',
    description: 'Affordable apartment in a family-friendly neighborhood with basic amenities and good connectivity to public transport and universities.',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Family-Friendly', 'Near Universities', 'Public Transport'],
    mapLink: 'https://maps.google.com/?q=Al+Salamah+Jeddah',
    amenities: {
      hospital: '4 km',
      supermarket: '0.6 km',
      medicalStore: '1 km',
      publicTransport: '0.3 km',
      metro: 'N/A'
    }
  },
  {
    id: 5,
    title: 'Elegant 2-Bedroom in Al Hamra Compound',
    location: 'Al Hamra, Riyadh',
    price: 'SAR 90,000/year',
    priceValue: 7500,
    bedrooms: 2,
    bathrooms: 2,
    size: '130 sqm',
    description: 'Luxurious compound apartment with exquisite finishes, private garden, and access to premium facilities including swimming pool, tennis court, and children\'s playground.',
    image: 'https://images.unsplash.com/photo-1585129777188-71ecb882cd1d?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Compound', 'Private Garden', 'Swimming Pool', 'Tennis Court', 'Security'],
    mapLink: 'https://maps.google.com/?q=Al+Hamra+Riyadh',
    amenities: {
      hospital: '5 km',
      supermarket: '1.2 km',
      medicalStore: '1.5 km',
      publicTransport: '0.8 km',
      metro: '3 km'
    }
  },
  {
    id: 6,
    title: 'Female-Only Shared Room Near KAUST',
    location: 'Thuwal, Jeddah',
    price: 'SAR 12,000/year',
    priceValue: 1000,
    bedrooms: 1,
    bathrooms: 1,
    size: '25 sqm (room)',
    description: 'Private room in shared apartment exclusively for female students or professionals. Close to King Abdullah University of Science and Technology (KAUST).',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Female Only', 'Near University', 'Shared Kitchen', 'Bills Included'],
    mapLink: 'https://maps.google.com/?q=Thuwal+Jeddah',
    amenities: {
      hospital: '7 km',
      supermarket: '1 km',
      medicalStore: '1.5 km',
      publicTransport: '0.5 km',
      metro: 'N/A'
    }
  },
  {
    id: 7,
    title: 'Luxury 1-Bedroom Apartment in Al Khobar Corniche',
    location: 'Al Khobar Corniche, Eastern Province',
    price: 'SAR 35,000/year',
    priceValue: 2917,
    bedrooms: 1,
    bathrooms: 1,
    size: '95 sqm',
    description: 'Stunning apartment with panoramic Gulf views, modern design, and top-quality finishes. Features a spacious balcony and premium building amenities.',
    image: 'https://images.unsplash.com/photo-1558442086-8ea5f6658931?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Sea View', 'Balcony', 'Modern Design', 'Premium Building'],
    mapLink: 'https://maps.google.com/?q=Al+Khobar+Corniche',
    amenities: {
      hospital: '3 km',
      supermarket: '0.4 km',
      medicalStore: '0.7 km',
      publicTransport: '0.3 km',
      metro: 'N/A'
    }
  },
  {
    id: 8,
    title: 'Affordable Studio in Al Faisaliyah District',
    location: 'Al Faisaliyah, Riyadh',
    price: 'SAR 16,000/year',
    priceValue: 1333,
    bedrooms: 1,
    bathrooms: 1,
    size: '55 sqm',
    description: 'Cozy studio apartment with basic amenities in a convenient location. Suitable for singles or students with easy access to universities and shopping centers.',
    image: 'https://images.unsplash.com/photo-1622866306950-81d17097d458?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Budget-Friendly', 'Student-Friendly', 'Near Shopping Centers'],
    mapLink: 'https://maps.google.com/?q=Al+Faisaliyah+Riyadh',
    amenities: {
      hospital: '4.5 km',
      supermarket: '0.7 km',
      medicalStore: '1 km',
      publicTransport: '0.4 km',
      metro: '2.5 km'
    }
  },
  {
    id: 9,
    title: 'Furnished 2-Bedroom Apartment in Al Rawdah',
    location: 'Al Rawdah, Jeddah',
    price: 'SAR 45,000/year',
    priceValue: 3750,
    bedrooms: 2,
    bathrooms: 2,
    size: '120 sqm',
    description: 'Fully furnished apartment with modern decor in a quiet residential area. Includes high-speed internet, weekly cleaning service, and covered parking.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3',
    tags: ['Fully Furnished', 'Internet Included', 'Cleaning Service', 'Quiet Area'],
    mapLink: 'https://maps.google.com/?q=Al+Rawdah+Jeddah',
    amenities: {
      hospital: '2.5 km',
      supermarket: '0.5 km',
      medicalStore: '0.8 km',
      publicTransport: '0.5 km',
      metro: 'N/A'
    }
  },
  {
    id: 10,
    title: 'New 3-Bedroom Apartment in Al Yasmin',
    location: 'Al Yasmin, Riyadh',
    price: 'SAR 55,000/year',
    priceValue: 4583,
    bedrooms: 3,
    bathrooms: 2,
    size: '150 sqm',
    description: 'Brand new apartment in a modern residential complex with contemporary design and high-quality finishes. Features a spacious living area and balcony.',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Brand New', 'Modern Complex', 'Spacious', 'Balcony'],
    mapLink: 'https://maps.google.com/?q=Al+Yasmin+Riyadh',
    amenities: {
      hospital: '3.8 km',
      supermarket: '0.6 km',
      medicalStore: '1 km',
      publicTransport: '0.7 km',
      metro: '4 km'
    }
  },
  {
    id: 11,
    title: 'Upscale 1-Bedroom in Granada Business Park',
    location: 'Granada, Riyadh',
    price: 'SAR 40,000/year',
    priceValue: 3333,
    bedrooms: 1,
    bathrooms: 1,
    size: '85 sqm',
    description: 'Contemporary apartment with premium finishes in a prime business district. Features smart home technology, high ceilings, and floor-to-ceiling windows.',
    image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3',
    tags: ['Smart Home', 'Business District', 'High Ceilings', 'Modern Design'],
    mapLink: 'https://maps.google.com/?q=Granada+Riyadh',
    amenities: {
      hospital: '2 km',
      supermarket: '0.3 km',
      medicalStore: '0.5 km',
      publicTransport: '0.2 km',
      metro: '1 km'
    }
  },
  {
    id: 12,
    title: 'Family 4-Bedroom Apartment in Al Nahda',
    location: 'Al Nahda, Dammam',
    price: 'SAR 70,000/year',
    priceValue: 5833,
    bedrooms: 4,
    bathrooms: 3,
    size: '200 sqm',
    description: 'Spacious family apartment with maid\'s room, large kitchen, and multiple balconies. Located in a family-friendly neighborhood with easy access to schools and parks.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Family-Sized', 'Maid\'s Room', 'Multiple Balconies', 'Near Schools'],
    mapLink: 'https://maps.google.com/?q=Al+Nahda+Dammam',
    amenities: {
      hospital: '3 km',
      supermarket: '0.4 km',
      medicalStore: '0.7 km',
      publicTransport: '0.5 km',
      metro: 'N/A'
    }
  }
];

const MOCK_MATCHES = [
  { 
    id: 1, 
    name: "Mohammed", 
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3",
    status: "online"
  },
  { 
    id: 2, 
    name: "Fatima", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3",
    status: "offline"
  },
  { 
    id: 3, 
    name: "Ahmed", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3",
    status: "online"
  }
];

const PRICE_THRESHOLDS = {
  BASIC: 2500,    // Properties below 2500 SAR/month
  COMFORT: 6000   // Properties between 2500-6000 SAR/month
                  // Properties above 6000 SAR/month are Elite
};

const Properties = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [sharePropertyId, setSharePropertyId] = useState<number | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  
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
  category: 'basic' | 'comfort' | 'elite';
}

const PropertyCard = ({ property, isFavorite, onToggleFavorite, onShare, category }: PropertyCardProps) => {
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
        <Button className="w-full rounded-md">View Details</Button>
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

export default Properties;
