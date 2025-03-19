
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Zap, Users } from 'lucide-react';

interface ModernLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'hero' | 'giant';
  className?: string;
  variant?: 'default' | 'glow' | 'gradient' | 'shine';
  showText?: boolean;
  showTagline?: boolean;
  animateThunder?: boolean;
}

const ModernLogo: React.FC<ModernLogoProps> = ({ 
  size = 'medium', 
  className,
  variant = 'default',
  showText = true,
  showTagline = false,
  animateThunder = false
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(!animateThunder);
  const [position, setPosition] = useState(0);
  
  // Animation effect for the thunderbolt
  useEffect(() => {
    if (!animateThunder) return;
    
    const runAnimation = () => {
      // Start with the thunderbolt hidden
      setIsVisible(false);
      setPosition(-50);
      
      // Make the thunderbolt appear and drop from top
      setTimeout(() => {
        setIsVisible(true);
        
        // Animate the thunderbolt falling
        const fallInterval = setInterval(() => {
          setPosition((prev) => {
            // When it reaches its final position, clear the interval
            if (prev >= 0) {
              clearInterval(fallInterval);
              return 0;
            }
            return prev + 5;
          });
        }, 40);
        
        // Flash effect
        let flashCount = 0;
        const flashInterval = setInterval(() => {
          if (flashCount >= 5) {
            clearInterval(flashInterval);
            setIsVisible(true);
            return;
          }
          
          setIsVisible((prev) => !prev);
          flashCount++;
        }, 100);
        
        // After animation completes, wait and restart
        setTimeout(() => {
          clearInterval(fallInterval);
          clearInterval(flashInterval);
          
          // Restart the animation after a delay
          animationTimeout = setTimeout(runAnimation, 3000);
        }, 1000);
      }, 500);
    };
    
    // Start the initial animation
    let animationTimeout = setTimeout(runAnimation, 800);
    
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [animateThunder]);
  
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
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent font-extrabold">tribe</span>
                {/* Thunder animation positioned over 'T' in Tribe */}
                <span className="absolute" style={{ 
                  top: position < 0 ? `${position}px` : 
                       size === 'giant' ? '-50px' : 
                       size === 'hero' ? '-40px' : 
                       size === 'xlarge' ? '-20px' : 
                       size === 'large' ? '-15px' :
                       size === 'medium' ? '-12px' : '-10px',
                  left: size === 'giant' ? '2px' : 
                        size === 'hero' ? '2px' : 
                        size === 'xlarge' ? '1px' : 
                        size === 'large' ? '1px' :
                        size === 'medium' ? '0px' : '0px',
                  transition: 'top 0.1s ease-in',
                  opacity: isVisible ? 1 : 0,
                  zIndex: 10,
                }}>
                  <Zap 
                    className={cn(
                      "fill-yellow-400 text-yellow-400 rotate-12 transform",
                      size === 'giant' ? 'h-16 w-16' : 
                      size === 'hero' ? 'h-14 w-14' : 
                      size === 'xlarge' ? 'h-8 w-8' : 
                      size === 'large' ? 'h-6 w-6' :
                      size === 'medium' ? 'h-4 w-4' : 'h-3 w-3'
                    )}
                  />
                </span>
                {/* Tribe icon next to text for more visual appeal */}
                {size !== 'small' && (
                  <Users 
                    className={cn(
                      "ml-1 text-fuchsia-500",
                      size === 'giant' ? 'h-14 w-14' : 
                      size === 'hero' ? 'h-10 w-10' : 
                      size === 'xlarge' ? 'h-6 w-6' : 
                      size === 'large' ? 'h-5 w-5' :
                      size === 'medium' ? 'h-4 w-4' : 'h-3 w-3'
                    )}
                  />
                )}
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
        // Fallback non-text logo
        <div className={cn(
          sizeClasses[size],
          "relative flex items-center",
          variants[variant],
        )}>
          <div className="flex items-center">
            <Users className={cn(
              "text-violet-600",
              size === 'giant' ? 'h-24 w-24' : 
              size === 'hero' ? 'h-16 w-16' : 
              size === 'xlarge' ? 'h-10 w-10' : 
              size === 'large' ? 'h-8 w-8' :
              size === 'medium' ? 'h-6 w-6' : 'h-5 w-5'
            )} />
            <Zap className={cn(
              "text-yellow-400 ml-1",
              size === 'giant' ? 'h-16 w-16' : 
              size === 'hero' ? 'h-12 w-12' : 
              size === 'xlarge' ? 'h-8 w-8' : 
              size === 'large' ? 'h-6 w-6' :
              size === 'medium' ? 'h-5 w-5' : 'h-4 w-4'
            )} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernLogo;
