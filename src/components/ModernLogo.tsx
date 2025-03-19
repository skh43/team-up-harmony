
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
            {/* Main shape - abstract home/building */}
            <motion.path 
              d="M20 5L5 20v15h30V20L20 5z" 
              fill="none" 
              stroke="url(#gradient1)" 
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* Abstract figures representing people */}
            <motion.circle 
              cx="15" 
              cy="25" 
              r="3" 
              fill="url(#gradient2)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <motion.circle 
              cx="25" 
              cy="25" 
              r="3" 
              fill="url(#gradient3)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
            
            {/* Connect the figures - representing connection */}
            <motion.line 
              x1="15" 
              y1="25" 
              x2="25" 
              y2="25" 
              stroke="url(#gradient4)" 
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
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
                <stop offset="100%" stopColor="#9b87f5" />
              </linearGradient>
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D946EF" />
                <stop offset="100%" stopColor="#0EA5E9" />
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
