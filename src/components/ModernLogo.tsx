
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';

interface ModernLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'hero' | 'giant';
  className?: string;
  variant?: 'default' | 'glow' | 'gradient' | 'shine';
  showText?: boolean;
  showTagline?: boolean;
  showIcon?: boolean;
}

const ModernLogo: React.FC<ModernLogoProps> = ({ 
  size = 'medium', 
  className,
  variant = 'default',
  showText = true,
  showTagline = false,
  showIcon = true,
}) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-10',
    xlarge: 'h-12',
    hero: 'h-48',
    giant: 'h-80'
  };

  const variants = {
    default: "",
    glow: "text-shadow-gold",
    gradient: "p-1",
    shine: "gold-shimmer"
  };

  // Map size to tagline size - adjusted to be smaller
  const taglineSizes = {
    small: 'text-[6px]',
    medium: 'text-[8px]',
    large: 'text-xs',
    xlarge: 'text-sm',
    hero: 'text-lg',
    giant: 'text-xl'
  };

  // Icon sizes based on logo size
  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 28,
    hero: 48,
    giant: 64
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

  return (
    <div className={cn("flex items-center flex-col", size === 'hero' || size === 'giant' ? 'flex-col' : '', className)}>
      {showText ? (
        <div className={cn("relative", sizeClasses[size], variants[variant])}>
          <div className="flex items-center relative">
            {/* Icon - only shown when requested */}
            {showIcon && (
              <div className="mr-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full p-1 flex items-center justify-center">
                <Users 
                  size={iconSizes[size]} 
                  className="text-black-900" 
                  strokeWidth={2.5}
                />
              </div>
            )}
            
            {/* Text Logo without lighting effects */}
            <span className={cn(
              "font-bold tracking-tighter flex items-center",
              size === 'giant' ? 'text-7xl' : 
              size === 'hero' ? 'text-5xl' : 
              size === 'xlarge' ? 'text-4xl' :
              size === 'large' ? 'text-3xl' :
              size === 'medium' ? 'text-xl' : 'text-lg'
            )}>
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent font-extrabold">Teem</span>
              <span className="bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent font-extrabold ml-1">up</span>
            </span>
          </div>

          {/* Tagline - only show when requested */}
          {showTagline && (
            <div className={cn(
              "text-center text-gold-400 font-medium mt-1 mx-auto whitespace-nowrap overflow-hidden",
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
            <div className="mr-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full p-1 flex items-center justify-center">
              <Users 
                size={iconSizes[size]} 
                className="text-black-900" 
                strokeWidth={2.5}
              />
            </div>
          )}
          <div className="flex items-center">
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent font-extrabold">Teem</span>
            <span className="bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent font-extrabold ml-1">up</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernLogo;
