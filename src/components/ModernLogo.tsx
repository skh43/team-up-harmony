
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ModernLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'hero' | 'giant';
  className?: string;
  variant?: 'default' | 'glow' | 'gradient' | 'shine';
  showText?: boolean;
  showTagline?: boolean;
}

const ModernLogo: React.FC<ModernLogoProps> = ({ 
  size = 'medium', 
  className,
  variant = 'default',
  showText = true,
  showTagline = false,
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
    glow: "",
    gradient: "p-1",
    shine: ""
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
            {/* Text Logo without lighting effects */}
            <span className={cn(
              "font-bold tracking-tighter flex items-center",
              size === 'giant' ? 'text-7xl' : 
              size === 'hero' ? 'text-5xl' : 
              size === 'xlarge' ? 'text-4xl' :
              size === 'large' ? 'text-3xl' :
              size === 'medium' ? 'text-xl' : 'text-lg'
            )}>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-extrabold">team</span>
              <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent font-extrabold mx-1">up</span>
              <span className="relative">
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent font-extrabold text-sm">tribe</span>
              </span>
            </span>
          </div>

          {/* Tagline - only show when requested */}
          {showTagline && (
            <div className={cn(
              "text-center text-blue-600 font-medium mt-1 mx-auto whitespace-nowrap overflow-hidden",
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
          <div className="flex items-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-extrabold">team</span>
            <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent font-extrabold mx-1">up</span>
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent font-extrabold text-sm">tribe</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernLogo;
