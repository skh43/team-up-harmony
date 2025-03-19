
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
    medium: 'h-12',
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
          "relative rounded-xl overflow-hidden", 
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
        <motion.img 
          src="/public/lovable-uploads/f6a689e5-9dc4-44c7-a958-19de3d72db76.png" 
          alt={t('common.logoAlt', 'TeamUp Logo')} 
          className={cn(
            sizeClasses[size], 
            "w-auto object-contain",
            variants[variant],
            variant === 'gradient' && "rounded-lg"
          )}
        />
        
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
