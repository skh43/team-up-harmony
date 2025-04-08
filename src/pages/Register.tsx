import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight, ArrowLeft, Mail, Lock, User, Phone, Check, LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from '@/hooks/useAuth';

const registerSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { register, registerWithGoogle, isLoading } = useAuth();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await register(data.email, data.password, {
        fullName: data.fullName,
        phone: data.phone
      });
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created.",
      });
      
      navigate("/living-plan-selection");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    form.trigger(["fullName", "email", "phone"]).then((isValid) => {
      if (isValid) {
        setStep(2);
      }
    });
  };
  
  const prevStep = () => {
    setStep(1);
  };

  const handleGoogleSignup = async () => {
    try {
      await registerWithGoogle();
      
      toast({
        title: "Registration successful!",
        description: "Account created with Google",
      });
    } catch (error) {
      console.error("Google registration error:", error);
      toast({
        title: "Registration failed",
        description: "There was an error creating your account with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="mb-12 mt-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-muted-foreground">
            Join to find your perfect roommate match
          </p>
        </div>

        <Card className="shadow-subtle border-0 overflow-hidden">
          <CardContent className="p-6">
            {step === 1 && (
              <div className="mb-6">
                <Button 
                  onClick={handleGoogleSignup}
                  variant="outline" 
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 mb-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <FaGoogle className="text-red-500" />
                  )}
                  <span>Sign up with Google</span>
                </Button>
                
                <div className="relative my-4">
                  <Separator />
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-xs text-muted-foreground">
                    OR CONTINUE WITH EMAIL
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <StepIndicator step={1} currentStep={step} label="Account" />
              <div className="w-6 h-px bg-muted" />
              <StepIndicator step={2} currentStep={step} label="Password" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input className="pl-10" placeholder="John Doe" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input className="pl-10" placeholder="name@example.com" type="email" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input className="pl-10" placeholder="+966 xx xxx xxxx" type="tel" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="button" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={nextStep}
                      disabled={isLoading}
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input className="pl-10" type="password" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input className="pl-10" type="password" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 mt-6">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevStep} 
                        className="flex-1"
                        disabled={isLoading}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-center p-6 border-t bg-secondary/20">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-500 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  label: string;
}

const StepIndicator = ({ step, currentStep, label }: StepIndicatorProps) => {
  const isCompleted = currentStep > step;
  const isActive = currentStep === step;

  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 border-2 transition-colors duration-300",
          isCompleted ? 
            "bg-purple-600 border-purple-600" : 
            isActive ? 
              "bg-purple-600 border-purple-600" : 
              "bg-muted border-muted text-foreground"
        )}
      >
        {isCompleted ? <Check className="h-5 w-5" /> : step}
      </div>
      <span className={cn(
        "text-xs font-medium",
        isActive || isCompleted ? "text-purple-600" : "text-muted-foreground"
      )}>
        {label}
      </span>
    </div>
  );
};

export default Register;
