
import React, { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from '@/lib/utils';

interface AdComponentProps {
  type: 'banner' | 'sidebar' | 'inline' | 'footer';
  className?: string;
  isSpinning?: boolean;
}

/**
 * AdComponent - A reusable component for displaying advertisements
 * 
 * @param type - The type of ad to display (banner, sidebar, inline, footer)
 * @param className - Additional CSS classes
 * @param isSpinning - Whether to apply a spinning animation effect
 */
const AdComponent = ({ type, className, isSpinning = false }: AdComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate ad loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Configure ad dimensions based on type
  const adConfig = {
    banner: {
      width: 'w-full',
      height: 'h-24 md:h-32',
      text: 'Advertisement Banner'
    },
    sidebar: {
      width: 'w-full',
      height: 'h-[400px]',
      text: 'Sidebar Ad'
    },
    inline: {
      width: 'w-full',
      height: 'h-20 md:h-24',
      text: 'Inline Advertisement'
    },
    footer: {
      width: 'w-full',
      height: 'h-16 md:h-20',
      text: 'Footer Ad'
    }
  };
  
  const config = adConfig[type];
  
  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-md border border-gray-200 shadow-sm bg-white/60 backdrop-blur-sm', 
        config.width, 
        config.height,
        isSpinning && 'ad-spinning',
        className
      )}
    >
      {isLoading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <div className="flex items-center justify-center w-full h-full relative">
          <div className="absolute top-1 right-2 text-xs text-gray-400">Ad</div>
          <div className="text-gray-500 text-sm font-medium">{config.text}</div>
          
          {/* This is where actual ad content would be rendered */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-md w-[80%] h-[80%] flex items-center justify-center">
              <span className="text-sm text-blue-600 font-medium">Your Ad Here</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdComponent;
