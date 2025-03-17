
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { MapPin, Bed, Bath, Square, Building, DollarSign, Tag, Camera, Check } from 'lucide-react';

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
  imageUrl: z.string().url("Please enter a valid image URL").optional(),
  tags: z.string().optional(),
});

const ListProperty = () => {
  const navigate = useNavigate();
  
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
      imageUrl: "",
      tags: "",
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
    
    // Show success toast
    toast.success("Property listing submitted successfully! It will be reviewed by our team.");
    
    // Redirect to properties page after submission
    setTimeout(() => {
      navigate('/properties');
    }, 2000);
  }

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
                            <Input className="pl-10" placeholder="e.g. 3500" {...field} />
                          </div>
                        </FormControl>
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
                            <Input className="pl-10" placeholder="e.g. 2" {...field} />
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
                            <Input className="pl-10" placeholder="e.g. 1" {...field} />
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
                            <Input className="pl-10" placeholder="e.g. 120" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Image URL */}
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Property Image URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Camera className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="https://example.com/image.jpg" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Paste a URL to your property image (upload functionality coming soon)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
                        <FormLabel>Property Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your property in detail..." 
                            className="min-h-32" 
                            {...field} 
                          />
                        </FormControl>
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
