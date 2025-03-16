
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from './Logo';

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
          ? "bg-slate-900/80 backdrop-blur-md shadow-[0_0_15px_rgba(14,165,233,0.15)]" 
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
          <NavLink to="/matching" active={location.pathname === "/matching"}>Find Roommates</NavLink>
          <NavLink to="/properties" active={location.pathname === "/properties"}>Properties</NavLink>
          <NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
          <div className="flex flex-col items-end space-y-1 ml-4">
            <Button asChild variant="ghost" size="sm" className="rounded-md px-4 text-blue-400 hover:text-blue-300 hover:bg-blue-900/40 border border-blue-500/0 hover:border-blue-500/30">
              <Link to="/login">Login</Link>
            </Button>
            <span className="text-xs text-blue-200/60">
              Not a member yet? <Link to="/register" className="text-blue-400 hover:text-blue-300">Register now</Link>
            </span>
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
              "block h-0.5 bg-blue-400 transition-all duration-300",
              isMobileMenuOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
            )} />
            <span className={cn(
              "block h-0.5 bg-blue-400 transition-all duration-300",
              isMobileMenuOpen ? "opacity-0" : "w-4"
            )} />
            <span className={cn(
              "block h-0.5 bg-blue-400 transition-all duration-300",
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
            "absolute right-0 top-0 h-screen w-3/4 max-w-xs bg-slate-900 border-l border-blue-500/20 shadow-[0_0_15px_rgba(14,165,233,0.15)] p-6 transition-transform duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-6 mt-16">
            <MobileNavLink to="/" onClick={closeMobileMenu}>Home</MobileNavLink>
            <MobileNavLink to="/matching" onClick={closeMobileMenu}>Find Roommates</MobileNavLink>
            <MobileNavLink to="/properties" onClick={closeMobileMenu}>Properties</MobileNavLink>
            <MobileNavLink to="/about" onClick={closeMobileMenu}>About</MobileNavLink>
            <div className="pt-4 border-t border-blue-500/20">
              <Button asChild variant="outline" size="sm" className="w-full justify-center mb-3 border-blue-400/50 text-blue-400 hover:bg-blue-900/40">
                <Link to="/login" onClick={closeMobileMenu}>Login</Link>
              </Button>
              <div className="text-xs text-center text-blue-200/60 my-2">
                Not a member yet?
              </div>
              <Button asChild size="sm" className="w-full justify-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white border border-blue-400/30">
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
  children 
}: { 
  to: string; 
  active?: boolean; 
  children: React.ReactNode 
}) => (
  <Link 
    to={to} 
    className={cn(
      "text-sm font-medium transition-colors relative",
      active ? "text-blue-400 font-semibold" : "text-blue-100/70 hover:text-blue-300",
      "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-blue-400/70 after:w-0 hover:after:w-full after:transition-all after:duration-300"
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
    className="text-blue-100/80 hover:text-blue-400 text-lg font-medium transform transition-all hover:translate-x-1 hover:drop-shadow-[0_0_3px_rgba(59,130,246,0.7)]"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
