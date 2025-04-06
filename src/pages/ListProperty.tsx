import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { MapPin, Bed, Bath, Square, Building, DollarSign, Tag, Camera, Check, House, Sofa, Crown,
  Hospital, ShoppingCart, PlusCircle, Bus, Train, Map, Calendar } from 'lucide-react';

import MainLayout from '@/layouts/MainLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import PropertyImageUpload from '@/components/PropertyImageUpload';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define price thresholds for property categories (same as in Properties.tsx)
const PRICE_THRESHOLDS = {
  BASIC: 2500,    // Properties below 2500 SAR/month
  COMFORT: 6000   // Properties between 2500-6000 SAR/month
                  // Properties above 6000 SAR/month are Elite
};

// Define form schema with validation rules
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  location: z.string().min(3, "Location is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.string().min(1, "Price is required"),
  bedrooms: z.string().min(1, "Number of bedrooms is required"),
  bathrooms: z.string().min(1, "Number of bathrooms is required"),
  size: z.string().min(1, "Size is required"),
  propertyType: z.string().min(1, "Property type is required"),
  contractDuration: z.enum(["monthly", "sixMonths", "yearly"], {
    required_error: "Please select a contract duration",
  }),
  imageUrl: z.string().url("Please enter a valid image URL").optional(),
  tags: z.string().optional(),
  mapLink: z.string().url("Please enter a valid map URL").optional().or(z.literal('')),
  distanceHospital: z.string().optional(),
  distanceSupermarket: z.string().optional(),
  distanceMedicalStore: z.string().optional(),
  distancePublicTransport: z.string().optional(),
  distanceMetro: z.string().optional(),
});

const ListProperty = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<'basic' | 'comfort' | 'elite' | ''>('');
  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  
  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      size: "",
      propertyType: "",
      contractDuration: "monthly",
      imageUrl: "",
      tags: "",
      mapLink: "",
      distanceHospital: "",
      distanceSupermarket: "",
      distanceMedicalStore: "",
      distancePublicTransport: "",
      distanceMetro: "",
    },
  });

  // Calculate property category based on price
  const watchPrice = form.watch("price");
  
  useEffect(() => {
    const priceValue = parseFloat(watchPrice);
    if (!isNaN(priceValue)) {
      if (priceValue < PRICE_THRESHOLDS.BASIC) {
        setCategory('basic');
      } else if (priceValue < PRICE_THRESHOLDS.COMFORT) {
        setCategory('comfort');
      } else {
        setCategory('elite');
      }
    } else {
      setCategory('');
    }
  }, [watchPrice]);

  // Get category display details
  const getCategoryDetails = () => {
    switch (category) {
      case 'basic':
        return {
          label: 'Basic',
          icon: <House className="h-4 w-4 mr-1" />,
          color: 'basic',
          description: 'Affordable and functional living space'
        };
      case 'comfort':
        return {
          label: 'Comfort',
          icon: <Sofa className="h-4 w-4 mr-1" />,
          color: 'comfort',
          description: 'Mid-range property with modern amenities'
        };
      case 'elite':
        return {
          label: 'Elite',
          icon: <Crown className="h-4 w-4 mr-1" />,
          color: 'elite',
          description: 'Premium property with luxury features'
        };
      default:
        return null;
    }
  };

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
    
    // Validate that we have enough property images
    if (propertyImages.length < 6) {
      toast.error("Please add at least 6 property images showing different rooms");
      return;
    }
    
    // Add the category to the submitted data
    const submissionData = {
      ...values,
      category,
      images: propertyImages
    };
    
    console.log("Property submission with category:", submissionData);
    
    // Show success toast
    toast.success("Property listing submitted successfully! It will be reviewed by our team.");
    
    // Redirect to properties page after submission
    setTimeout(() => {
      navigate('/properties');
    }, 2000);
  }

  const categoryDetails = getCategoryDetails();
  
  // Generate placeholder text based on selected category
  const getDescriptionPlaceholder = () => {
    if (!category) return "Describe your property in detail...";
    
    switch (category) {
      case 'basic':
        return "Describe your Basic property in detail. Include key features like proximity to public transport, nearby facilities, etc. This is an affordable property option.";
      case 'comfort':
        return "Describe your Comfort property in detail. Highlight the modern amenities, quality fixtures, neighborhood benefits, etc. This is a mid-range property with attractive features.";
      case 'elite':
        return "Describe your Elite property in detail. Emphasize premium features, luxury finishes, exclusive location benefits, etc. This is a high-end property with exceptional quality.";
      default:
        return "Describe your property in detail...";
    }
  };

  return (
    <MainLayout className="pb-16">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="my-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">List Your Property</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete the form below to list your property and reach potential tenants or buyers.
          </p>
        </div>
        
        <Card className="bg-white/80 backdrop-blur shadow-subtle">
          <CardHeader>
            <CardTitle className="text-2xl">Property Details</CardTitle>
            <CardDescription>
              Provide accurate information to help people find your property.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Property Title</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g. Modern Apartment with Balcony" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g. Al Olaya, Riyadh" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Property Type */}
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="room">Private Room</SelectItem>
                            <SelectItem value="shared">Shared Room</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Price */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Price (SAR)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              className="pl-10" 
                              placeholder="e.g. 3500" 
                              {...field} 
                              type="number"
                              min="0"
                              step="100"
                              onChange={(e) => {
                                field.onChange(e);
                                const priceValue = parseFloat(e.target.value);
                                // Update category immediately based on price input
                                if (!isNaN(priceValue)) {
                                  if (priceValue < PRICE_THRESHOLDS.BASIC) {
                                    setCategory('basic');
                                  } else if (priceValue < PRICE_THRESHOLDS.COMFORT) {
                                    setCategory('comfort');
                                  } else {
                                    setCategory('elite');
                                  }
                                } else {
                                  setCategory('');
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        {categoryDetails && (
                          <div className="mt-2 flex items-center">
                            <Badge variant={categoryDetails.color as any} className="flex items-center gap-1">
                              {categoryDetails.icon}
                              {categoryDetails.label} Property
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-2">
                              {categoryDetails.description}
                            </span>
                          </div>
                        )}
                        <FormDescription>
                          {category && (
                            <div className="mt-1 text-xs">
                              <strong>Price tiers:</strong> Basic (&lt; {PRICE_THRESHOLDS.BASIC} SAR), 
                              Comfort ({PRICE_THRESHOLDS.BASIC}-{PRICE_THRESHOLDS.COMFORT} SAR), 
                              Elite (&gt; {PRICE_THRESHOLDS.COMFORT} SAR)
                            </div>
                          )}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Contract Duration */}
                  <FormField
                    control={form.control}
                    name="contractDuration"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 mr-1" /> Contract Duration
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="monthly" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Monthly (Short-term)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="sixMonths" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                6 Months (Medium-term)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yearly" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Yearly (Long-term)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          Select the contract duration you're offering for this property
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Bedrooms */}
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Bed className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g. 2" type="number" min="0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Bathrooms */}
                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Bath className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g. 1" type="number" min="0" step="0.5" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Size */}
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size (sqm)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Square className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g. 120" type="number" min="0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Location Details Section */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold mb-4">Nearby Amenities & Location</h3>
                  </div>
                  
                  {/* Map Link */}
                  <FormField
                    control={form.control}
                    name="mapLink"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Map Link</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Map className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g. https://maps.google.com/?q=your-property-location" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Paste a link to Google Maps or any other map service showing your property location
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Distance to Hospital */}
                  <FormField
                    control={form.control}
                    name="distanceHospital"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance to Nearest Hospital</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Hospital className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g. 2.5 km" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Distance to Supermarket */}
                  <FormField
                    control={form.control}
                    name="distanceSupermarket"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance to Nearest Supermarket</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <ShoppingCart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g. 0.5 km" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Distance to Medical Store */}
                  <FormField
                    control={form.control}
                    name="distanceMedicalStore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance to Nearest Medical Store</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <PlusCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g. 1 km" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Distance to Public Transport */}
                  <FormField
                    control={form.control}
                    name="distancePublicTransport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance to Public Transport</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Bus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g. 0.2 km" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Distance to Metro */}
                  <FormField
                    control={form.control}
                    name="distanceMetro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance to Metro Station</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Train className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g. 1.5 km" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Main Image URL - now kept as a fallback */}
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Main Property Image URL (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Camera className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="https://example.com/image.jpg" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          You can upload multiple images below or provide a URL for the main image
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Property Images */}
                  <div className="md:col-span-2">
                    <PropertyImageUpload 
                      images={propertyImages}
                      setImages={setPropertyImages}
                      minImages={6}
                    />
                  </div>
                  
                  {/* Tags */}
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g. Balcony, Pool, Furnished (comma separated)" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Add tags that highlight key features of your property
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="flex items-center gap-2">
                          Property Description
                          {categoryDetails && (
                            <Badge variant={categoryDetails.color as any} className="flex items-center gap-1">
                              {categoryDetails.icon}
                              {categoryDetails.label}
                            </Badge>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={getDescriptionPlaceholder()} 
                            className="min-h-32" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          {category && (
                            <span className="flex items-center gap-1 mt-1">
                              {categoryDetails?.icon}
                              This is a <strong>{categoryDetails?.label}</strong> category property ({categoryDetails?.description}).
                            </span>
                          )}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    All listings are reviewed by our team before going live
                  </p>
                  <Button type="submit" className="gap-2">
                    <Check className="h-4 w-4" />
                    Submit Listing
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ListProperty;
