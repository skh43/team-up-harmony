import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { useToast } from "@/components/ui/use-toast";
import { Home, Users, Building, Info, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const handleProtectedNavigation = (path: string) => {
    // For demo purposes, we'll redirect to register page with a redirect destination
    // In a real app, this would check if user is authenticated
    if (path === '/matching') {
      // Updated to direct users to living plan selection instead of path selection
      toast({
        title: "Find Roommates Flow",
        description: "Let's help you find the perfect roommate match!",
        variant: "default",
      });
      navigate('/register', { state: { redirectTo: '/living-plan-selection' } });
      return;
    }
    
    if (path === '/properties') {
      toast({
        title: "Authentication Required",
        description: "Please register or login to access this feature.",
        variant: "default",
      });
      navigate('/register');
      return;
    }
    
    navigate(path);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6",
        isScrolled 
          ? "bg-white/85 backdrop-blur-md shadow-[0_0_20px_rgba(124,58,237,0.2)]" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="group"
          onClick={closeMobileMenu}
        >
          <Logo size="medium" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === "/"}>
            <Home className="mr-1.5 h-[18px] w-[18px] transition-transform group-hover:scale-110" />
            <span>Home</span>
          </NavLink>
          <NavLink 
            to="#" 
            active={location.pathname === "/matching"}
            onClick={(e) => {
              e.preventDefault();
              handleProtectedNavigation('/matching');
            }}
          >
            <Users className="mr-1.5 h-[18px] w-[18px] transition-transform group-hover:scale-110" />
            <span>Find Roommates</span>
          </NavLink>
          <NavLink 
            to="#" 
            active={location.pathname === "/properties"}
            onClick={(e) => {
              e.preventDefault();
              handleProtectedNavigation('/properties');
            }}
          >
            <Building className="mr-1.5 h-[18px] w-[18px] transition-transform group-hover:scale-110" />
            <span>Properties</span>
          </NavLink>
          <NavLink to="/about" active={location.pathname === "/about"}>
            <Info className="mr-1.5 h-[18px] w-[18px] transition-transform group-hover:scale-110" />
            <span>About</span>
          </NavLink>
          
          <div className="flex items-center ml-6 space-x-3">
            <Button asChild variant="ghost" size="sm" 
              className="rounded-full px-5 text-blue-500 hover:text-blue-600 hover:bg-blue-50/80 border border-blue-200/0 hover:border-blue-200/80 transition-all duration-300 shadow-none hover:shadow-sm">
              <Link to="/login" className="flex items-center">
                <LogIn className="mr-1.5 h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button asChild variant="default" size="sm" 
              className="ml-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-5 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
              <Link to="/register" className="flex items-center">
                <UserPlus className="mr-1.5 h-4 w-4" />
                Register
              </Link>
            </Button>
          </div>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 rounded-md"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 flex flex-col items-end gap-1.5">
            <span className={cn(
              "block h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300",
              isMobileMenuOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
            )} />
            <span className={cn(
              "block h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300",
              isMobileMenuOpen ? "opacity-0" : "w-4"
            )} />
            <span className={cn(
              "block h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300",
              isMobileMenuOpen ? "w-6 rotate-45 -translate-y-2" : "w-6"
            )} />
          </div>
        </button>
      </div>
      
      {/* Mobile Navigation Drawer */}
      <div 
        className={cn(
          "fixed inset-0 bg-white/90 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
      >
        <div 
          className={cn(
            "absolute right-0 top-0 h-screen w-3/4 max-w-xs bg-gradient-to-b from-white to-blue-50/80 border-l border-blue-100/50 shadow-[0_0_25px_rgba(59,130,246,0.2)] p-6 transition-transform duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-6 mt-16">
            <MobileNavLink to="/" onClick={closeMobileMenu}>
              <Home className="mr-2.5 h-5 w-5" />
              Home
            </MobileNavLink>
            <MobileNavLink 
              to="#" 
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                handleProtectedNavigation('/matching');
              }}
            >
              <Users className="mr-2.5 h-5 w-5" />
              Find Roommates
            </MobileNavLink>
            <MobileNavLink 
              to="#" 
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                handleProtectedNavigation('/properties');
              }}
            >
              <Building className="mr-2.5 h-5 w-5" />
              Properties
            </MobileNavLink>
            <MobileNavLink to="/about" onClick={closeMobileMenu}>
              <Info className="mr-2.5 h-5 w-5" />
              About
            </MobileNavLink>
            <div className="pt-5 border-t border-blue-100">
              <Button asChild variant="outline" size="sm" className="w-full justify-center mb-3 border-blue-200 text-blue-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
                <Link to="/login" onClick={closeMobileMenu} className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <div className="text-xs text-center text-blue-500/70 my-2">
                Not a member yet?
              </div>
              <Button asChild size="sm" className="w-full justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md">
                <Link to="/register" onClick={closeMobileMenu} className="flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Desktop Nav Link
const NavLink = ({ 
  to, 
  active, 
  children,
  onClick
}: { 
  to: string; 
  active?: boolean; 
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={cn(
      "group flex items-center text-sm font-medium transition-colors relative py-1.5 px-2",
      active 
        ? "text-blue-600"
        : "text-blue-900/70 hover:text-blue-600",
      "after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-gradient-to-r after:from-blue-400 after:via-blue-600 after:to-purple-600 after:w-0 hover:after:w-full after:transition-all after:duration-300"
    )}
  >
    {children}
  </Link>
);

// Mobile Nav Link
const MobileNavLink = ({ 
  to, 
  onClick, 
  children 
}: { 
  to: string; 
  onClick?: (e: React.MouseEvent) => void; 
  children: React.ReactNode 
}) => (
  <Link 
    to={to} 
    className="flex items-center text-blue-800 hover:text-blue-600 text-lg font-medium transform transition-all hover:translate-x-1"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
