
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
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
  const isIndexPage = location.pathname === '/';
  
  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      {/* Tech pattern background */}
      <div className="absolute inset-0 tech-pattern opacity-10 pointer-events-none"></div>
      
      {/* Light grid lines */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxwYXRoIGQ9Ik0gODAgMCBMIDAgMCAwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzQjgyRjYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')] opacity-20 pointer-events-none"></div>
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none"></div>
      
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-100/30 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-50/30 to-transparent pointer-events-none"></div>
      
      {/* Animated floating shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 animate-float pointer-events-none" style={{animationDelay: '0s'}}></div>
      <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 animate-float pointer-events-none" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20 animate-float pointer-events-none" style={{animationDelay: '2s'}}></div>
      
      {/* Accent light spots */}
      <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-blue-100/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-purple-100/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-pink-100/20 blur-[150px] pointer-events-none"></div>
      
      {!hideNavbar && <Navbar />}
      <main className={cn(
        "flex-1 w-full mx-auto p-4 sm:p-6 md:p-8 animate-fade-in relative z-10",
        className
      )}>
        {/* Back button - only show on non-index pages, positioned below the animated circle */}
        {!isIndexPage && (
          <div className="mb-6 mt-12">
            <BackButton className="hover:bg-gray-100/80 backdrop-blur-sm" />
          </div>
        )}
        {content}
      </main>
    </div>
  );
};

export default MainLayout;
