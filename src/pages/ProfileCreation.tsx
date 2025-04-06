
import React from 'react';
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
import { Briefcase, Clock, Flag, Users } from "lucide-react";
import BackButton from '@/components/BackButton';
import ModernLogo from '@/components/ModernLogo';
import { Checkbox } from '@/components/ui/checkbox';

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
  preferredNationalities: z.array(z.string()).optional(),
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
      preferredNationalities: [],
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
            name="preferredNationalities"
            render={() => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> Preferred Roommate Nationalities
                </FormLabel>
                <FormDescription>
                  Select nationalities you're open to living with.
                </FormDescription>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {['Indian', 'Pakistani'].map((nationality) => (
                    <FormField
                      key={nationality}
                      control={form.control}
                      name="preferredNationalities"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={nationality}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(nationality.toLowerCase())}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  const lowerNationality = nationality.toLowerCase();
                                  return checked
                                    ? field.onChange([...currentValues, lowerNationality])
                                    : field.onChange(
                                        currentValues.filter(
                                          (value) => value !== lowerNationality
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {nationality}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
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
