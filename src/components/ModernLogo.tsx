
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
    small: 'h-6 w-auto',
    medium: 'h-8 w-auto',
    large: 'h-12 w-auto',
    xlarge: 'h-16 w-auto'
  };

  const variants = {
    default: "",
    glow: "drop-shadow-[0_0_15px_rgba(124,58,237,0.6)]",
    gradient: "gradient-border p-1",
    shine: "animate-shimmer bg-gradient-shine bg-[length:400%_100%]"
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn(
        sizeClasses[size],
        "relative flex items-center",
        variants[variant],
      )}>
        {/* Abstract Logo SVG */}
        <svg 
          viewBox="0 0 40 40" 
          className="w-auto h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main shape - abstract representation of connection */}
          <path 
            d="M10,20 C10,13 20,8 30,15 C35,18 35,25 30,28 C20,35 10,30 10,22 Z" 
            fill="none" 
            stroke="url(#gradient1)" 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Inner line representing connection or path */}
          <path 
            d="M15,20 C15,17 20,15 25,18 C28,20 28,24 25,26 C20,29 15,27 15,21 Z" 
            fill="none" 
            stroke="url(#gradient2)" 
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Center point - represents the focus or connection point */}
          <circle 
            cx="20" 
            cy="20" 
            r="3" 
            fill="url(#gradient3)"
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
      
      {/* Team Up text next to the logo */}
      <span className="text-lg font-semibold text-gray-800 ml-2">
        {t('common.teamUp')}
      </span>
      
      {variant === 'glow' && (
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ 
            boxShadow: "0 0 10px rgba(124, 58, 237, 0.5)" 
          }}
        />
      )}
    </div>
  );
};

export default ModernLogo;
