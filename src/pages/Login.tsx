
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import MainLayout from '@/layouts/MainLayout';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to home page
    navigate('/');
  };

  return (
    <MainLayout className="flex items-center justify-center min-h-screen py-20">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/e4df3d6b-dc7b-4688-98b7-a5bfcdd66c5a.png" 
            alt="Team Up Logo" 
            className="h-24 w-auto mx-auto mb-6" 
          />
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your Team Up account</p>
        </div>

        <Card className="border-team-blue/10">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button type="button" variant="link" className="text-xs text-team-blue h-auto p-0">
                    Forgot password?
                  </Button>
                </div>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full bg-team-orange hover:bg-team-orange/90">
                Sign In
              </Button>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{' '}
                <Button type="button" variant="link" className="p-0 h-auto text-team-blue" onClick={() => navigate('/register')}>
                  Sign up
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
