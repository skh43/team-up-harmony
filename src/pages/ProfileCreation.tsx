
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
import { useToast } from "@/components/ui/use-toast";
import { User, Save, Building, Calendar, DollarSign, Clock, HeartHandshake, Users, Coffee, Star } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { TabView, TabsContent } from '@/components/ui/tab-view';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  
  useEffect(() => {
    // Get the selected tier from localStorage
    const selectedPlanTier = localStorage.getItem('planTier');
    
    if (selectedPlanTier && (selectedPlanTier === 'basic' || selectedPlanTier === 'comfort' || selectedPlanTier === 'elite')) {
      setActivePlan(selectedPlanTier);
    }
  }, []);
  
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

  const handlePlanChange = (plan: string) => {
    if (plan === 'basic') {
      setActivePlan('basic');
      // Update localStorage to match the new selection
      localStorage.setItem('planTier', 'basic');
    } else if (plan === 'comfort' || plan === 'elite') {
      // Update localStorage before navigating
      localStorage.setItem('planTier', plan as 'comfort' | 'elite');
      navigate('/payment');
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

  const getFormattedPlanName = (plan: string) => {
    switch (plan) {
      case 'basic': return 'Basic Living';
      case 'comfort': return 'Comfort Zone';
      case 'elite': return 'Elite Living';
      default: return '';
    }
  };

  const getPlanDescription = (plan: string) => {
    switch (plan) {
      case 'basic': return 'Essential roommate matching with basic preferences';
      case 'comfort': return 'Enhanced matching with lifestyle preferences';
      case 'elite': return 'Premium experience with advanced personality matching';
      default: return '';
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'basic': return <Users className="h-4 w-4" />;
      case 'comfort': return <Coffee className="h-4 w-4" />;
      case 'elite': return <Star className="h-4 w-4" />;
      default: return null;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'basic': return 'blue';
      case 'comfort': return 'purple';
      case 'elite': return 'amber';
      default: return '';
    }
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
          <TabView
            defaultValue={activePlan}
            onValueChange={handlePlanChange}
            tabs={[
              { value: 'basic', label: 'Basic Living', icon: <Users className="h-4 w-4" />, color: 'blue' },
              { value: 'comfort', label: 'Comfort Zone', icon: <Coffee className="h-4 w-4" />, color: 'purple' },
              { value: 'elite', label: 'Elite Living', icon: <Star className="h-4 w-4" />, color: 'amber' }
            ]}
          >
            <TabsContent value="basic">
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
            </TabsContent>

            <TabsContent value="comfort">
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
                    <Coffee className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-purple-700">Comfort Zone Plan</h2>
                    <p className="text-purple-600 mt-2">Enhanced matching with detailed lifestyle preferences</p>
                  </div>
                  
                  <p className="mb-6 text-muted-foreground">
                    Please complete the payment process to continue with the Comfort Zone profile creation.
                  </p>
                  
                  <Button 
                    onClick={() => navigate('/payment')}
                    className="bg-purple-600 hover:bg-purple-700 mx-auto"
                    size="lg"
                  >
                    Continue to Payment
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="elite">
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
                    <Star className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-amber-700">Elite Living Plan</h2>
                    <p className="text-amber-600 mt-2">Premium experience with advanced personality matching</p>
                  </div>
                  
                  <p className="mb-6 text-muted-foreground">
                    Please complete the payment process to continue with the Elite Living profile creation.
                  </p>
                  
                  <Button 
                    onClick={() => navigate('/payment')}
                    className="bg-amber-600 hover:bg-amber-700 mx-auto"
                    size="lg"
                  >
                    Continue to Payment
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>
          </TabView>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ProfileCreation;
