
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Users, Circle } from 'lucide-react';

interface ModernLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'hero' | 'giant';
  className?: string;
  variant?: 'default' | 'glow' | 'gradient' | 'shine';
  showText?: boolean;
  showTagline?: boolean;
  showIcon?: boolean;
  compact?: boolean;
}

const ModernLogo: React.FC<ModernLogoProps> = ({ 
  size = 'medium', 
  className,
  variant = 'default',
  showText = true,
  showTagline = false,
  showIcon = true,
  compact = false,
}) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-10',
    xlarge: 'h-12',
    hero: 'h-16',
    giant: 'h-24'
  };

  const variants = {
    default: "",
    glow: "shadow-md",
    gradient: "p-1",
    shine: "shimmer-effect"
  };

  // Map size to tagline size - adjusted to be smaller
  const taglineSizes = {
    small: 'text-[6px]',
    medium: 'text-[8px]',
    large: 'text-xs',
    xlarge: 'text-sm',
    hero: 'text-base',
    giant: 'text-lg'
  };

  // Icon sizes based on logo size
  const iconSizes = {
    small: 14,
    medium: 18,
    large: 22,
    xlarge: 26,
    hero: 30,
    giant: 38
  };

  // Adjusted tagline width constraints to match logo width
  const taglineWidths = {
    small: 'max-w-[100%]',
    medium: 'max-w-[100%]',
    large: 'max-w-[100%]',
    xlarge: 'max-w-[100%]',
    hero: 'max-w-[100%]',
    giant: 'max-w-[100%]'
  };

  // Text sizes adjusted for better fit
  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl',
    hero: 'text-2xl',
    giant: 'text-3xl'
  };

  return (
    <div className={cn(
      "flex items-center", 
      className
    )}>
      {showText ? (
        <div className={cn("relative", sizeClasses[size], variants[variant])}>
          <div className={cn("flex items-center relative", compact ? "space-x-1" : "space-x-2")}>
            {/* Icon - only shown when requested */}
            {showIcon && (
              <div className={cn(
                "bg-airbnb-red rounded-full p-1 flex items-center justify-center shadow-sm",
                compact ? "scale-90" : ""
              )}>
                <Circle 
                  size={iconSizes[size]} 
                  className="text-white" 
                  strokeWidth={2.5}
                />
                <Users 
                  size={iconSizes[size] * 0.7} 
                  className="text-white absolute" 
                  strokeWidth={2.5}
                />
              </div>
            )}
            
            {/* Text Logo */}
            <div className={cn(
              "font-bold tracking-tight",
              textSizes[size]
            )}>
              <span className="text-airbnb-red font-extrabold">The</span>
              <span className="text-airbnb-navy font-extrabold ml-1">Living Circle</span>
            </div>
          </div>

          {/* Tagline - only show when requested */}
          {showTagline && (
            <div className={cn(
              "text-center text-airbnb-gray font-medium mt-1 mx-auto",
              taglineSizes[size],
              taglineWidths[size]
            )}>
              roommate discovery, simplified
            </div>
          )}
        </div>
      ) : (
        // Fallback non-text logo (simplified)
        <div className={cn(
          sizeClasses[size],
          "relative flex items-center",
          variants[variant],
        )}>
          {/* Icon only when text is hidden */}
          {showIcon && (
            <div className={cn(
              "bg-airbnb-red rounded-full p-1 flex items-center justify-center shadow-sm",
              compact ? "scale-90" : "mr-2"
            )}>
              <Circle 
                size={iconSizes[size]} 
                className="text-white" 
                strokeWidth={2.5}
              />
              <Users 
                size={iconSizes[size] * 0.7} 
                className="text-white absolute" 
                strokeWidth={2.5}
              />
            </div>
          )}
          <div className="flex items-center">
            <span className="text-airbnb-red font-extrabold">The</span>
            <span className="text-airbnb-navy font-extrabold ml-1">Living Circle</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernLogo;
