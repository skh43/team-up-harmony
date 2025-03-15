
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Bed, Bath, Square, Heart, Filter } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';

// Mock data for properties
const MOCK_PROPERTIES = [
  {
    id: 1,
    title: 'Modern Apartment with Balcony',
    location: 'Al Olaya, Riyadh',
    price: 'SAR 3,500/month',
    bedrooms: 2,
    bathrooms: 2,
    size: '120 sqm',
    description: 'Spacious and bright apartment in a central location with modern amenities.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Balcony', 'Pool', 'Gym', 'Parking']
  },
  {
    id: 2,
    title: 'Cozy Studio near University',
    location: 'Al Malaz, Riyadh',
    price: 'SAR 2,200/month',
    bedrooms: 1,
    bathrooms: 1,
    size: '65 sqm',
    description: 'Perfect for students, this studio apartment is just a 5-minute walk from the university.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Furnished', 'Near University', 'Public Transport']
  },
  {
    id: 3,
    title: 'Luxury Villa with Garden',
    location: 'Al Narjis, Riyadh',
    price: 'SAR 9,000/month',
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
    bedrooms: 1,
    bathrooms: 1,
    size: '25 sqm (room)',
    description: 'Large private room in a shared apartment. Close to shops and public transport.',
    image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    tags: ['Private Room', 'Female Only', 'Bills Included']
  }
];

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(propId => propId !== id) 
        : [...prev, id]
    );
  };
  
  const filteredProperties = MOCK_PROPERTIES.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout className="flex flex-col min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="my-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Space</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Browse available properties that match your needs and budget.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
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
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    size: string;
    description: string;
    image: string;
    tags: string[];
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PropertyCard = ({ property, isFavorite, onToggleFavorite }: PropertyCardProps) => {
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
      </div>
      
      <CardHeader className="py-4">
        <CardTitle className="text-xl">{property.title}</CardTitle>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <CardDescription className="text-sm">{property.location}</CardDescription>
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
