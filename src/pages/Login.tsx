
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import MainLayout from '@/layouts/MainLayout';
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success toast
    toast({
      title: "Login successful!",
      description: "Welcome back!",
    });
    
    // Navigate directly to the properties page
    setTimeout(() => {
      navigate('/properties');
    }, 500);
  };

  const handleGoogleLogin = () => {
    // For now, this is just a simulation
    toast({
      title: "Google Authentication",
      description: "Redirecting to Google...",
    });
    
    // Simulate auth delay
    setTimeout(() => {
      toast({
        title: "Login successful!",
        description: "Authenticated with Google",
      });
      navigate('/properties');
    }, 1500);
  };

  return (
    <MainLayout className="flex items-center justify-center min-h-screen py-20">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <Card className="border-cyan-500/10">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleGoogleLogin}
              variant="outline" 
              size="lg"
              className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
            >
              <FaGoogle className="text-red-500" />
              <span>Sign in with Google</span>
            </Button>
            
            <div className="relative my-6">
              <Separator />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-xs text-muted-foreground">
                OR
              </span>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button type="button" variant="link" className="text-xs text-cyan-500 h-auto p-0">
                      Forgot password?
                    </Button>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  Sign In
                </Button>
              </div>
            </form>
            
            <div className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <Button type="button" variant="link" className="p-0 h-auto text-blue-500" onClick={() => navigate('/register')}>
                Sign up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
