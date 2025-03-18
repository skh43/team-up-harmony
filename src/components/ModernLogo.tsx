
import React from 'react';
import { Zap, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModernLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  animated?: boolean;
}

const ModernLogo: React.FC<ModernLogoProps> = ({ 
  size = 'medium', 
  className,
  animated = true
}) => {
  const sizeClasses = {
    small: { container: 'h-8', text: 'text-lg', iconSize: 14 },
    medium: { container: 'h-12', text: 'text-2xl', iconSize: 18 },
    large: { container: 'h-16', text: 'text-3xl', iconSize: 24 },
    xlarge: { container: 'h-20', text: 'text-4xl', iconSize: 32 }
  };

  return (
    <div className={cn("flex items-center gap-1.5", sizeClasses[size].container, className)}>
      {/* Logo Icon Container */}
      <div className="relative">
        {/* Subtle background blur */}
        <div className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 backdrop-blur-sm",
          animated && "animate-pulse-slow"
        )}></div>
        
        {/* Icon container with softer gradient */}
        <div className="relative p-1.5 rounded-full bg-gradient-to-br from-cyan-500/80 via-blue-500/80 to-indigo-500/80">
          <div className="relative flex items-center justify-center">
            {/* Home icon as main element */}
            <Home 
              size={sizeClasses[size].iconSize} 
              className="text-white" 
            />
            {/* Lightning bolt accent */}
            <Zap 
              size={sizeClasses[size].iconSize * 0.5} 
              className={cn(
                "absolute -top-1 -right-1 text-amber-300/90", 
                animated && "animate-pulse"
              )} 
            />
          </div>
        </div>
      </div>
      
      {/* Text part with more subtle gradient */}
      <div className={cn("font-semibold tracking-tight", sizeClasses[size].text)}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
          team
        </span>
        <span className="text-amber-400 mx-0.5">
          up
        </span>
      </div>
    </div>
  );
};

export default ModernLogo;
