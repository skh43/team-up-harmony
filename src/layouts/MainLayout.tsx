
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children?: React.ReactNode;
  className?: string;
  hideNavbar?: boolean;
}

const MainLayout = ({ 
  children, 
  className,
  hideNavbar = false
}: MainLayoutProps) => {
  const location = useLocation();
  const content = children || <Outlet />;
  
  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] relative">
      {/* Tech pattern background */}
      <div className="absolute inset-0 tech-pattern opacity-10 pointer-events-none"></div>
      
      {/* Gradient accents */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
      
      {!hideNavbar && <Navbar />}
      <main className={cn(
        "flex-1 w-full mx-auto p-4 sm:p-6 md:p-8 animate-fade-in relative z-10",
        className
      )}>
        {content}
      </main>
    </div>
  );
};

export default MainLayout;
