
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import { Building, Home, Users, Languages, LogOut, Search, Globe, MapPin, Heart, Star, MessageCircle, Sparkles, User, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import ModernLogo from './ModernLogo';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);
const MotionLink = motion(Link);

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [animatedIcon, setAnimatedIcon] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300",
        scrolled 
          ? "bg-white/80 shadow-md border-b border-slate-200/60" 
          : "bg-gradient-to-r from-white/90 via-slate-50/90 to-white/90 border-b border-b-slate-200/30"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div 
          className="flex items-center space-x-6"
          variants={itemVariants}
        >
          <MotionLink 
            to="/" 
            className="flex items-center group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <ModernLogo 
              size="medium" 
              className="transition-all duration-300 group-hover:scale-105" 
              animated={true}
              variant="glow"
            />
          </MotionLink>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    "flex items-center gap-1.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-50 before:to-indigo-50 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:-z-10",
                    isActive('/living-plan-selection') ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-[#9b87f5]" : "text-gradient-primary"
                  )}
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
                  <span className={cn(
                    "font-medium",
                    isActive('/living-plan-selection') 
                      ? "text-[#9b87f5]" 
                      : "bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent"
                  )}>
                    Find Roommates
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100">
                    <li>
                      <NavigationMenuLink asChild>
                        <motion.a
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(245, 243, 255, 0.7)" }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAuthRequiredAction('/living-plan-selection');
                          }}
                          className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-purple-50 to-blue-50 p-6 no-underline outline-none focus:shadow-md cursor-pointer transition-all hover:shadow-lg"
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
                        </motion.a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <motion.a
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(243, 242, 255, 0.7)" }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAuthRequiredAction('/matches');
                          }}
                          className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-indigo-50 to-purple-50 p-6 no-underline outline-none focus:shadow-md cursor-pointer transition-all hover:shadow-lg"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium flex items-center gap-2">
                            <Star className="text-indigo-500" size={18} />
                            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                              View Your Matches
                            </span>
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            See who you've matched with
                          </p>
                        </motion.a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    "flex items-center gap-1.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-50 before:to-emerald-50 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:-z-10",
                    isActive('/properties') ? "bg-gradient-to-r from-orange-50 to-amber-50 text-[#F97316]" : "text-gradient-primary"
                  )}
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
                  <span className={cn(
                    "font-medium",
                    isActive('/properties') 
                      ? "text-[#F97316]" 
                      : "bg-gradient-to-r from-[#F97316] to-orange-500 bg-clip-text text-transparent"
                  )}>
                    Property Listings
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-orange-100">
                    <li>
                      <NavigationMenuLink asChild>
                        <motion.a
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 247, 237, 0.7)" }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAuthRequiredAction('/properties');
                          }}
                          className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-orange-50 to-amber-50 p-6 no-underline outline-none focus:shadow-md cursor-pointer transition-all hover:shadow-lg"
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
                        </motion.a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <motion.a
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(254, 249, 231, 0.7)" }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAuthRequiredAction('/list-property');
                          }}
                          className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-amber-50 to-yellow-50 p-6 no-underline outline-none focus:shadow-md cursor-pointer transition-all hover:shadow-lg"
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
                        </motion.a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <MotionLink 
                  to="/about" 
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "group relative overflow-hidden flex items-center gap-1.5 h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-50 before:to-sky-50 before:opacity-0 before:transition-opacity group-hover:before:opacity-100 before:-z-10",
                    isActive('/about') ? "bg-gradient-to-r from-blue-50 to-sky-50 text-[#0EA5E9]" : "hover:text-[#0EA5E9]"
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
                  <span className={cn(
                    "font-medium",
                    isActive('/about') 
                      ? "text-[#0EA5E9]" 
                      : "bg-gradient-to-r from-[#0EA5E9] to-sky-500 bg-clip-text text-transparent group-hover:text-transparent transition-colors"
                  )}>
                    About
                  </span>
                </MotionLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <MotionLink 
                  to="/contact" 
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "group relative overflow-hidden flex items-center gap-1.5 h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-50 to-emerald-50 before:opacity-0 before:transition-opacity group-hover:before:opacity-100 before:-z-10",
                    isActive('/contact') ? "bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-500" : "hover:text-emerald-500"
                  )}
                  onMouseEnter={() => setAnimatedIcon('contact')}
                  onMouseLeave={() => setAnimatedIcon(null)}
                >
                  <div className="relative">
                    <Mail 
                      size={18} 
                      className={cn(
                        "text-emerald-500 transition-all",
                        animatedIcon === 'contact' && "animate-pulse text-emerald-600"
                      )} 
                    />
                    <Sparkles 
                      size={10} 
                      className={cn(
                        "absolute -top-1 -right-1 text-yellow-400 opacity-0 transition-opacity",
                        animatedIcon === 'contact' && "opacity-100 animate-pulse"
                      )} 
                    />
                  </div>
                  <span className={cn(
                    "font-medium",
                    isActive('/contact') 
                      ? "text-emerald-500" 
                      : "bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent group-hover:text-transparent transition-colors"
                  )}>
                    Contact
                  </span>
                </MotionLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-4"
          variants={itemVariants}
        >
          <motion.div 
            className="hidden sm:flex items-center group relative overflow-hidden rounded-md px-3 py-1.5 before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-50 before:to-blue-50 before:opacity-0 before:transition-opacity group-hover:before:opacity-100 before:-z-10"
            whileHover={{ scale: 1.05 }}
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
          </motion.div>
          
          {isAuthenticated && user ? (
            <>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Avatar className="border-2 border-[#8B5CF6] p-0.5 transition-all hover:shadow-glow-sm">
                  <AvatarImage src={user.photoURL} alt={user.fullName || 'Avatar'} />
                  <AvatarFallback className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white">
                    {user.fullName?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              
              <MotionButton 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              </MotionButton>
            </>
          ) : (
            <>
              <MotionButton 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden transition-all duration-300 hover:shadow-md border-[#01CDFA] text-[#01CDFA] hover:text-white hover:bg-transparent before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-[#01CDFA] before:via-[#3DB2FF] before:to-[#516CF7] before:z-[-1] before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left"
              >
                <span className="flex items-center gap-1.5">
                  <User size={16} />
                  {t('common.login', 'Login')}
                </span>
              </MotionButton>
              
              <MotionButton 
                size="sm" 
                onClick={() => navigate('/register')}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(138, 92, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden transition-all duration-300 hover:shadow-md bg-gradient-to-r from-[#8563C9] via-[#A83ACB] to-[#ED2FC0] hover:from-[#A83ACB] hover:to-[#ED2FC0]"
              >
                <span className="flex items-center gap-1.5">
                  <Star size={16} className="text-yellow-200" />
                  {t('common.register', 'Register')}
                </span>
              </MotionButton>
            </>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
