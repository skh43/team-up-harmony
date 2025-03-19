
import React, { useState, useEffect } from 'react';
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
import { useToast } from "@/hooks/use-toast";
import { User, Save, Building, Calendar, DollarSign, Clock, HeartHandshake, Users, Coffee, Star } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';

// Shared Schema (for all plans)
const sharedSchema = {
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
  bio: z.string().optional(),
};

// Basic Plan Schema
const basicProfileSchema = z.object({
  ...sharedSchema,
});

// Comfort Zone Plan Schema (extends Basic)
const comfortProfileSchema = z.object({
  ...sharedSchema,
  dietary: z.string().optional(),
  workSchedule: z.string().optional(),
  cleanliness: z.string().optional(),
  social: z.string().optional(),
  smoking: z.string().optional(),
  pets: z.string().optional(),
  roommateGender: z.string().optional(),
});

// Elite Living Plan Schema (extends Comfort)
const eliteProfileSchema = z.object({
  ...sharedSchema,
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
  exercisePreference: z.string().optional(),
  hobbies: z.string().optional(),
  conflictStyle: z.string().optional(),
  noisePreference: z.string().optional(),
  relationshipStatus: z.string().optional(),
  lifestyleEnvironment: z.string().optional(),
  techPreference: z.string().optional(),
});

// Union type for form values based on plan
type ProfileValues = z.infer<typeof eliteProfileSchema>;

const ProfileCreation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activePlan, setActivePlan] = useState<'basic' | 'comfort' | 'elite'>('basic');
  const [paymentVerified, setPaymentVerified] = useState(false);
  
  useEffect(() => {
    const selectedPlanTier = localStorage.getItem('planTier') as 'basic' | 'comfort' | 'elite' | null;
    const paymentComplete = localStorage.getItem('paymentComplete');
    
    console.log("Selected plan tier:", selectedPlanTier);
    console.log("Payment complete status:", paymentComplete);
    
    if (!selectedPlanTier) {
      navigate('/living-plan-selection');
      return;
    }
    
    if ((selectedPlanTier === 'comfort' || selectedPlanTier === 'elite') && paymentComplete !== 'true') {
      toast({
        title: "Payment Required",
        description: "Please complete the payment to access premium features",
        variant: "destructive",
      });
      navigate('/payment');
      return;
    }
    
    setActivePlan(selectedPlanTier);
    setPaymentVerified(true);
    
  }, [navigate, toast]);
  
  // Use the elite schema for the form since it's the most comprehensive
  const form = useForm<ProfileValues>({
    resolver: zodResolver(
      activePlan === 'basic' 
        ? basicProfileSchema 
        : activePlan === 'comfort' 
          ? comfortProfileSchema 
          : eliteProfileSchema
    ),
    defaultValues: {
      gender: "",
      budget: "",
      location: "",
      roomType: "",
      nationality: "",
      religion: "",
      bio: "",
      // Comfort Zone fields
      dietary: "",
      workSchedule: "",
      cleanliness: "",
      social: "",
      smoking: "",
      pets: "",
      roommateGender: "",
      // Elite fields
      age: "",
      occupation: "",
      lifestyle: "",
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
      console.log("Profile data:", data);
      console.log("Selected plan:", activePlan);
      
      toast({
        title: "Profile created successfully!",
        description: "Now let's find your matches.",
      });
      
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  // Basic Plan Form Content
  const renderBasicPlanContent = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="shadow-elegant border-0 overflow-hidden mb-10">
          <CardContent className="p-6 pt-6">
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
                <Button variant="secondary" size="sm" className="ml-2 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate('/living-plan-selection')}>
                  Subscribe Now
                </Button>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  variants={itemVariants}
                >
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
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  variants={itemVariants}
                >
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
                </motion.div>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  variants={itemVariants}
                >
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
                </motion.div>
                
                <motion.div variants={itemVariants}>
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
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Creating Profile..." : "Save Profile & Find Matches"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  // Comfort Zone Plan Form Content
  const renderComfortPlanContent = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="shadow-elegant border-0 overflow-hidden mb-10">
          <CardContent className="p-6 pt-6">
            <div className="bg-purple-50 p-4 rounded-lg mb-6 border border-purple-100">
              <h2 className="text-lg font-semibold text-purple-700 mb-1 flex items-center">
                <Coffee className="h-4 w-4 mr-2" />
                Comfort Zone
              </h2>
              <p className="text-sm text-purple-600">
                Enhanced matching with detailed lifestyle preferences for better roommate compatibility
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Plan Fields */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  variants={itemVariants}
                >
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
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  variants={itemVariants}
                >
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
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  variants={itemVariants}
                >
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
                </motion.div>

                {/* Additional Comfort Zone Fields */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  variants={itemVariants}
                >
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
                            <SelectItem value="no-preference">No Preference</SelectItem>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            <SelectItem value="halal">Halal</SelectItem>
                            <SelectItem value="kosher">Kosher</SelectItem>
                            <SelectItem value="gluten-free">Gluten-Free</SelectItem>
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
                        <FormLabel className="font-medium">Work/Study Schedule</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="pl-10">
                              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <SelectValue placeholder="Select schedule" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standard (9-5)</SelectItem>
                            <SelectItem value="evening">Evening/Night Shift</SelectItem>
                            <SelectItem value="flexible">Flexible Hours</SelectItem>
                            <SelectItem value="remote">Fully Remote</SelectItem>
                            <SelectItem value="hybrid">Hybrid (Part Remote)</SelectItem>
                            <SelectItem value="student">Student Schedule</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  variants={itemVariants}
                >
                  <FormField
                    control={form.control}
                    name="cleanliness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Cleanliness Level</FormLabel>
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
                            <SelectItem value="very-neat">Very Neat & Organized</SelectItem>
                            <SelectItem value="neat">Generally Neat</SelectItem>
                            <SelectItem value="average">Average</SelectItem>
                            <SelectItem value="relaxed">Relaxed About Cleaning</SelectItem>
                            <SelectItem value="messy">Comfortable With Mess</SelectItem>
                          </SelectContent>
                        </Select>
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
                              <SelectValue placeholder="Select social preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="very-social">Very Social (Friends Over Often)</SelectItem>
                            <SelectItem value="somewhat-social">Somewhat Social</SelectItem>
                            <SelectItem value="balanced">Balanced (Mix of Social/Private)</SelectItem>
                            <SelectItem value="private">Private (Keep to Myself)</SelectItem>
                            <SelectItem value="very-private">Very Private (Minimal Interaction)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  variants={itemVariants}
                >
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
                            <SelectItem value="yes">I smoke</SelectItem>
                            <SelectItem value="no">No smoking</SelectItem>
                            <SelectItem value="occasionally">Occasionally</SelectItem>
                            <SelectItem value="outside-only">Outside only</SelectItem>
                            <SelectItem value="no-preference">No preference</SelectItem>
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
                            <SelectItem value="has-pets">I have pets</SelectItem>
                            <SelectItem value="no-pets">No pets</SelectItem>
                            <SelectItem value="small-pets-only">Small pets only</SelectItem>
                            <SelectItem value="cats-only">Cats only</SelectItem>
                            <SelectItem value="dogs-only">Dogs only</SelectItem>
                            <SelectItem value="no-preference">No preference</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 gap-5"
                  variants={itemVariants}
                >
                  <FormField
                    control={form.control}
                    name="roommateGender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Preferred Roommate Gender (Optional)</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="no-preference">No Preference</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="same-gender">Same Gender as Me</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
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
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Creating Profile..." : "Save Profile & Find Matches"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  // Elite Living Plan Form Content
  const renderElitePlanContent = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="shadow-elegant border-0 overflow-hidden mb-10">
          <CardContent className="p-6 pt-6">
            <div className="bg-amber-50 p-4 rounded-lg mb-6 border border-amber-100">
              <h2 className="text-lg font-semibold text-amber-700 mb-1 flex items-center">
                <Star className="h-4 w-4 mr-2" />
                Elite Living
              </h2>
              <p className="text-sm text-amber-600">
                Premium experience with advanced personality matching for perfect roommate compatibility
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Basic Information</h3>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    variants={itemVariants}
                  >
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
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Age</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input className="pl-10" type="number" placeholder="Your age" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4"
                    variants={itemVariants}
                  >
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
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4"
                    variants={itemVariants}
                  >
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
                    
                    <FormField
                      control={form.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Occupation</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select occupation" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="employed">Employed Full-time</SelectItem>
                              <SelectItem value="part-time">Employed Part-time</SelectItem>
                              <SelectItem value="self-employed">Self-employed</SelectItem>
                              <SelectItem value="freelancer">Freelancer</SelectItem>
                              <SelectItem value="unemployed">Unemployed</SelectItem>
                              <SelectItem value="retired">Retired</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                {/* Lifestyle Preferences Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Lifestyle Preferences</h3>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    variants={itemVariants}
                  >
                    <FormField
                      control={form.control}
                      name="cleanliness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Cleanliness Level</FormLabel>
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
                              <SelectItem value="very-neat">Very Neat & Organized</SelectItem>
                              <SelectItem value="neat">Generally Neat</SelectItem>
                              <SelectItem value="average">Average</SelectItem>
                              <SelectItem value="relaxed">Relaxed About Cleaning</SelectItem>
                              <SelectItem value="messy">Comfortable With Mess</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
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
                              <SelectItem value="no-preference">No Preference</SelectItem>
                              <SelectItem value="vegetarian">Vegetarian</SelectItem>
                              <SelectItem value="vegan">Vegan</SelectItem>
                              <SelectItem value="halal">Halal</SelectItem>
                              <SelectItem value="kosher">Kosher</SelectItem>
                              <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4"
                    variants={itemVariants}
                  >
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
                                <SelectValue placeholder="Select social preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="very-social">Very Social (Friends Over Often)</SelectItem>
                              <SelectItem value="somewhat-social">Somewhat Social</SelectItem>
                              <SelectItem value="balanced">Balanced (Mix of Social/Private)</SelectItem>
                              <SelectItem value="private">Private (Keep to Myself)</SelectItem>
                              <SelectItem value="very-private">Very Private (Minimal Interaction)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
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
                              <SelectItem value="yes">I smoke</SelectItem>
                              <SelectItem value="no">No smoking</SelectItem>
                              <SelectItem value="occasionally">Occasionally</SelectItem>
                              <SelectItem value="outside-only">Outside only</SelectItem>
                              <SelectItem value="no-preference">No preference</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4"
                    variants={itemVariants}
                  >
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
                              <SelectItem value="has-pets">I have pets</SelectItem>
                              <SelectItem value="no-pets">No pets</SelectItem>
                              <SelectItem value="small-pets-only">Small pets only</SelectItem>
                              <SelectItem value="cats-only">Cats only</SelectItem>
                              <SelectItem value="dogs-only">Dogs only</SelectItem>
                              <SelectItem value="no-preference">No preference</SelectItem>
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
                          <FormLabel className="font-medium">Work/Study Schedule</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="pl-10">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <SelectValue placeholder="Select schedule" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="standard">Standard (9-5)</SelectItem>
                              <SelectItem value="evening">Evening/Night Shift</SelectItem>
                              <SelectItem value="flexible">Flexible Hours</SelectItem>
                              <SelectItem value="remote">Fully Remote</SelectItem>
                              <SelectItem value="hybrid">Hybrid (Part Remote)</SelectItem>
                              <SelectItem value="student">Student Schedule</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                {/* Elite Personality Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Personality Insights</h3>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    variants={itemVariants}
                  >
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
                              <SelectItem value="gym-enthusiast">Gym Enthusiast</SelectItem>
                              <SelectItem value="running">Running</SelectItem>
                              <SelectItem value="yoga">Yoga/Pilates</SelectItem>
                              <SelectItem value="team-sports">Team Sports</SelectItem>
                              <SelectItem value="casual">Casual Exercise</SelectItem>
                              <SelectItem value="none">Not Active</SelectItem>
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
                                <SelectValue placeholder="How do you handle conflicts?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="direct">Direct Confrontation</SelectItem>
                              <SelectItem value="diplomatic">Diplomatic Discussion</SelectItem>
                              <SelectItem value="compromise">Seek Compromise</SelectItem>
                              <SelectItem value="avoidant">Avoid Confrontation</SelectItem>
                              <SelectItem value="mediator">Prefer Third-Party Mediation</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4"
                    variants={itemVariants}
                  >
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
                              <SelectItem value="very-quiet">Very Quiet Environment</SelectItem>
                              <SelectItem value="quiet">Generally Quiet</SelectItem>
                              <SelectItem value="moderate">Moderate Noise Level</SelectItem>
                              <SelectItem value="energetic">Energetic Environment</SelectItem>
                              <SelectItem value="no-preference">No Preference</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lifestyleEnvironment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Preferred Living Environment</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Your ideal home environment" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="clean-minimal">Clean & Minimalist</SelectItem>
                              <SelectItem value="homey-comfortable">Homey & Comfortable</SelectItem>
                              <SelectItem value="stylish-trendy">Stylish & Trendy</SelectItem>
                              <SelectItem value="artistic-creative">Artistic & Creative</SelectItem>
                              <SelectItem value="practical-functional">Practical & Functional</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4"
                    variants={itemVariants}
                  >
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
                              <SelectItem value="prefer-not-to-say">Prefer Not to Say</SelectItem>
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
                                <SelectValue placeholder="Select tech preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="tech-enthusiast">Smart Home Enthusiast</SelectItem>
                              <SelectItem value="tech-comfortable">Comfortable with Tech</SelectItem>
                              <SelectItem value="tech-minimal">Minimal Tech User</SelectItem>
                              <SelectItem value="tech-averse">Prefer Less Technology</SelectItem>
                              <SelectItem value="no-preference">No Preference</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="hobbies"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel className="font-medium">Hobbies & Interests</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-24" 
                            placeholder="Tell us about your hobbies and interests (e.g., reading, cooking, gaming, sports, travel, etc.)" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          List a few hobbies or interests to help find roommates with similar pastimes.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
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
                              placeholder="Tell potential roommates about yourself, your personality, lifestyle, and what you're looking for in a roommate" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-amber-600 hover:bg-amber-700"
                    disabled={isLoading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Creating Profile..." : "Save Profile & Find Matches"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  // When the user needs to make payment first
  const renderPremiumPlanContent = (planType: 'comfort' | 'elite') => {
    if (paymentVerified) {
      return planType === 'comfort' ? renderComfortPlanContent() : renderElitePlanContent();
    }
    
    const iconClass = planType === 'comfort' ? 
      <Coffee className="h-12 w-12 text-purple-500 mx-auto mb-4" /> : 
      <Star className="h-12 w-12 text-amber-500 mx-auto mb-4" />;
    
    const titleText = planType === 'comfort' ? 'Comfort Zone Plan' : 'Elite Living Plan';
    const descriptionText = planType === 'comfort' ? 
      'Enhanced matching with detailed lifestyle preferences' : 
      'Premium experience with advanced personality matching';
    
    const bgColor = planType === 'comfort' ? 'text-purple-700' : 'text-amber-700';
    const textColor = planType === 'comfort' ? 'text-purple-600' : 'text-amber-600';
    const buttonColor = planType === 'comfort' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-amber-600 hover:bg-amber-700';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center p-8"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="mb-6">
            {iconClass}
            <h2 className={`text-2xl font-bold ${bgColor}`}>{titleText}</h2>
            <p className={`${textColor} mt-2`}>{descriptionText}</p>
          </div>
          
          <p className="mb-6 text-muted-foreground">
            Please complete the payment process to continue with the {planType === 'comfort' ? 'Comfort Zone' : 'Elite Living'} profile creation.
          </p>
          
          <Button 
            onClick={() => navigate('/payment')}
            className={`${buttonColor} mx-auto`}
            size="lg"
          >
            Continue to Payment
          </Button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <MainLayout className="flex min-h-screen py-10">
      <div className="w-full max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 mt-4"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Step 3 of 4
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Your Roommate Profile</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tell us about your preferences so we can find your ideal roommate match
          </p>
        </motion.div>
        
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {activePlan === 'basic' ? (
            <div className="w-full">
              {renderBasicPlanContent()}
            </div>
          ) : activePlan === 'comfort' ? (
            <div className="w-full">
              {renderPremiumPlanContent('comfort')}
            </div>
          ) : (
            <div className="w-full">
              {renderPremiumPlanContent('elite')}
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ProfileCreation;
