
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { User, Save, Building, Calendar, DollarSign, Clock, HeartHandshake, Users, Coffee, Star } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import MainLayout from '@/layouts/MainLayout';

const profileSchema = z.object({
  gender: z.string({
    required_error: "Please select a gender",
  }),
  budget: z.string({
    required_error: "Budget range is required",
  }),
  location: z.string().min(2, "Preferred location is required"),
  roomType: z.string({
    required_error: "Please select room type preference",
  }),
  nationality: z.string().optional(),
  religion: z.string().optional(),
  
  dietary: z.string().optional(),
  workSchedule: z.string().optional(),
  cleanliness: z.string().optional(),
  social: z.string().optional(),
  smoking: z.string().optional(),
  pets: z.string().optional(),
  roommateGender: z.string().optional(),
  
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18 && Number(val) <= 100, {
    message: "Age must be between 18 and 100",
  }),
  occupation: z.string().min(2, "Occupation is required"),
  lifestyle: z.string().optional(),
  bio: z.string().optional(),
  
  // Elite plan fields
  exercisePreference: z.string().optional(),
  hobbies: z.string().optional(),
  conflictStyle: z.string().optional(),
  noisePreference: z.string().optional(),
  relationshipStatus: z.string().optional(),
  lifestyleEnvironment: z.string().optional(),
  techPreference: z.string().optional(),
});

type ProfileValues = z.infer<typeof profileSchema>;

const ProfileCreation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activePlan, setActivePlan] = useState<'basic' | 'comfort' | 'elite'>('basic');
  
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      gender: "",
      budget: "",
      location: "",
      roomType: "",
      nationality: "",
      religion: "",
      dietary: "",
      workSchedule: "",
      cleanliness: "",
      social: "",
      smoking: "",
      pets: "",
      roommateGender: "",
      age: "",
      occupation: "",
      lifestyle: "",
      bio: "",
      exercisePreference: "",
      hobbies: "",
      conflictStyle: "",
      noisePreference: "",
      relationshipStatus: "",
      lifestyleEnvironment: "",
      techPreference: "",
    },
  });

  const onSubmit = async (data: ProfileValues) => {
    try {
      setIsLoading(true);
      // Simulate API call
      console.log("Profile data:", data);
      console.log("Selected plan:", activePlan);
      
      // Show success toast
      toast({
        title: "Profile created successfully!",
        description: "Now let's find your matches.",
      });
      
      // Navigate to matching after profile creation
      setTimeout(() => {
        navigate("/matching");
      }, 1000);
    } catch (error) {
      console.error("Profile creation error:", error);
      toast({
        title: "Profile creation failed",
        description: "There was an error creating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout className="flex min-h-screen py-10">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 mt-4">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Step 3 of 4
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Your Roommate Profile</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tell us about your preferences so we can find your ideal roommate match
          </p>
        </div>
        
        {/* Plan Selection Pills */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-muted p-1 rounded-full">
            <Button
              variant={activePlan === 'basic' ? 'default' : 'ghost'}
              className={`rounded-full ${activePlan === 'basic' ? 'bg-blue-500' : 'hover:bg-blue-100 hover:text-blue-600'}`}
              onClick={() => setActivePlan('basic')}
            >
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Basic Living
              </span>
            </Button>
            <Button
              variant={activePlan === 'comfort' ? 'default' : 'ghost'}
              className={`rounded-full ${activePlan === 'comfort' ? 'bg-purple-500' : 'hover:bg-purple-100 hover:text-purple-600'}`}
              onClick={() => setActivePlan('comfort')}
            >
              <span className="flex items-center">
                <Coffee className="h-4 w-4 mr-2" />
                Comfort Zone
              </span>
            </Button>
            <Button
              variant={activePlan === 'elite' ? 'default' : 'ghost'}
              className={`rounded-full ${activePlan === 'elite' ? 'bg-amber-500' : 'hover:bg-amber-100 hover:text-amber-600'}`}
              onClick={() => setActivePlan('elite')}
            >
              <span className="flex items-center">
                <Star className="h-4 w-4 mr-2" />
                Elite Living
              </span>
            </Button>
          </div>
        </div>

        <Card className="shadow-elegant border-0 overflow-hidden mb-10">
          <CardContent className="p-6 pt-6">
            {/* Basic Plan Banner */}
            {activePlan === 'basic' && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                <h2 className="text-lg font-semibold text-blue-700 mb-1 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Basic Living
                </h2>
                <p className="text-sm text-blue-600">
                  The essential details we need to find a compatible roommate match for you
                </p>
                <div className="mt-2 text-xs bg-blue-100 px-3 py-2 rounded text-blue-800">
                  <strong>Comfort Zone Benefits:</strong> More detailed matching based on lifestyle preferences, advanced filtering options, and priority in search results.
                  <Button variant="secondary" size="sm" className="ml-2 bg-blue-600 text-white hover:bg-blue-700">
                    Subscribe Now
                  </Button>
                </div>
              </div>
            )}
            
            {/* Comfort Zone Banner */}
            {activePlan === 'comfort' && (
              <div className="bg-purple-50 p-4 rounded-lg mb-6 border border-purple-100">
                <h2 className="text-lg font-semibold text-purple-700 mb-1 flex items-center">
                  <Coffee className="h-4 w-4 mr-2" />
                  Comfort Zone
                </h2>
                <p className="text-sm text-purple-600">
                  Enhanced matching with detailed lifestyle preferences for better compatibility
                </p>
                <div className="mt-2 text-xs bg-purple-100 px-3 py-2 rounded text-purple-800">
                  <strong>Elite Living Benefits:</strong> Unlimited matches, ultra-detailed preferences, personality matching, priority support, and exclusive property listings.
                  <Button variant="secondary" size="sm" className="ml-2 bg-purple-600 text-white hover:bg-purple-700">
                    Subscribe Now
                  </Button>
                </div>
              </div>
            )}
            
            {/* Elite Living Banner */}
            {activePlan === 'elite' && (
              <div className="bg-amber-50 p-4 rounded-lg mb-6 border border-amber-100">
                <h2 className="text-lg font-semibold text-amber-700 mb-1 flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Elite Living
                </h2>
                <p className="text-sm text-amber-600">
                  Premium experience with advanced personality matching and exclusive features
                </p>
                <div className="mt-2 text-xs bg-amber-100 px-3 py-2 rounded text-amber-800">
                  <strong>Subscribe now to Elite Living</strong> for the ultimate roommate matching experience.
                  <Button variant="secondary" size="sm" className="ml-2 bg-amber-600 text-white hover:bg-amber-700">
                    Subscribe Now
                  </Button>
                </div>
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Plan Questions - Always Visible */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="font-medium">Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="male" />
                              </FormControl>
                              <FormLabel className="font-normal">Male</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="female" />
                              </FormControl>
                              <FormLabel className="font-normal">Female</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-normal">Other</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Monthly Budget</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="pl-10">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <SelectValue placeholder="Select your budget range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="500-750">SAR 500 - 750</SelectItem>
                            <SelectItem value="750-1000">SAR 750 - 1,000</SelectItem>
                            <SelectItem value="1000-1500">SAR 1,000 - 1,500</SelectItem>
                            <SelectItem value="1500-2000">SAR 1,500 - 2,000</SelectItem>
                            <SelectItem value="2000-3000">SAR 2,000 - 3,000</SelectItem>
                            <SelectItem value="3000+">SAR 3,000+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Preferred Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input className="pl-10" placeholder="City, neighborhood" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="roomType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Room Type Preference</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">Single Room</SelectItem>
                            <SelectItem value="shared">Shared Room</SelectItem>
                            <SelectItem value="any">No Preference</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Nationality Preference (Optional)</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="No preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="no-preference">No Preference</SelectItem>
                            <SelectItem value="saudi">Saudi Arabian</SelectItem>
                            <SelectItem value="egyptian">Egyptian</SelectItem>
                            <SelectItem value="jordanian">Jordanian</SelectItem>
                            <SelectItem value="lebanese">Lebanese</SelectItem>
                            <SelectItem value="turkish">Turkish</SelectItem>
                            <SelectItem value="moroccan">Moroccan</SelectItem>
                            <SelectItem value="emirati">Emirati</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs">
                          This is an optional filter. Select "No Preference" if you don't have a specific preference.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="religion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Religion Preference (Optional)</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="No preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="no-preference">No Preference</SelectItem>
                            <SelectItem value="muslim">Muslim</SelectItem>
                            <SelectItem value="christian">Christian</SelectItem>
                            <SelectItem value="jewish">Jewish</SelectItem>
                            <SelectItem value="hindu">Hindu</SelectItem>
                            <SelectItem value="buddhist">Buddhist</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs">
                          This is an optional filter. Select "No Preference" if you don't have a specific preference.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Bio field for basic plan */}
                {activePlan === 'basic' && (
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel className="font-medium">About You</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <HeartHandshake className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                            <Textarea 
                              className="pl-10 min-h-24" 
                              placeholder="Tell potential roommates about yourself, your interests, and what you're looking for in a roommate" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {/* Comfort Zone Plan Questions */}
                {activePlan === 'comfort' && (
                  <>
                    <div className="border-t border-gray-200 pt-6 mt-4">
                      <div className="bg-purple-50 p-4 rounded-lg mb-6 border border-purple-100">
                        <h2 className="text-lg font-semibold text-purple-700 mb-1 flex items-center">
                          <Coffee className="h-4 w-4 mr-2" />
                          Lifestyle Preferences
                        </h2>
                        <p className="text-sm text-purple-600">
                          These details will help us match you with roommates who have compatible living habits
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Age</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                  <Input className="pl-10" type="number" placeholder="25" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="occupation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Occupation</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                  <Input className="pl-10" placeholder="Student, Professional, etc." {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                        <FormField
                          control={form.control}
                          name="dietary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Dietary Preferences</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select dietary preference" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="no-restrictions">No Restrictions</SelectItem>
                                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                  <SelectItem value="vegan">Vegan</SelectItem>
                                  <SelectItem value="halal">Halal</SelectItem>
                                  <SelectItem value="kosher">Kosher</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="workSchedule"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Work Schedule</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select work schedule" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="regular">Regular Office Hours (9-5)</SelectItem>
                                  <SelectItem value="flexible">Flexible Hours</SelectItem>
                                  <SelectItem value="wfh">Work From Home</SelectItem>
                                  <SelectItem value="night">Night Shifts</SelectItem>
                                  <SelectItem value="student">Student Schedule</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                        <FormField
                          control={form.control}
                          name="cleanliness"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Cleanliness Preference</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select cleanliness level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="very-clean">Very Clean</SelectItem>
                                  <SelectItem value="moderately-clean">Moderately Clean</SelectItem>
                                  <SelectItem value="casual">Casual</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription className="text-xs">
                                How tidy do you generally keep your living space?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="social"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Social Preference</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select social style" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="social">Social/Outgoing</SelectItem>
                                  <SelectItem value="quiet">Quiet/Reserved</SelectItem>
                                  <SelectItem value="mixed">Mix of Both</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                        <FormField
                          control={form.control}
                          name="smoking"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Smoking Preference</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select smoking preference" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Smoker</SelectItem>
                                  <SelectItem value="no">Non-smoker</SelectItem>
                                  <SelectItem value="occasional">Occasional Smoker</SelectItem>
                                  <SelectItem value="outdoor-only">Outdoor Only</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="pets"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Pet Preference</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select pet preference" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Has Pets/Pet Friendly</SelectItem>
                                  <SelectItem value="no">No Pets/Not Pet Friendly</SelectItem>
                                  <SelectItem value="specific">Open to Specific Pets</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel className="font-medium">About You</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <HeartHandshake className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                                <Textarea 
                                  className="pl-10 min-h-24" 
                                  placeholder="Tell potential roommates about yourself, your interests, and what you're looking for in a roommate" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                
                {/* Elite Living Plan Questions */}
                {activePlan === 'elite' && (
                  <>
                    <div className="border-t border-gray-200 pt-6 mt-4">
                      <div className="bg-purple-50 p-4 rounded-lg mb-6 border border-purple-100">
                        <h2 className="text-lg font-semibold text-purple-700 mb-1 flex items-center">
                          <Coffee className="h-4 w-4 mr-2" />
                          Lifestyle Preferences
                        </h2>
                        <p className="text-sm text-purple-600">
                          These details will help us match you with roommates who have compatible living habits
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Age</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                  <Input className="pl-10" type="number" placeholder="25" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="occupation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Occupation</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                  <Input className="pl-10" placeholder="Student, Professional, etc." {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                        <FormField
                          control={form.control}
                          name="dietary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Dietary Preferences</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select dietary preference" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="no-restrictions">No Restrictions</SelectItem>
                                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                  <SelectItem value="vegan">Vegan</SelectItem>
                                  <SelectItem value="halal">Halal</SelectItem>
                                  <SelectItem value="kosher">Kosher</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="workSchedule"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Work Schedule</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select work schedule" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="regular">Regular Office Hours (9-5)</SelectItem>
                                  <SelectItem value="flexible">Flexible Hours</SelectItem>
                                  <SelectItem value="wfh">Work From Home</SelectItem>
                                  <SelectItem value="night">Night Shifts</SelectItem>
                                  <SelectItem value="student">Student Schedule</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                        <FormField
                          control={form.control}
                          name="cleanliness"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Cleanliness Preference</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select cleanliness level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="very-clean">Very Clean</SelectItem>
                                  <SelectItem value="moderately-clean">Moderately Clean</SelectItem>
                                  <SelectItem value="casual">Casual</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription className="text-xs">
                                How tidy do you generally keep your living space?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="social"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Social Preference</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select social style" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="social">Social/Outgoing</SelectItem>
                                  <SelectItem value="quiet">Quiet/Reserved</SelectItem>
                                  <SelectItem value="mixed">Mix of Both</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                        <FormField
                          control={form.control}
                          name="smoking"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Smoking Preference</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select smoking preference" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Smoker</SelectItem>
                                  <SelectItem value="no">Non-smoker</SelectItem>
                                  <SelectItem value="occasional">Occasional Smoker</SelectItem>
                                  <SelectItem value="outdoor-only">Outdoor Only</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="pets"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Pet Preference</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select pet preference" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Has Pets/Pet Friendly</SelectItem>
                                  <SelectItem value="no">No Pets/Not Pet Friendly</SelectItem>
                                  <SelectItem value="specific">Open to Specific Pets</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-4">
                      <div className="bg-amber-50 p-4 rounded-lg mb-6 border border-amber-100">
                        <h2 className="text-lg font-semibold text-amber-700 mb-1 flex items-center">
                          <Star className="h-4 w-4 mr-2" />
                          Personality & Preferences
                        </h2>
                        <p className="text-sm text-amber-600">
                          Advanced lifestyle and personality details for precise roommate matching
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="exercisePreference"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Exercise Preference</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select exercise preference" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="gym">Gym Enthusiast</SelectItem>
                                  <SelectItem value="running">Running</SelectItem>
                                  <SelectItem value="yoga">Yoga</SelectItem>
                                  <SelectItem value="sports">Sports</SelectItem>
                                  <SelectItem value="none">None</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="conflictStyle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Conflict Resolution Style</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select conflict resolution style" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="direct">Direct Communication</SelectItem>
                                  <SelectItem value="collaborative">Collaborative</SelectItem>
                                  <SelectItem value="compromise">Compromise</SelectItem>
                                  <SelectItem value="avoidance">Avoidance</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription className="text-xs">
                                How do you typically handle conflicts or disagreements?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                        <FormField
                          control={form.control}
                          name="noisePreference"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Noise Preference</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select noise preference" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="quiet">Quiet</SelectItem>
                                  <SelectItem value="moderate">Moderate</SelectItem>
                                  <SelectItem value="noisy">Noisy</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="relationshipStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Relationship Status (Optional)</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select relationship status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="single">Single</SelectItem>
                                  <SelectItem value="relationship">In a Relationship</SelectItem>
                                  <SelectItem value="married">Married</SelectItem>
                                  <SelectItem value="prefer-not">Prefer Not to Say</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                        <FormField
                          control={form.control}
                          name="lifestyleEnvironment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Living Space Style</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select living space style" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="minimalist">Clean/Minimalist</SelectItem>
                                  <SelectItem value="homey">Homey/Lived-in</SelectItem>
                                  <SelectItem value="artistic">Artistic/Creative</SelectItem>
                                  <SelectItem value="practical">Practical/Functional</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="techPreference"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Technology Preference</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select technology preference" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="smart-home">Smart Home Enthusiast</SelectItem>
                                  <SelectItem value="tech-savvy">Tech-Savvy</SelectItem>
                                  <SelectItem value="moderate">Moderate Tech User</SelectItem>
                                  <SelectItem value="minimal">Minimal Tech User</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="hobbies"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel className="font-medium">Hobbies & Interests</FormLabel>
                            <FormControl>
                              <Textarea 
                                className="min-h-20" 
                                placeholder="Share your hobbies and interests (e.g., reading, cooking, traveling, gaming, arts, etc.)" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel className="font-medium">About You</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <HeartHandshake className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                                <Textarea 
                                  className="pl-10 min-h-24" 
                                  placeholder="Tell potential roommates about yourself, your interests, and what you're looking for in a roommate" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                
                <Button 
                  type="submit" 
                  className={`w-full mt-6 ${
                    activePlan === 'basic' ? 'bg-blue-600 hover:bg-blue-700' : 
                    activePlan === 'comfort' ? 'bg-purple-600 hover:bg-purple-700' : 
                    'bg-amber-600 hover:bg-amber-700'
                  }`}
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Creating Profile..." : "Save Profile & Find Matches"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProfileCreation;
