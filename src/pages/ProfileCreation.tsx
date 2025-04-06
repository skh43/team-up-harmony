
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Clock, Flag, Home, Sofa, Coffee, MapPin, Hospital, ShoppingCart, Bus, Train, Map } from "lucide-react";
import BackButton from '@/components/BackButton';
import ModernLogo from '@/components/ModernLogo';
import { Checkbox } from '@/components/ui/checkbox';
import ProfilePhotoUpload from '@/components/ProfilePhotoUpload';
import { Textarea } from "@/components/ui/textarea";
import PropertyImageUpload from '@/components/PropertyImageUpload';

// Define the form schema with Zod
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  age: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 18, {
    message: "You must be at least 18 years old",
  }),
  gender: z.string().min(1, "Please select your gender"),
  workProfession: z.string().min(2, "Please enter your profession"),
  workTiming: z.string().min(2, "Please specify your work schedule"),
  nationality: z.string().min(1, "Please select your nationality"),
  openToAllNationalities: z.boolean().default(false),
  // Room details fields
  roomDescription: z.string().min(10, "Please provide details about your room/space").optional(),
  sharedFacilities: z.string().min(5, "Please list the facilities you're willing to share").optional(),
  // New location and amenities fields
  mapLink: z.string().url("Please enter a valid map URL").optional().or(z.literal('')),
  distanceHospital: z.string().optional(),
  distanceSupermarket: z.string().optional(),
  distanceMedicalStore: z.string().optional(),
  distancePublicTransport: z.string().optional(),
  distanceMetroStation: z.string().optional(),
});

// List of nationalities for the dropdown
const nationalities = [
  "Afghan", "American", "Australian", "Bangladeshi", "Brazilian", 
  "British", "Canadian", "Chinese", "Egyptian", "Filipino", 
  "French", "German", "Indian", "Indonesian", "Irish", 
  "Italian", "Japanese", "Kenyan", "Korean", "Malaysian", 
  "Mexican", "Nigerian", "Pakistani", "Russian", "Saudi Arabian", 
  "Singaporean", "South African", "Spanish", "Turkish", "Other"
];

export default function ProfileCreation() {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [roomImages, setRoomImages] = useState<string[]>([]);
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      workProfession: "",
      workTiming: "",
      nationality: "",
      openToAllNationalities: false,
      roomDescription: "",
      sharedFacilities: "",
      mapLink: "",
      distanceHospital: "",
      distanceSupermarket: "",
      distanceMedicalStore: "",
      distancePublicTransport: "",
      distanceMetroStation: "",
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      ...values,
      profilePhoto,
      roomImages
    });
    // Redirect to the next step
    navigate("/matching");
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex justify-center mb-8">
        <ModernLogo size="large" />
      </div>
      
      <div className="mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold mt-4 mb-2">Create Your Profile</h1>
        <p className="text-muted-foreground">Tell us about yourself to help find your perfect roommate match.</p>
      </div>
      
      <ProfilePhotoUpload 
        image={profilePhoto}
        setImage={setProfilePhoto}
      />
      
      <div className="my-6 border-t border-gray-200"></div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="nonbinary">Non-binary</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="workProfession"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Work Profession
                </FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer, Teacher, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="workTiming"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Work Schedule
                </FormLabel>
                <FormControl>
                  <Input placeholder="9am-5pm weekdays, night shifts, remote, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Flag className="w-4 h-4" /> Nationality
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your nationality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {nationalities.map((nationality) => (
                      <SelectItem key={nationality} value={nationality.toLowerCase()}>
                        {nationality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="openToAllNationalities"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Open to living with all nationalities
                  </FormLabel>
                  <FormDescription>
                    Check this if you're comfortable living with people from any background
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          {/* Add the Room/Space Section */}
          <div className="my-6 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Your Room/Space Details</h2>
            <p className="text-muted-foreground mb-4">
              Upload photos and provide details about the room or bed space you're offering.
            </p>
          </div>
          
          {/* Room Images Upload */}
          <div>
            <PropertyImageUpload 
              images={roomImages}
              setImages={setRoomImages}
              minImages={2}
            />
          </div>
          
          {/* Room Description */}
          <FormField
            control={form.control}
            name="roomDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Home className="w-4 h-4" /> Room/Space Description
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your room or bed space in detail (size, furnishings, window, etc.)" 
                    className="min-h-24" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Provide details about your room/space to help potential roommates understand what you're offering
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Shared Facilities */}
          <FormField
            control={form.control}
            name="sharedFacilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Coffee className="w-4 h-4" /> Shared Facilities
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List all facilities you're willing to share (kitchen, bathroom, living room, wifi, etc.)" 
                    className="min-h-24" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Clearly mention which facilities will be shared with roommates
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* NEW: Nearby Amenities & Location Section */}
          <div className="my-6 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Nearby Amenities & Location</h2>
            <p className="text-muted-foreground mb-4">
              Help potential roommates understand your location and nearby facilities.
            </p>
          </div>
          
          {/* Map Link */}
          <FormField
            control={form.control}
            name="mapLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Map className="w-4 h-4" /> Map Link
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. https://maps.google.com/?q=your-property-location" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Paste a link to Google Maps or any other map service showing your property location
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Hospital distance */}
          <FormField
            control={form.control}
            name="distanceHospital"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Hospital className="w-4 h-4" /> Distance to Nearest Hospital
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. 2.5 km" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Supermarket distance */}
          <FormField
            control={form.control}
            name="distanceSupermarket"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> Distance to Nearest Supermarket
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. 0.5 km" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Medical Store distance */}
          <FormField
            control={form.control}
            name="distanceMedicalStore"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Distance to Nearest Medical Store
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. 1 km" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Public Transport distance */}
          <FormField
            control={form.control}
            name="distancePublicTransport"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Bus className="w-4 h-4" /> Distance to Public Transport
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. 0.2 km" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Metro Station distance */}
          <FormField
            control={form.control}
            name="distanceMetroStation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Train className="w-4 h-4" /> Distance to Metro Station
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. 1.5 km" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" variant="airbnb" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
