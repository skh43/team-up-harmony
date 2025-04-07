
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { useTranslation } from 'react-i18next';

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
  // Room details fields - made optional since they might not be needed for Seek & Settle path
  roomDescription: z.string().optional(),
  sharedFacilities: z.string().optional(),
  // New location and amenities fields - also made optional
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
  const location = useLocation();
  const { t } = useTranslation();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [roomImages, setRoomImages] = useState<string[]>([]);
  const [userPath, setUserPath] = useState<string>('host'); // Default to 'host'
  
  // Check if this is Seek & Settle path by getting path from location state
  useEffect(() => {
    if (location.state && location.state.path) {
      setUserPath(location.state.path);
    } else {
      // Try to get from localStorage if not in location state
      const savedPath = localStorage.getItem('userPath');
      if (savedPath) {
        setUserPath(savedPath);
      }
    }
  }, [location]);

  // Determine if we should show the room details section
  const showRoomDetails = userPath === 'host';
  
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
      roomImages,
      userPath
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
        <h1 className="text-2xl font-bold mt-4 mb-2">{t('profileCreation.title')}</h1>
        <p className="text-muted-foreground">{t('profileCreation.subtitle')}</p>
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
                  <FormLabel>{t('profileCreation.firstName')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('profileCreation.firstNamePlaceholder')} {...field} />
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
                  <FormLabel>{t('profileCreation.lastName')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('profileCreation.lastNamePlaceholder')} {...field} />
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
                  <FormLabel>{t('profileCreation.age')}</FormLabel>
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
                  <FormLabel>{t('profileCreation.gender')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('profileCreation.selectGender')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">{t('profileCreation.male')}</SelectItem>
                      <SelectItem value="female">{t('profileCreation.female')}</SelectItem>
                      <SelectItem value="nonbinary">{t('profileCreation.nonbinary')}</SelectItem>
                      <SelectItem value="other">{t('profileCreation.other')}</SelectItem>
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
                  <Briefcase className="w-4 h-4" /> {t('profileCreation.workProfession')}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t('profileCreation.workProfessionPlaceholder')} {...field} />
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
                  <Clock className="w-4 h-4" /> {t('profileCreation.workSchedule')}
                </FormLabel>
                <FormControl>
                  <Input placeholder={t('profileCreation.workSchedulePlaceholder')} {...field} />
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
                  <Flag className="w-4 h-4" /> {t('profileCreation.nationality')}
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('profileCreation.selectNationality')} />
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
                    {t('profileCreation.openToAllNationalities')}
                  </FormLabel>
                  <FormDescription>
                    {t('profileCreation.openToAllNationalitiesDesc')}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          {/* Room/Space Section - Only show for "Host My Space" path */}
          {showRoomDetails && (
            <>
              <div className="my-6 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-4">{t('profileCreation.roomDetails')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('profileCreation.roomDetailsDesc')}
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
                      <Home className="w-4 h-4" /> {t('profileCreation.roomDescription')}
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t('profileCreation.roomDescriptionPlaceholder')} 
                        className="min-h-24" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      {t('profileCreation.roomDescriptionHelp')}
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
                      <Coffee className="w-4 h-4" /> {t('profileCreation.sharedFacilities')}
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t('profileCreation.sharedFacilitiesPlaceholder')} 
                        className="min-h-24" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      {t('profileCreation.sharedFacilitiesHelp')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Nearby Amenities & Location Section */}
              <div className="my-6 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-4">{t('profileCreation.nearbyAmenities')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('profileCreation.nearbyAmenitiesDesc')}
                </p>
              </div>
              
              {/* Map Link */}
              <FormField
                control={form.control}
                name="mapLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Map className="w-4 h-4" /> {t('profileCreation.mapLink')}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('profileCreation.mapLinkPlaceholder')} 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      {t('profileCreation.mapLinkDesc')}
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
                      <Hospital className="w-4 h-4" /> {t('profileCreation.distanceHospital')}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('profileCreation.distanceHospitalPlaceholder')} 
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
                      <ShoppingCart className="w-4 h-4" /> {t('profileCreation.distanceSupermarket')}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('profileCreation.distanceSupermarketPlaceholder')} 
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
                      <MapPin className="w-4 h-4" /> {t('profileCreation.distanceMedicalStore')}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('profileCreation.distanceMedicalStorePlaceholder')} 
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
                      <Bus className="w-4 h-4" /> {t('profileCreation.distancePublicTransport')}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('profileCreation.distancePublicTransportPlaceholder')} 
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
                      <Train className="w-4 h-4" /> {t('profileCreation.distanceMetroStation')}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('profileCreation.distanceMetroStationPlaceholder')} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          
          <Button type="submit" variant="airbnb" className="w-full">
            {t('common.continue')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
