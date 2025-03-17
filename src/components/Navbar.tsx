
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { useToast } from "@/components/ui/use-toast";

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
    // For demo purposes, we'll redirect to register page
    // In a real app, this would check if user is authenticated
    if (path === '/matching' || path === '/properties') {
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
          ? "bg-slate-900/80 backdrop-blur-md shadow-[0_0_15px_rgba(251,146,60,0.15)]" 
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
          <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
          <NavLink 
            to="#" 
            active={location.pathname === "/matching"}
            onClick={(e) => {
              e.preventDefault();
              handleProtectedNavigation('/matching');
            }}
          >
            Find Roommates
          </NavLink>
          <NavLink 
            to="#" 
            active={location.pathname === "/properties"}
            onClick={(e) => {
              e.preventDefault();
              handleProtectedNavigation('/properties');
            }}
          >
            Properties
          </NavLink>
          <NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
          
          <div className="flex items-center space-x-1">
            <Button asChild variant="ghost" size="sm" className="rounded-md px-4 text-orange-400 hover:text-orange-300 hover:bg-orange-900/40 border border-orange-500/0 hover:border-orange-500/30">
              <Link to="/login">Login</Link>
            </Button>
            <span className="text-slate-400">|</span>
            <Button asChild variant="link" size="sm" className="text-orange-400 hover:text-orange-300">
              <Link to="/register">Register</Link>
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
              "block h-0.5 bg-orange-400 transition-all duration-300",
              isMobileMenuOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
            )} />
            <span className={cn(
              "block h-0.5 bg-orange-400 transition-all duration-300",
              isMobileMenuOpen ? "opacity-0" : "w-4"
            )} />
            <span className={cn(
              "block h-0.5 bg-orange-400 transition-all duration-300",
              isMobileMenuOpen ? "w-6 rotate-45 -translate-y-2" : "w-6"
            )} />
          </div>
        </button>
      </div>
      
      {/* Mobile Navigation Drawer */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
      >
        <div 
          className={cn(
            "absolute right-0 top-0 h-screen w-3/4 max-w-xs bg-slate-900 border-l border-orange-500/20 shadow-[0_0_15px_rgba(251,146,60,0.15)] p-6 transition-transform duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-6 mt-16">
            <MobileNavLink to="/" onClick={closeMobileMenu}>Home</MobileNavLink>
            <MobileNavLink 
              to="#" 
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                handleProtectedNavigation('/matching');
              }}
            >
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
              Properties
            </MobileNavLink>
            <MobileNavLink to="/about" onClick={closeMobileMenu}>About</MobileNavLink>
            <div className="pt-4 border-t border-orange-500/20">
              <Button asChild variant="outline" size="sm" className="w-full justify-center mb-3 border-orange-400/50 text-orange-400 hover:bg-orange-900/40">
                <Link to="/login" onClick={closeMobileMenu}>Login</Link>
              </Button>
              <div className="text-xs text-center text-orange-200/60 my-2">
                Not a member yet?
              </div>
              <Button asChild size="sm" className="w-full justify-center bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white border border-orange-400/30">
                <Link to="/register" onClick={closeMobileMenu}>Register Now</Link>
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
      "text-sm font-medium transition-colors relative",
      active ? "text-orange-400 font-semibold" : "text-orange-100/70 hover:text-orange-300",
      "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-orange-400/70 after:w-0 hover:after:w-full after:transition-all after:duration-300"
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
    className="text-orange-100/80 hover:text-orange-400 text-lg font-medium transform transition-all hover:translate-x-1 hover:drop-shadow-[0_0_3px_rgba(251,146,60,0.7)]"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
