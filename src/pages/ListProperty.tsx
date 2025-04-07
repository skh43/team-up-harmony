
import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
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

const ListProperty = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [category, setCategory] = useState<'basic' | 'comfort' | 'elite' | ''>('');
  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  
  // Define form schema with validation rules
  const formSchema = z.object({
    title: z.string().min(5, t("validation.required", { field: t("listProperty.propertyTitle") })),
    location: z.string().min(3, t("validation.required", { field: t("listProperty.location") })),
    description: z.string().min(20, t("validation.required", { field: t("listProperty.propertyDescription") })),
    price: z.string().min(1, t("validation.required", { field: t("listProperty.monthlyPrice") })),
    bedrooms: z.string().min(1, t("validation.required", { field: t("listProperty.bedrooms") })),
    bathrooms: z.string().min(1, t("validation.required", { field: t("listProperty.bathrooms") })),
    size: z.string().min(1, t("validation.required", { field: t("listProperty.size") })),
    propertyType: z.string().min(1, t("validation.required", { field: t("listProperty.propertyType") })),
    contractDuration: z.enum(["monthly", "sixMonths", "yearly"], {
      required_error: t("validation.required", { field: t("listProperty.contractDuration") }),
    }),
    imageUrl: z.string().url(t("validation.required", { field: t("listProperty.mainImageUrl") })).optional(),
    tags: z.string().optional(),
    mapLink: z.string().url(t("validation.required", { field: t("listProperty.mapLink") })).optional().or(z.literal('')),
    distanceHospital: z.string().optional(),
    distanceSupermarket: z.string().optional(),
    distanceMedicalStore: z.string().optional(),
    distancePublicTransport: z.string().optional(),
    distanceMetro: z.string().optional(),
  });
  
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
          label: t('properties.basic'),
          icon: <House className="h-4 w-4 mr-1" />,
          color: 'basic',
          description: t('properties.basicDescription')
        };
      case 'comfort':
        return {
          label: t('properties.comfort'),
          icon: <Sofa className="h-4 w-4 mr-1" />,
          color: 'comfort',
          description: t('properties.comfortDescription')
        };
      case 'elite':
        return {
          label: t('properties.elite'),
          icon: <Crown className="h-4 w-4 mr-1" />,
          color: 'elite',
          description: t('properties.eliteDescription')
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
      toast.error(t("validation.required", { field: t("listProperty.propertyImages") }));
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
    toast.success(t("listProperty.success"));
    
    // Redirect to properties page after submission
    setTimeout(() => {
      navigate('/properties');
    }, 2000);
  }

  const categoryDetails = getCategoryDetails();
  
  // Generate placeholder text based on selected category
  const getDescriptionPlaceholder = () => {
    if (!category) return t("listProperty.descriptionPlaceholderDefault");
    
    switch (category) {
      case 'basic':
        return t("listProperty.descriptionPlaceholderBasic");
      case 'comfort':
        return t("listProperty.descriptionPlaceholderComfort");
      case 'elite':
        return t("listProperty.descriptionPlaceholderElite");
      default:
        return t("listProperty.descriptionPlaceholderDefault");
    }
  };

  return (
    <MainLayout className="pb-16">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="my-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("listProperty.title")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("listProperty.subtitle")}
          </p>
        </div>
        
        <Card className="bg-white/80 backdrop-blur shadow-subtle">
          <CardHeader>
            <CardTitle className="text-2xl">{t("listProperty.propertyDetails")}</CardTitle>
            <CardDescription>
              {t("listProperty.accurateInfo")}
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
                        <FormLabel>{t("listProperty.propertyTitle")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.titlePlaceholder")} {...field} />
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
                        <FormLabel>{t("listProperty.location")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.locationPlaceholder")} {...field} />
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
                        <FormLabel>{t("listProperty.propertyType")}</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("listProperty.selectPropertyType")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apartment">{t("listProperty.apartment")}</SelectItem>
                            <SelectItem value="villa">{t("listProperty.villa")}</SelectItem>
                            <SelectItem value="house">{t("listProperty.house")}</SelectItem>
                            <SelectItem value="room">{t("listProperty.privateRoom")}</SelectItem>
                            <SelectItem value="shared">{t("listProperty.sharedRoom")}</SelectItem>
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
                        <FormLabel>{t("listProperty.monthlyPrice")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              className="pl-10" 
                              placeholder={t("listProperty.pricePlaceholder")} 
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
                              {categoryDetails.label} {t("properties.properties")}
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-2">
                              {categoryDetails.description}
                            </span>
                          </div>
                        )}
                        <FormDescription>
                          {category && (
                            <div className="mt-1 text-xs">
                              <strong>{t("listProperty.priceTiers")}:</strong> {t("properties.basic")} (&lt; {PRICE_THRESHOLDS.BASIC} SAR), 
                              {t("properties.comfort")} ({PRICE_THRESHOLDS.BASIC}-{PRICE_THRESHOLDS.COMFORT} SAR), 
                              {t("properties.elite")} (&gt; {PRICE_THRESHOLDS.COMFORT} SAR)
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
                          <Calendar className="h-4 w-4 mr-1" /> {t("listProperty.contractDuration")}
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
                                {t("listProperty.monthly")}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="sixMonths" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {t("listProperty.sixMonths")}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yearly" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {t("listProperty.yearly")}
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          {t("listProperty.contractDesc")}
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
                        <FormLabel>{t("listProperty.bedrooms")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Bed className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.bedroomPlaceholder")} type="number" min="0" {...field} />
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
                        <FormLabel>{t("listProperty.bathrooms")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Bath className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.bathroomPlaceholder")} type="number" min="0" step="0.5" {...field} />
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
                        <FormLabel>{t("listProperty.size")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Square className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.sizePlaceholder")} type="number" min="0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Location Details Section */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold mb-4">{t("listProperty.nearbyAmenities")}</h3>
                  </div>
                  
                  {/* Map Link */}
                  <FormField
                    control={form.control}
                    name="mapLink"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>{t("listProperty.mapLink")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Map className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.mapLinkPlaceholder")} {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          {t("listProperty.mapLinkDesc")}
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
                        <FormLabel>{t("listProperty.distanceHospital")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Hospital className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.distanceHospitalPlaceholder")} {...field} />
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
                        <FormLabel>{t("listProperty.distanceSupermarket")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <ShoppingCart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.distanceSupermarketPlaceholder")} {...field} />
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
                        <FormLabel>{t("listProperty.distanceMedicalStore")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <PlusCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.distanceMedicalStorePlaceholder")} {...field} />
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
                        <FormLabel>{t("listProperty.distancePublicTransport")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Bus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.distancePublicTransportPlaceholder")} {...field} />
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
                        <FormLabel>{t("listProperty.distanceMetro")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Train className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.distanceMetroPlaceholder")} {...field} />
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
                        <FormLabel>{t("listProperty.mainImageUrl")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Camera className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.mainImageUrlPlaceholder")} {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          {t("listProperty.mainImageUrlDesc")}
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
                        <FormLabel>{t("listProperty.tags")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder={t("listProperty.tagsPlaceholder")} {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          {t("listProperty.tagsDesc")}
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
                          {t("listProperty.propertyDescription")}
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
                              {t("listProperty.categoryDescription", {
                                 category: categoryDetails?.label,
                                 description: categoryDetails?.description
                              })}
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
                    {t("listProperty.reviewNotice")}
                  </p>
                  <Button type="submit" className="gap-2">
                    <Check className="h-4 w-4" />
                    {t("listProperty.submitListing")}
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
