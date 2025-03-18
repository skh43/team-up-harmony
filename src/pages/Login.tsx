
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import MainLayout from '@/layouts/MainLayout';
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
import { LoaderCircle } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/LanguageSelector';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, loginWithGoogle, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      
      toast({
        title: t('login.success'),
        description: t('login.welcomeBack'),
      });
      
      navigate('/dashboard');
    } catch (err) {
      console.error("Login error:", err);
      setError(t('validation.invalidCredentials'));
      toast({
        title: t('login.failed'),
        description: t('validation.invalidCredentials'),
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      
      toast({
        title: t('login.success'),
        description: t('login.authenticatedWithGoogle'),
      });
      // Navigation is handled in the loginWithGoogle method
    } catch (err) {
      console.error("Google login error:", err);
      toast({
        title: t('login.googleFailed'),
        description: t('login.googleAuthError'),
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout className="flex items-center justify-center min-h-screen py-20">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{t('common.welcome')}</h1>
          <p className="text-muted-foreground mt-2">{t('login.subtitle')}</p>
        </div>

        <div className="mb-4 flex justify-center">
          <LanguageSelector />
        </div>

        <Card className="border-cyan-500/10">
          <CardHeader>
            <CardTitle>{t('common.login')}</CardTitle>
            <CardDescription>{t('login.credentials')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleGoogleLogin}
              variant="outline" 
              size="lg"
              className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <FaGoogle className="text-red-500" />
              )}
              <span>{t('common.withGoogle')}</span>
            </Button>
            
            <div className="relative my-6">
              <Separator />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-xs text-muted-foreground">
                {t('common.or', 'OR')}
              </span>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">{t('common.email')}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t('common.password')}</Label>
                    <Button type="button" variant="link" className="text-xs text-cyan-500 h-auto p-0">
                      {t('common.forgotPassword')}
                    </Button>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      {t('common.signingIn')}
                    </>
                  ) : (
                    t('common.signIn')
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-4 text-center text-sm">
              {t('common.noAccount')}{' '}
              <Button type="button" variant="link" className="p-0 h-auto text-blue-500" onClick={() => navigate('/register')}>
                {t('common.signUp')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
