
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Zap } from 'lucide-react';

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
  showTagline = false
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

  // Adjust tagline width constraints
  const taglineWidths = {
    small: 'max-w-[70%]',
    medium: 'max-w-[75%]',
    large: 'max-w-[80%]',
    xlarge: 'max-w-[85%]',
    hero: 'max-w-[90%]',
    giant: 'max-w-[90%]'
  };

  return (
    <div className={cn("flex items-center flex-col", size === 'hero' || size === 'giant' ? 'flex-col' : '', className)}>
      {showText ? (
        <div className={cn("relative", sizeClasses[size], variants[variant])}>
          <div className="flex items-center relative">
            {/* Text Logo without lighting effects */}
            <span className={cn(
              "font-bold tracking-tighter",
              size === 'giant' ? 'text-8xl' : 
              size === 'hero' ? 'text-6xl' : 
              size === 'xlarge' ? 'text-4xl' :
              size === 'large' ? 'text-3xl' :
              size === 'medium' ? 'text-2xl' : 'text-xl'
            )}>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-extrabold">te</span>
              <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent font-extrabold">am</span>
              {/* Space for the thunder bolt without glow */}
              <span className="relative">
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent font-extrabold">u</span>
                <span className="absolute" style={{ 
                  top: size === 'giant' ? '-40px' : 
                       size === 'hero' ? '-30px' : 
                       size === 'xlarge' ? '-15px' : 
                       size === 'large' ? '-12px' :
                       size === 'medium' ? '-10px' : '-8px',
                  right: size === 'giant' ? '10px' : 
                        size === 'hero' ? '8px' : 
                        size === 'xlarge' ? '5px' : 
                        size === 'large' ? '4px' :
                        size === 'medium' ? '3px' : '2px'
                }}>
                  <Zap 
                    className={cn(
                      "fill-yellow-400 text-yellow-400 rotate-12 transform",
                      size === 'giant' ? 'h-16 w-16' : 
                      size === 'hero' ? 'h-12 w-12' : 
                      size === 'xlarge' ? 'h-6 w-6' : 
                      size === 'large' ? 'h-5 w-5' :
                      size === 'medium' ? 'h-4 w-4' : 'h-3 w-3'
                    )}
                  />
                </span>
                <span className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent font-extrabold">p</span>
              </span>
            </span>
          </div>

          {/* Tagline - updated to be smaller and constrained width */}
          {showTagline && (
            <div className={cn(
              "text-center text-blue-600 font-medium mt-1 mx-auto",
              taglineSizes[size],
              taglineWidths[size]
            )}>
              roommate discovery, simplified
            </div>
          )}
        </div>
      ) : (
        <div className={cn(
          sizeClasses[size],
          "relative flex items-center",
          variants[variant],
        )}>
          {/* City Skyline Logo SVG - kept for fallback */}
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
      )}
    </div>
  );
};

export default ModernLogo;
