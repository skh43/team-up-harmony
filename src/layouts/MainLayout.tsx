
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import { cn } from '@/lib/utils';
import AdComponent from '@/components/AdComponent';
import '@/components/AdStyles.css';
import Chatbot from '@/components/Chatbot';

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
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Enhanced subtle pattern background */}
      <div className="absolute inset-0 subtle-grid opacity-5 pointer-events-none"></div>
      
      {/* Refined grid lines */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxwYXRoIGQ9Ik0gODAgMCBMIDAgMCAwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wMyIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')] opacity-5 pointer-events-none"></div>
      
      {/* Subtle diamond pattern */}
      <div className="absolute inset-0 diamond-pattern opacity-5 pointer-events-none"></div>
      
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-elegant-50/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-elegant-50/10 to-transparent pointer-events-none"></div>
      
      {/* Subtle floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-elegant-100/5 to-elegant-300/5 animate-float pointer-events-none" style={{animationDelay: '0s'}}></div>
      <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-gradient-to-br from-elegant-200/5 to-elegant-400/5 animate-float pointer-events-none" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-elegant-100/5 to-elegant-300/5 animate-float pointer-events-none" style={{animationDelay: '2s'}}></div>
      
      {/* Accent light spots - very subtle */}
      <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-apple-light/3 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-apple-DEFAULT/3 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-apple-dark/3 blur-[150px] pointer-events-none"></div>
      
      {!hideNavbar && <Navbar />}

      {/* Top banner ad - improved styling */}
      <div className="w-full px-4 py-2 bg-white/80 backdrop-blur-sm border-b border-elegant-200/10">
        <AdComponent type="banner" isSpinning={true} />
      </div>
      
      <div className="flex flex-1 w-full mx-auto relative z-10">
        {/* Sidebar ad - enhanced styling */}
        <div className="hidden lg:block w-64 p-4 sticky top-20 h-screen">
          <AdComponent type="sidebar" className="sticky top-20 glass-card" />
        </div>
        
        <main className={cn(
          "flex-1 p-4 sm:p-6 md:p-8 animate-fade-in relative",
          className
        )}>
          {/* Back button - improved styling */}
          {!isIndexPage && (
            <div className="mb-6 mt-12">
              <BackButton className="hover:bg-elegant-100/60 backdrop-blur-md border border-elegant-200/10" />
            </div>
          )}
          
          {/* Main content */}
          {content}
          
          {/* Inline ad in the content - improved styling */}
          <div className="my-8">
            <AdComponent type="inline" />
          </div>
        </main>
      </div>
      
      {/* Footer ad space - improved styling */}
      <div className="w-full px-4 py-2 bg-white/80 backdrop-blur-sm border-t border-elegant-200/10">
        <AdComponent type="footer" />
      </div>

      {/* Chatbot component */}
      <Chatbot />
    </div>
  );
};

export default MainLayout;
