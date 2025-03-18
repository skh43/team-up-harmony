
import React from 'react';
import { Zap, Users, Home } from 'lucide-react';
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
    <div className={cn("flex items-center gap-1", sizeClasses[size].container, className)}>
      {/* Logo Icon Container */}
      <div className="relative">
        {/* Background circles */}
        <div className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 backdrop-blur-sm",
          animated && "animate-pulse-slow"
        )}></div>
        
        {/* Icon container */}
        <div className="relative p-1.5 rounded-full bg-gradient-to-br from-[#01CDFA] via-[#3DB2FF] to-[#516CF7]">
          <div className="relative flex items-center justify-center">
            {/* User icon */}
            <Users 
              size={sizeClasses[size].iconSize} 
              className="text-white" 
            />
            {/* Lightning bolt overlay */}
            <Zap 
              size={sizeClasses[size].iconSize * 0.6} 
              className={cn(
                "absolute text-yellow-300 -top-1 -right-1", 
                animated && "animate-pulse"
              )} 
            />
            {/* Home icon - small subtle accent */}
            <Home 
              size={sizeClasses[size].iconSize * 0.4} 
              className={cn(
                "absolute text-white/70 bottom-0 right-0", 
                animated && "animate-float"
              )} 
            />
          </div>
        </div>
      </div>
      
      {/* Text part */}
      <div className={cn("font-bold tracking-tight", sizeClasses[size].text)}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#01CDFA] via-[#3DB2FF] to-[#516CF7]">
          team
        </span>
        <span className={cn(
          "inline-block mx-0.5 text-yellow-400",
          animated && "animate-pulse"
        )}>
          ⚡
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8563C9] via-[#A83ACB] to-[#ED2FC0]">
          up
        </span>
      </div>
    </div>
  );
};

export default ModernLogo;
