
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
        {/* Logo text with gradient */}
        <div className={cn("font-bold tracking-tight flex items-center", sizeClasses[size].text)}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600">team</span>
          
          {/* Lightning bolt */}
          <svg 
            className="text-yellow-400 h-full mx-0.5" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            style={{ transform: 'rotate(15deg)' }}
          >
            <path d="M13 9h8L11 24v-9H4l9-15v9z" />
          </svg>
          
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">up</span>
        </div>
        
        {/* Tagline */}
        {showText && (
          <span className={cn("text-blue-600 font-medium", sizeClasses[size].tagline)}>
            roommate discovery, simplified
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
