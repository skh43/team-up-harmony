
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-accent/20">
      {!hideNavbar && <Navbar />}
      <main className={cn(
        "flex-1 w-full mx-auto p-4 sm:p-6 md:p-8 animate-fade-in",
        className
      )}>
        {content}
      </main>
    </div>
  );
};

export default MainLayout;
