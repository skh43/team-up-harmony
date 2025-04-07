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
import { Briefcase, Clock, Flag, Home, Sofa, Coffee, MapPin, Hospital, ShoppingCart, Bus, Train, Map, BedDouble, Users, Bath, Utensils } from "lucide-react";
import BackButton from '@/components/BackButton';
import ModernLogo from '@/components/ModernLogo';
import { Checkbox } from '@/components/ui/checkbox';
import ProfilePhotoUpload from '@/components/ProfilePhotoUpload';
import { Textarea } from "@/components/ui/textarea";
import PropertyImageUpload from '@/components/PropertyImageUpload';
import { useTranslation } from 'react-i18next';
import { TabView, TabsContent } from "@/components/ui/tab-view";

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
  livingReference: z.string().min(1, "Please select your accommodation type"),
  locationArea: z.string().optional(),
  roomDescription: z.string().optional(),
  sharedFacilities: z.string().optional(),
  mapLink: z.string().url("Please enter a valid map URL").optional().or(z.literal('')),
  distanceHospital: z.string().optional(),
  distanceSupermarket: z.string().optional(),
  distanceMedicalStore: z.string().optional(),
  distancePublicTransport: z.string().optional(),
  distanceMetroStation: z.string().optional(),
});

const nationalities = [
  "Afghan", "American", "Australian", "Bangladeshi", "Brazilian", 
  "British", "Canadian", "Chinese", "Egyptian", "Filipino", 
  "French", "German", "Indian", "Indonesian", "Irish", 
  "Italian", "Japanese", "Kenyan", "Korean", "Malaysian", 
  "Mexican", "Nigerian", "Pakistani", "Russian", "Saudi Arabian", 
  "Singaporean", "South African", "Spanish", "Turkish", "Other"
];

const riyadhAreas = [
  "Al Olaya", "Al Malaz", "Al Murabba", "Al Muruj", "Al Nakheel",
  "Al Naseem", "Al Qods", "Al Rabwah", "Al Rawdah", "Al Sahafah",
  "Al Shifa", "Al Sulimaniyah", "Al Wadi", "Al Wurud", "Al Yasmin",
  "Diplomatic Quarter", "Hittin", "King Abdullah Financial District",
  "King Fahd District", "Qurtubah", "Taawun", "Al Hamra", "Al Rimal",
  "Al Nahda", "Al Izdihar", "Al Ghadir", "Al Bat'ha", "Al Ma'athar"
];

export default function ProfileCreation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [roomImages, setRoomImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("personal");
  const [userPath, setUserPath] = useState<string>('host'); // Default to 'host'
  
  useEffect(() => {
    if (location.state && location.state.path) {
      setUserPath(location.state.path);
    } else {
      const savedPath = localStorage.getItem('userPath');
      if (savedPath) {
        setUserPath(savedPath);
      }
    }
  }, [location]);

  const showRoomDetails = userPath === 'host';
  
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
      livingReference: "",
      locationArea: "",
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      ...values,
      profilePhoto,
      roomImages,
      userPath
    });
    navigate("/matching");
  }

  const tabs = userPath === 'host' 
    ? [
        { value: "personal", label: t('profileCreation.personalInfo'), color: "purple" },
        { value: "room", label: t('profileCreation.roomInfo'), color: "blue" }
      ]
    : [
        { value: "personal", label: t('profileCreation.personalInfo'), color: "purple" },
      ];

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex justify-center mb-8">
        <ModernLogo size="large" />
      </div>
      
      <div className="mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold mt-4 mb-2">{t('profileCreation.title')}</h1>
        <p className="text-muted-foreground">{t('profileCreation.subtitle')}</p>
        {userPath === 'host' && (
          <p className="text-xs text-airbnb-red mt-2 font-medium">{t('pathSelection.hostEasier')}</p>
        )}
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <TabView 
            tabs={tabs} 
            onValueChange={setActiveTab} 
            defaultValue="personal"
          >
            <TabsContent value="personal" className="space-y-6 mt-4">
              <ProfilePhotoUpload 
                image={profilePhoto}
                setImage={setProfilePhoto}
              />
              
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
              
              {showRoomDetails && (
                <FormField
                  control={form.control}
                  name="livingReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4" /> {t('profileCreation.livingReference')}
                      </FormLabel>
                      <FormDescription>
                        {t('profileCreation.livingReferenceDesc')}
                      </FormDescription>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('profileCreation.selectLivingReference')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sharedRoom">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{t('profileCreation.sharedRoom')}</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="singleRoom">
                            <div className="flex items-center gap-2">
                              <BedDouble className="w-4 h-4" />
                              <span>{t('profileCreation.singleRoom')}</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="bedSpace">
                            <div className="flex items-center gap-2">
                              <Sofa className="w-4 h-4" />
                              <span>{t('profileCreation.bedSpace')}</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
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
                name="locationArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {t('profileCreation.locationArea')}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('profileCreation.selectLocationArea')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {riyadhAreas.map((area) => (
                          <SelectItem key={area} value={area.toLowerCase()}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {t('profileCreation.locationAreaDesc')}
                    </FormDescription>
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
            </TabsContent>
            
            {showRoomDetails && (
              <TabsContent value="room" className="space-y-6 mt-4">
                <div>
                  <FormLabel className="block mb-2">{t('profileCreation.roomImages')}</FormLabel>
                  <PropertyImageUpload 
                    images={roomImages}
                    setImages={setRoomImages}
                    minImages={1} // Reduced from 2 to 1 to make it easier
                  />
                </div>
                
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
                
                <FormField
                  control={form.control}
                  name="sharedFacilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Coffee className="w-4 h-4" /> {t('profileCreation.sharedAmenities')}
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t('profileCreation.sharedAmenitiesPlaceholder')} 
                          className="min-h-24" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        {t('profileCreation.sharedAmenitiesHelp')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="distanceMedicalStore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Hospital className="w-4 h-4" /> {t('profileCreation.distanceMedicalStore')}
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
                </div>
                
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
              </TabsContent>
            )}
          </TabView>
          
          <Button type="submit" variant="airbnb" className="w-full">
            {t('common.continue')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
