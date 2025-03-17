
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { User, Save, Building, Calendar, DollarSign, Clock, HeartHandshake } from "lucide-react";
import MainLayout from '@/layouts/MainLayout';

const profileSchema = z.object({
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18 && Number(val) <= 100, {
    message: "Age must be between 18 and 100",
  }),
  occupation: z.string().min(2, "Occupation is required"),
  nationality: z.string().min(2, "Nationality is required"),
  location: z.string().min(2, "Preferred location is required"),
  budget: z.string().min(2, "Budget range is required"),
  lifestyle: z.string().min(10, "Please describe your lifestyle"),
  bio: z.string().min(10, "Please tell us a bit about yourself"),
});

type ProfileValues = z.infer<typeof profileSchema>;

const ProfileCreation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      age: "",
      occupation: "",
      nationality: "",
      location: "",
      budget: "",
      lifestyle: "",
      bio: "",
    },
  });

  const onSubmit = async (data: ProfileValues) => {
    try {
      setIsLoading(true);
      // Simulate API call
      console.log("Profile data:", data);
      
      // Show success toast
      toast({
        title: "Profile created successfully!",
        description: "Now let's choose your path and living plan.",
      });
      
      // Update navigation to follow the sequence: profile -> path selection -> living plan -> matching
      setTimeout(() => {
        navigate("/path-selection");
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
    <MainLayout className="flex min-h-screen py-20">
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="text-center mb-12 mt-6">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Step 2 of 3
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Your Roommate Profile</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tell us about yourself so we can help find your ideal roommate match
          </p>
        </div>

        <Card className="shadow-elegant border-0 overflow-hidden">
          <CardContent className="p-6 pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Nationality</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder="Select your nationality" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="saudi">Saudi Arabian</SelectItem>
                            <SelectItem value="egyptian">Egyptian</SelectItem>
                            <SelectItem value="jordanian">Jordanian</SelectItem>
                            <SelectItem value="lebanese">Lebanese</SelectItem>
                            <SelectItem value="turkish">Turkish</SelectItem>
                            <SelectItem value="moroccan">Moroccan</SelectItem>
                            <SelectItem value="emirati">Emirati</SelectItem>
                            <SelectItem value="iranian">Iranian</SelectItem>
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
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Occupation</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input className="pl-10" placeholder="Software Engineer, Student, etc." {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                            <Input className="pl-10" placeholder="Riyadh, Jeddah, etc." {...field} />
                          </div>
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
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input className="pl-10" placeholder="SAR 1,500-2,000" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="lifestyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Lifestyle</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                          <Textarea 
                            className="pl-10 min-h-24" 
                            placeholder="Describe your lifestyle, habits, and preferences (e.g., early riser, non-smoker, etc.)" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">About You</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <HeartHandshake className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                          <Textarea 
                            className="pl-10 min-h-28" 
                            placeholder="Tell potential roommates about yourself, your interests, and what you're looking for" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 mt-4"
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
