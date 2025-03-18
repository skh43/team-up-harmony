
import React from 'react';
import { Home, User } from 'lucide-react';
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
    small: { container: 'h-8', text: 'text-lg', iconSize: 14, userSize: 10 },
    medium: { container: 'h-12', text: 'text-2xl', iconSize: 18, userSize: 14 },
    large: { container: 'h-16', text: 'text-3xl', iconSize: 24, userSize: 18 },
    xlarge: { container: 'h-20', text: 'text-4xl', iconSize: 32, userSize: 24 }
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Logo Icon Container */}
      <div className={cn("relative flex items-center justify-center", sizeClasses[size].container)}>
        {/* House outline */}
        <div className="relative">
          <Home 
            size={sizeClasses[size].iconSize * 2.2} 
            strokeWidth={2.5}
            className="text-[#F97316]" 
          />
          
          {/* People inside the house */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Blue person */}
            <div className={cn(
              "relative mr-1",
              animated && "animate-subtle-bounce"
            )}>
              <div className="rounded-full bg-[#0EA5E9] w-[40%] h-[40%] absolute top-[15%] left-[10%]"></div>
              <div className="absolute top-[30%] left-[5%] w-[50%] h-[60%]">
                <div className="absolute bg-[#0EA5E9] rounded-tl-full rounded-tr-full w-full h-full"></div>
                <div className="absolute bg-[#10b981] rounded-br-full w-[50%] h-[60%] bottom-0 right-0"></div>
              </div>
            </div>
            
            {/* Orange person */}
            <div className={cn(
              "relative ml-1",
              animated && "animate-subtle-bounce delay-150"
            )}>
              <div className="rounded-full bg-[#F97316] w-[40%] h-[40%] absolute top-[15%] right-[10%]"></div>
              <div className="absolute top-[30%] right-[5%] w-[50%] h-[60%]">
                <div className="absolute bg-[#F97316] rounded-tl-full rounded-tr-full w-full h-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Text part */}
      <div className={cn("font-bold tracking-tight flex", sizeClasses[size].text)}>
        <span className="text-[#0EA5E9]">
          Team
        </span>
        <span className="text-[#F97316] ml-1">
          Up
        </span>
      </div>
    </div>
  );
};

export default ModernLogo;
