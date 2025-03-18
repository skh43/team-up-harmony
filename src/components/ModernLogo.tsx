
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ModernLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  animated?: boolean;
}

const ModernLogo: React.FC<ModernLogoProps> = ({ 
  size = 'medium', 
  className,
  animated = true
}) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-12',
    large: 'h-16',
    xlarge: 'h-20'
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img 
        src="/public/lovable-uploads/f6a689e5-9dc4-44c7-a958-19de3d72db76.png" 
        alt={t('common.logoAlt', 'TeamUp Logo')} 
        className={cn(
          sizeClasses[size], 
          "w-auto object-contain transition-transform duration-300",
          animated && "hover:scale-105"
        )}
      />
      <span className="ml-2 font-bold text-primary hidden sm:block">{t('common.teamUp', 'Team Up')}</span>
    </div>
  );
};

export default ModernLogo;
