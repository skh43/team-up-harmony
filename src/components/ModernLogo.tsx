
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface ModernLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  animated?: boolean;
  variant?: 'default' | 'glow' | 'gradient' | 'shine';
}

const ModernLogo: React.FC<ModernLogoProps> = ({ 
  size = 'medium', 
  className,
  animated = true,
  variant = 'default'
}) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-16',
    xlarge: 'h-20'
  };

  const variants = {
    default: "",
    glow: "drop-shadow-[0_0_15px_rgba(124,58,237,0.6)]",
    gradient: "gradient-border p-1",
    shine: "animate-shimmer bg-gradient-shine bg-[length:400%_100%]"
  };

  // Animation variants for Framer Motion
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.05,
      rotate: [0, 2, 0, -2, 0],
      filter: "drop-shadow(0 0 8px rgba(124, 58, 237, 0.7))",
      transition: { 
        scale: { duration: 0.3 },
        rotate: { duration: 0.5, ease: "easeInOut", repeat: 0 },
        filter: { duration: 0.3 }
      }
    }
  };

  // Shine animation variant
  const shineVariants = {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
      transition: {
        repeat: Infinity,
        duration: 3
      }
    }
  };

  return (
    <motion.div 
      className={cn("flex items-center justify-center", className)}
      initial="hidden"
      animate="visible"
      whileHover={animated ? "hover" : undefined}
      variants={logoVariants}
    >
      <motion.div
        className={cn(
          "relative rounded-xl overflow-hidden flex items-center", 
          variant === 'shine' && "p-[1px]"
        )}
        variants={
          variant === 'shine' 
            ? shineVariants 
            : undefined
        }
        animate={
          variant === 'shine' 
            ? "animate" 
            : undefined
        }
      >
        <div className={cn(
          sizeClasses[size],
          "relative flex items-center justify-center",
          variants[variant],
        )}>
          {/* Abstract Logo SVG */}
          <svg 
            viewBox="0 0 40 40" 
            className="w-auto h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main shape - abstract representation of connection */}
            <motion.path 
              d="M10,20 C10,13 20,8 30,15 C35,18 35,25 30,28 C20,35 10,30 10,22 Z" 
              fill="none" 
              stroke="url(#gradient1)" 
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* Inner line representing connection or path */}
            <motion.path 
              d="M15,20 C15,17 20,15 25,18 C28,20 28,24 25,26 C20,29 15,27 15,21 Z" 
              fill="none" 
              stroke="url(#gradient2)" 
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
            />
            
            {/* Center point - represents the focus or connection point */}
            <motion.circle 
              cx="20" 
              cy="20" 
              r="3" 
              fill="url(#gradient3)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9b87f5" />
                <stop offset="100%" stopColor="#0EA5E9" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D946EF" />
                <stop offset="100%" stopColor="#9b87f5" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0EA5E9" />
                <stop offset="100%" stopColor="#D946EF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {variant === 'glow' && (
          <motion.div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            animate={{ 
              boxShadow: ["0 0 5px rgba(124, 58, 237, 0.3)", "0 0 20px rgba(124, 58, 237, 0.6)", "0 0 5px rgba(124, 58, 237, 0.3)"] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ModernLogo;
