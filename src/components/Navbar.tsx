
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import { Building, Home, Users, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAuthRequiredAction = (path: string) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      toast({
        title: "Authentication Required",
        description: "Please login or register to access this feature.",
        variant: "destructive",
      });
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/public/lovable-uploads/f6a689e5-9dc4-44c7-a958-19de3d72db76.png" 
              alt="TeamUp Logo" 
              className="h-10 w-auto"
            />
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-1">
                  <Users size={16} />
                  Find Roommates
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            handleAuthRequiredAction('/living-plan-selection');
                          }}
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Find a Roommate
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Start the roommate matching process
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            handleAuthRequiredAction('/matching');
                          }}
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            View Matches
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Browse your current roommate matches
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-1">
                  <Building size={16} />
                  Property Listings
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            handleAuthRequiredAction('/properties');
                          }}
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Browse Properties
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Find available properties for you and your roommates
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            handleAuthRequiredAction('/list-property');
                          }}
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            List Your Property
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Add your property to our marketplace
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/about" className={cn(
                  "flex items-center gap-1 h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                )}>
                  <Home size={16} />
                  About
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center">
            <Languages size={16} className="mr-2" />
            <LanguageSelector className="hidden sm:flex" />
          </div>
          {isAuthenticated && user ? (
            <>
              <Avatar>
                <AvatarImage src={user.photoURL} alt={user.fullName || 'Avatar'} />
                <AvatarFallback>{user.fullName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                {t('common.logout', 'Logout')}
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/login')}
                className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md border-[#01CDFA] text-[#01CDFA] hover:text-white hover:bg-transparent before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-[#01CDFA] before:via-[#3DB2FF] before:to-[#516CF7] before:z-[-1] before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left"
              >
                {t('common.login', 'Login')}
              </Button>
              <Button 
                size="sm" 
                onClick={() => navigate('/register')}
                className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-r from-[#8563C9] via-[#A83ACB] to-[#ED2FC0] hover:from-[#A83ACB] hover:to-[#ED2FC0]"
              >
                {t('common.register', 'Register')}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
