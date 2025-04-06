
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import { Building, Home, Users, LogOut, Search, Heart, User, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import ModernLogo from './ModernLogo';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [hoverItem, setHoverItem] = useState<string | null>(null);

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

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-elegant-200/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <ModernLogo size="medium" variant="default" />
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <div className="relative group">
              <button 
                className={`flex items-center gap-2 text-elegant-500 hover:text-elegant-700 font-medium`}
                onClick={() => navigate('/living-plan-selection')}
                onMouseEnter={() => setHoverItem('roommates')}
                onMouseLeave={() => setHoverItem(null)}
              >
                <Users size={18} className="text-primary" />
                <span>Find Roommates</span>
                <span className={`ml-1 transition-transform ${hoverItem === 'roommates' ? 'rotate-180' : ''}`}>
                  {hoverItem === 'roommates' ? '▲' : '▼'}
                </span>
              </button>
              
              {hoverItem === 'roommates' && (
                <div className="absolute left-0 mt-2 w-64 bg-background rounded-lg shadow-md p-4 border border-elegant-200/20">
                  <div 
                    className="p-3 hover:bg-secondary rounded-md transition cursor-pointer"
                    onClick={() => handleAuthRequiredAction('/living-plan-selection')}
                  >
                    <div className="flex items-center gap-2">
                      <Search size={18} className="text-primary" />
                      <span className="font-medium text-foreground">Find a Roommate</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Start the roommate matching process</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative group">
              <button 
                className={`flex items-center gap-2 text-elegant-500 hover:text-elegant-700 font-medium`}
                onClick={() => navigate('/properties')}
                onMouseEnter={() => setHoverItem('properties')}
                onMouseLeave={() => setHoverItem(null)}
              >
                <Building size={18} className="text-primary" />
                <span>Property Listings</span>
                <span className={`ml-1 transition-transform ${hoverItem === 'properties' ? 'rotate-180' : ''}`}>
                  {hoverItem === 'properties' ? '▲' : '▼'}
                </span>
              </button>
              
              {hoverItem === 'properties' && (
                <div className="absolute left-0 mt-2 w-64 bg-background rounded-lg shadow-md p-4 border border-elegant-200/20">
                  <div 
                    className="p-3 hover:bg-secondary rounded-md transition cursor-pointer mb-2"
                    onClick={() => handleAuthRequiredAction('/properties')}
                  >
                    <div className="flex items-center gap-2">
                      <Search size={18} className="text-primary" />
                      <span className="font-medium text-foreground">Browse Properties</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Find available properties for you and your roommates</p>
                  </div>
                  
                  <div 
                    className="p-3 hover:bg-secondary rounded-md transition cursor-pointer"
                    onClick={() => handleAuthRequiredAction('/list-property')}
                  >
                    <div className="flex items-center gap-2">
                      <Heart size={18} className="text-primary" />
                      <span className="font-medium text-foreground">List Your Property</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Add your property to our marketplace</p>
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              to="/about"
              className="flex items-center gap-2 text-elegant-500 hover:text-elegant-700 font-medium"
            >
              <Home size={18} className="text-primary" />
              <span>About</span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center">
            <LanguageSelector className="mr-4" />
          </div>
          
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3">
              <MotionButton 
                variant="apple" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                whileHover={{ scale: 1.03 }}
                className="text-primary-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <LayoutDashboard size={16} />
                  Dashboard
                </span>
              </MotionButton>

              <Avatar className="border-2 border-elegant-200/50 shadow-md">
                <AvatarImage src={user.photoURL} alt={user.fullName || 'Avatar'} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.fullName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <MotionButton 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                whileHover={{ scale: 1.03 }}
                className="text-muted-foreground border-elegant-200/30 hover:bg-secondary"
              >
                <span className="flex items-center gap-1.5">
                  <LogOut size={16} />
                  Logout
                </span>
              </MotionButton>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <MotionButton 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.03 }}
              >
                <span className="flex items-center gap-1.5">
                  <User size={16} />
                  Login
                </span>
              </MotionButton>
              
              <MotionButton 
                variant="apple" 
                size="sm" 
                onClick={() => navigate('/register')}
                whileHover={{ scale: 1.03 }}
                animation="glow"
              >
                Register
              </MotionButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
