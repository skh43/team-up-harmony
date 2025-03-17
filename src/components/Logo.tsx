
import React from 'react';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

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
          
          {/* Lightning bolt - replaced with Lucide Zap icon */}
          <span className="text-yellow-400 mx-0.5 transform rotate-12">
            <Zap size={size === 'small' ? 20 : size === 'medium' ? 28 : 42} strokeWidth={2.5} fill="currentColor" />
          </span>
          
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
