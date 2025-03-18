
import React from 'react';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';

interface SimpleTeamUpLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const SimpleTeamUpLogo: React.FC<SimpleTeamUpLogoProps> = ({ 
  size = 'medium',
  className
}) => {
  const sizeClasses = {
    small: 'h-10 text-lg',
    medium: 'h-16 text-2xl',
    large: 'h-20 text-3xl',
  };

  return (
    <div className={cn("flex items-center justify-center bg-white p-3 rounded-lg shadow-sm", className)}>
      <div className={cn("flex items-center", sizeClasses[size])}>
        <Users className="text-[#01CDFA] mr-2" />
        <div className="font-bold tracking-tight flex items-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#01CDFA] via-[#3DB2FF] to-[#516CF7]">
            team
          </span>
          <span className="mx-1 text-[#FFD43B]">⚡</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8563C9] via-[#A83ACB] to-[#ED2FC0]">
            up
          </span>
        </div>
      </div>
    </div>
  );
};

export default SimpleTeamUpLogo;
