
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
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* Tech pattern background */}
      <div className="absolute inset-0 tech-pattern opacity-10 pointer-events-none"></div>
      
      {/* Light grid lines */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxwYXRoIGQ9Ik0gODAgMCBMIDAgMCAwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzQjgyRjYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')] opacity-20 pointer-events-none"></div>
      
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-100/30 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-50/30 to-transparent pointer-events-none"></div>
      
      {/* Accent light spots */}
      <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-blue-100/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-indigo-100/20 blur-[120px] pointer-events-none"></div>
      
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
