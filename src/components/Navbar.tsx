
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
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

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6",
        isScrolled 
          ? "bg-cream/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={closeMobileMenu}
        >
          <img 
            src="/lovable-uploads/e4df3d6b-dc7b-4688-98b7-a5bfcdd66c5a.png" 
            alt="Team Up Logo" 
            className="h-16 w-auto"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
          <NavLink to="/properties" active={location.pathname === "/properties"}>Properties</NavLink>
          <NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
          <div className="flex items-center space-x-4 ml-4">
            <Button asChild variant="ghost" size="sm" className="rounded-full px-4 text-team-blue hover:text-team-blue/80 hover:bg-team-blue/10">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full px-4 font-medium bg-team-orange hover:bg-team-orange/90 text-white">
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
              "block h-0.5 bg-foreground transition-all duration-300",
              isMobileMenuOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
            )} />
            <span className={cn(
              "block h-0.5 bg-foreground transition-all duration-300",
              isMobileMenuOpen ? "opacity-0" : "w-4"
            )} />
            <span className={cn(
              "block h-0.5 bg-foreground transition-all duration-300",
              isMobileMenuOpen ? "w-6 rotate-45 -translate-y-2" : "w-6"
            )} />
          </div>
        </button>
      </div>
      
      {/* Mobile Navigation Drawer */}
      <div 
        className={cn(
          "fixed inset-0 bg-cream/80 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
      >
        <div 
          className={cn(
            "absolute right-0 top-0 h-screen w-3/4 max-w-xs bg-white shadow-xl p-6 transition-transform duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-6 mt-16">
            <MobileNavLink to="/" onClick={closeMobileMenu}>Home</MobileNavLink>
            <MobileNavLink to="/properties" onClick={closeMobileMenu}>Properties</MobileNavLink>
            <MobileNavLink to="/about" onClick={closeMobileMenu}>About</MobileNavLink>
            <div className="pt-4 border-t border-border">
              <Button asChild variant="outline" size="sm" className="w-full justify-center mb-3 border-team-blue text-team-blue hover:bg-team-blue/10">
                <Link to="/login" onClick={closeMobileMenu}>Login</Link>
              </Button>
              <Button asChild size="sm" className="w-full justify-center bg-team-orange hover:bg-team-orange/90 text-white">
                <Link to="/register" onClick={closeMobileMenu}>Register</Link>
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
  children 
}: { 
  to: string; 
  active?: boolean; 
  children: React.ReactNode 
}) => (
  <Link 
    to={to} 
    className={cn(
      "text-sm font-medium transition-colors hover:text-team-blue",
      active ? "text-team-blue font-semibold" : "text-foreground/70"
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
  onClick?: () => void; 
  children: React.ReactNode 
}) => (
  <Link 
    to={to} 
    className="text-foreground/80 hover:text-team-blue text-lg font-medium transform transition-transform hover:translate-x-1"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
