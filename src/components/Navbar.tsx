
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import { Building, Home, Users, LogOut, Search, Heart, User } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full bg-[#f8f9fa] border-b border-slate-200/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <ModernLogo size="medium" />
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <div className="relative group">
              <button 
                className={`flex items-center gap-2 text-gray-800 hover:text-blue-600 font-medium`}
                onClick={() => navigate('/living-plan-selection')}
                onMouseEnter={() => setHoverItem('roommates')}
                onMouseLeave={() => setHoverItem(null)}
              >
                <Users size={18} className="text-blue-600" />
                <span>Find Roommates</span>
                <span className={`ml-1 transition-transform ${hoverItem === 'roommates' ? 'rotate-180' : ''}`}>
                  {hoverItem === 'roommates' ? '▲' : '▼'}
                </span>
              </button>
              
              {hoverItem === 'roommates' && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                  <div 
                    className="p-3 hover:bg-blue-50 rounded-md transition cursor-pointer"
                    onClick={() => handleAuthRequiredAction('/living-plan-selection')}
                  >
                    <div className="flex items-center gap-2">
                      <Search size={18} className="text-blue-600" />
                      <span className="font-medium">Find a Roommate</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Start the roommate matching process</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative group">
              <button 
                className={`flex items-center gap-2 text-gray-800 hover:text-blue-600 font-medium`}
                onClick={() => navigate('/properties')}
                onMouseEnter={() => setHoverItem('properties')}
                onMouseLeave={() => setHoverItem(null)}
              >
                <Building size={18} className="text-blue-600" />
                <span>Property Listings</span>
                <span className={`ml-1 transition-transform ${hoverItem === 'properties' ? 'rotate-180' : ''}`}>
                  {hoverItem === 'properties' ? '▲' : '▼'}
                </span>
              </button>
              
              {hoverItem === 'properties' && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                  <div 
                    className="p-3 hover:bg-blue-50 rounded-md transition cursor-pointer mb-2"
                    onClick={() => handleAuthRequiredAction('/properties')}
                  >
                    <div className="flex items-center gap-2">
                      <Search size={18} className="text-blue-600" />
                      <span className="font-medium">Browse Properties</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Find available properties for you and your roommates</p>
                  </div>
                  
                  <div 
                    className="p-3 hover:bg-blue-50 rounded-md transition cursor-pointer"
                    onClick={() => handleAuthRequiredAction('/list-property')}
                  >
                    <div className="flex items-center gap-2">
                      <Heart size={18} className="text-blue-600" />
                      <span className="font-medium">List Your Property</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Add your property to our marketplace</p>
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              to="/about"
              className="flex items-center gap-2 text-gray-800 hover:text-blue-600 font-medium"
            >
              <Home size={18} className="text-blue-600" />
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
              <Avatar className="border-2 border-white shadow-sm">
                <AvatarImage src={user.photoURL} alt={user.fullName || 'Avatar'} />
                <AvatarFallback className="bg-blue-500 text-white">
                  {user.fullName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <MotionButton 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                whileHover={{ scale: 1.03 }}
                className="text-gray-700 border-gray-300"
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
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <span className="flex items-center gap-1.5">
                  <User size={16} />
                  Login
                </span>
              </MotionButton>
              
              <MotionButton 
                size="sm" 
                onClick={() => navigate('/register')}
                whileHover={{ scale: 1.03 }}
                className="bg-purple-600 hover:bg-purple-700 text-white"
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
