
import React from 'react';
import { Home, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true, className }) => {
  const sizeClasses = {
    small: { container: 'h-12 w-12', text: 'text-lg' },
    medium: { container: 'h-16 w-16', text: 'text-xl' },
    large: { container: 'h-24 w-24', text: 'text-2xl' }
  };

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className={cn(
        'relative rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center',
        sizeClasses[size].container
      )}>
        <div className="absolute inset-0.5 rounded-full bg-slate-900 flex items-center justify-center">
          <div className="relative">
            <Home className={cn(
              'text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              size === 'small' ? 'w-5 h-5' : size === 'medium' ? 'w-7 h-7' : 'w-10 h-10'
            )} />
            <Users className={cn(
              'text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70',
              size === 'small' ? 'w-5 h-5' : size === 'medium' ? 'w-7 h-7' : 'w-10 h-10'
            )} />
          </div>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            'font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400',
            sizeClasses[size].text
          )}>
            TEAM UP
          </span>
          {size !== 'small' && (
            <span className="text-xs text-blue-300/70">Roommate Discovery, Simplified</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
