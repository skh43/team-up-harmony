import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import { Building, Home, Users, Languages, LogOut, Search, Globe, MapPin, Heart, Star, MessageCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import ModernLogo from './ModernLogo';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [animatedIcon, setAnimatedIcon] = useState<string | null>(null);

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
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 dark:border-b-slate-700 bg-gradient-to-r from-white via-slate-50 to-white backdrop-blur-sm dark:bg-slate-900 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center group">
            <ModernLogo size="medium" className="transition-all duration-300 group-hover:scale-105" />
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="flex items-center gap-1.5 text-gradient-primary relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-50 before:to-indigo-50 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:-z-10"
                  onMouseEnter={() => setAnimatedIcon('roommates')}
                  onMouseLeave={() => setAnimatedIcon(null)}
                >
                  <div className="relative">
                    <Users 
                      size={18} 
                      className={cn(
                        "text-[#9b87f5] transition-all",
                        animatedIcon === 'roommates' && "animate-pulse text-[#7E69AB]"
                      )} 
                    />
                    <Sparkles 
                      size={10} 
                      className={cn(
                        "absolute -top-1 -right-1 text-yellow-400 opacity-0 transition-opacity",
                        animatedIcon === 'roommates' && "opacity-100 animate-pulse"
                      )} 
                    />
                  </div>
                  <span className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent font-medium">
                    Find Roommates
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] bg-white/90 backdrop-blur-sm">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            handleAuthRequiredAction('/living-plan-selection');
                          }}
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-50 to-blue-50 p-6 no-underline outline-none focus:shadow-md cursor-pointer transition-all hover:shadow-lg hover:scale-[1.01]"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium flex items-center gap-2">
                            <Search className="text-[#9b87f5]" size={18} />
                            <span className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
                              Find a Roommate
                            </span>
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Start the roommate matching process
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="flex items-center gap-1.5 text-gradient-primary relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-50 before:to-emerald-50 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:-z-10"
                  onMouseEnter={() => setAnimatedIcon('properties')}
                  onMouseLeave={() => setAnimatedIcon(null)}
                >
                  <div className="relative">
                    <Building 
                      size={18} 
                      className={cn(
                        "text-[#F97316] transition-all",
                        animatedIcon === 'properties' && "animate-pulse text-orange-500"
                      )} 
                    />
                    <MapPin 
                      size={10} 
                      className={cn(
                        "absolute -top-1 -right-1 text-red-400 opacity-0 transition-opacity",
                        animatedIcon === 'properties' && "opacity-100 animate-pulse"
                      )} 
                    />
                  </div>
                  <span className="bg-gradient-to-r from-[#F97316] to-orange-500 bg-clip-text text-transparent font-medium">
                    Property Listings
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white/90 backdrop-blur-sm">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            handleAuthRequiredAction('/properties');
                          }}
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-orange-50 to-amber-50 p-6 no-underline outline-none focus:shadow-md cursor-pointer transition-all hover:shadow-lg hover:scale-[1.01]"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium flex items-center gap-2">
                            <Search className="text-[#F97316]" size={18} />
                            <span className="bg-gradient-to-r from-[#F97316] to-orange-500 bg-clip-text text-transparent">
                              Browse Properties
                            </span>
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
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-amber-50 to-yellow-50 p-6 no-underline outline-none focus:shadow-md cursor-pointer transition-all hover:shadow-lg hover:scale-[1.01]"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium flex items-center gap-2">
                            <Heart className="text-[#F97316]" size={18} />
                            <span className="bg-gradient-to-r from-[#F97316] to-orange-500 bg-clip-text text-transparent">
                              List Your Property
                            </span>
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
                  "group relative overflow-hidden flex items-center gap-1.5 h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-[#0EA5E9] focus:bg-accent focus:text-accent-foreground focus:outline-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-50 before:to-sky-50 before:opacity-0 before:transition-opacity group-hover:before:opacity-100 before:-z-10"
                )}
                onMouseEnter={() => setAnimatedIcon('about')}
                onMouseLeave={() => setAnimatedIcon(null)}
                >
                  <div className="relative">
                    <Home 
                      size={18} 
                      className={cn(
                        "text-[#0EA5E9] transition-all",
                        animatedIcon === 'about' && "animate-pulse text-sky-500"
                      )} 
                    />
                    <Star 
                      size={10} 
                      className={cn(
                        "absolute -top-1 -right-1 text-yellow-400 opacity-0 transition-opacity",
                        animatedIcon === 'about' && "opacity-100 animate-pulse"
                      )} 
                    />
                  </div>
                  <span className="bg-gradient-to-r from-[#0EA5E9] to-sky-500 bg-clip-text text-transparent font-medium group-hover:text-transparent transition-colors">
                    About
                  </span>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center group relative overflow-hidden rounded-md px-3 py-1.5 before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-50 before:to-blue-50 before:opacity-0 before:transition-opacity group-hover:before:opacity-100 before:-z-10"
            onMouseEnter={() => setAnimatedIcon('language')}
            onMouseLeave={() => setAnimatedIcon(null)}
          >
            <div className="relative mr-2">
              <Globe 
                size={18} 
                className={cn(
                  "text-[#D946EF] transition-all",
                  animatedIcon === 'language' && "animate-pulse text-fuchsia-500"
                )} 
              />
              <Languages 
                size={10} 
                className={cn(
                  "absolute -top-1 -right-1 text-indigo-400 opacity-0 transition-opacity",
                  animatedIcon === 'language' && "opacity-100 animate-pulse"
                )} 
              />
            </div>
            <span className="bg-gradient-to-r from-[#D946EF] to-fuchsia-500 bg-clip-text text-transparent font-medium">
              <LanguageSelector className="hidden sm:flex" />
            </span>
          </div>
          {isAuthenticated && user ? (
            <>
              <Avatar className="border-2 border-[#8B5CF6] p-0.5 transition-all hover:scale-110">
                <AvatarImage src={user.photoURL} alt={user.fullName || 'Avatar'} />
                <AvatarFallback className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white">
                  {user.fullName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="relative overflow-hidden rounded-full bg-white group hover:text-white transition-all duration-300 hover:border-[#D946EF]/50"
                onMouseEnter={() => setAnimatedIcon('logout')}
                onMouseLeave={() => setAnimatedIcon(null)}
              >
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] transition-all duration-300 ease-out group-hover:w-full -z-10"></span>
                <div className="flex items-center gap-1.5">
                  <LogOut 
                    size={16} 
                    className={cn(
                      "text-[#8B5CF6] group-hover:text-white transition-all",
                      animatedIcon === 'logout' && "animate-pulse text-[#D946EF]"
                    )} 
                  />
                  <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent group-hover:text-white transition-all">
                    {t('common.logout', 'Logout')}
                  </span>
                </div>
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
                <span className="flex items-center gap-1.5">
                  <MessageCircle size={16} />
                  {t('common.login', 'Login')}
                </span>
              </Button>
              <Button 
                size="sm" 
                onClick={() => navigate('/register')}
                className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-r from-[#8563C9] via-[#A83ACB] to-[#ED2FC0] hover:from-[#A83ACB] hover:to-[#ED2FC0]"
              >
                <span className="flex items-center gap-1.5">
                  <Star size={16} className="text-yellow-200" />
                  {t('common.register', 'Register')}
                </span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
