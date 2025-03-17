
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true, className }) => {
  const sizeClasses = {
    small: { container: 'h-10', text: 'text-xl', tagline: 'text-sm' },
    medium: { container: 'h-12', text: 'text-3xl', tagline: 'text-sm' },
    large: { container: 'h-20', text: 'text-5xl', tagline: 'text-base' }
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="relative flex flex-col items-center">
        {/* Main logo container with team and up text */}
        <div className={cn("font-bold tracking-tight flex items-center", sizeClasses[size].text)}>
          {/* "team" part with cyan to blue gradient */}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#01CDFA] via-[#3DB2FF] to-[#516CF7]">team</span>
          
          {/* Lightning bolt SVG for exact match */}
          <div className="relative mx-0.5">
            <svg 
              viewBox="0 0 24 36" 
              className={cn(
                size === 'small' ? 'h-6 w-4' : 
                size === 'medium' ? 'h-8 w-5' : 
                'h-12 w-8'
              )}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M5 1L19 17H10L5 35L23 13H12L5 1Z" 
                fill="#FFD43B" 
                stroke="#FFD43B" 
                strokeWidth="0.5"
              />
            </svg>
          </div>
          
          {/* "up" part with purple to pink gradient */}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8563C9] via-[#A83ACB] to-[#ED2FC0]">up</span>
        </div>
        
        {/* Tagline */}
        {showText && (
          <span className={cn("text-blue-700 font-medium mt-0.5", sizeClasses[size].tagline)}>
            roommate discovery, simplified
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
