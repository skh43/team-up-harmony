
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ModernLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  variant?: 'default' | 'glow' | 'gradient' | 'shine';
}

const ModernLogo: React.FC<ModernLogoProps> = ({ 
  size = 'medium', 
  className,
  variant = 'default'
}) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-10',
    xlarge: 'h-12'
  };

  const variants = {
    default: "",
    glow: "drop-shadow-[0_0_15px_rgba(124,58,237,0.6)]",
    gradient: "gradient-border p-1",
    shine: "animate-shimmer bg-gradient-shine bg-[length:400%_100%]"
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex flex-col items-center mr-2">
        <div className={cn(
          sizeClasses[size],
          "relative flex items-center",
          variants[variant],
        )}>
          {/* City Skyline Logo SVG */}
          <svg 
            viewBox="0 0 120 60" 
            className="w-auto h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Skyline */}
            <g fill="none" stroke="url(#skylineGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Building 1 */}
              <path d="M10,50 L10,30 L20,30 L20,50" />
              
              {/* Building 2 */}
              <path d="M25,50 L25,25 L35,25 L35,35 L40,35 L40,50" />
              
              {/* Central Tall Building (Empire State) */}
              <path d="M50,50 L50,15 L55,10 L60,15 L60,50" />
              
              {/* Building 4 */}
              <path d="M70,50 L70,20 L80,20 L80,30 L85,30 L85,50" />
              
              {/* Building 5 */}
              <path d="M95,50 L95,35 L105,35 L105,50" />
            </g>
            
            {/* Gradients */}
            <defs>
              <linearGradient id="skylineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9b87f5" />
                <stop offset="100%" stopColor="#0EA5E9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Team Up text next to the logo */}
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-wide text-gray-800">
          {t('common.teamUp')}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-gray-500 -mt-1">
          {t('common.tagline')}
        </span>
      </div>
    </div>
  );
};

export default ModernLogo;
