
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface ModernLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'hero' | 'giant';
  className?: string;
  variant?: 'default' | 'glow' | 'gradient' | 'shine';
  showText?: boolean;
}

const ModernLogo: React.FC<ModernLogoProps> = ({ 
  size = 'medium', 
  className,
  variant = 'default',
  showText = true
}) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-10',
    xlarge: 'h-12',
    hero: 'h-48',
    giant: 'h-80' // Added a new 'giant' size class
  };

  const variants = {
    default: "",
    glow: "drop-shadow-[0_0_15px_rgba(124,58,237,0.6)]",
    gradient: "gradient-border p-1",
    shine: "animate-shimmer bg-gradient-shine bg-[length:400%_100%]"
  };

  // Animation variants for text
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      textShadow: "0 0 15px rgba(124,58,237,0.8)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Letters animation for the text
  const letterVariants = {
    initial: { opacity: 0, y: 50 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    })
  };

  return (
    <div className={cn("flex items-center flex-col", size === 'hero' || size === 'giant' ? 'flex-col' : '', className)}>
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
      
      {/* Team Up text next to or below the logo depending on size */}
      {showText && (
        <div className={cn("flex flex-col", (size === 'hero' || size === 'giant') ? 'mt-4' : 'ml-2')}>
          <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="overflow-hidden"
          >
            {/* Using Mont font for main text with gradient */}
            <motion.span 
              className={cn(
                "font-montserrat font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400",
                size === 'giant' ? 'text-8xl' : size === 'hero' ? 'text-5xl' : 'text-2xl'
              )}
              variants={textVariants}
            >
              {t('common.teamUp').split('').map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  className="inline-block animate-float"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '3s'
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ModernLogo;
