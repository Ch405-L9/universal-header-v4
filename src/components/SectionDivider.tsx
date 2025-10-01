import React from 'react';
import { cn } from '@/utils/cn';

interface SectionDividerProps {
  className?: string;
  variant?: 'gradient' | 'solid' | 'dots';
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  className = '', 
  variant = 'gradient' 
}) => {
  if (variant === 'gradient') {
    return (
      <div className={cn('section-divider', className)} />
    );
  }
  
  if (variant === 'solid') {
    return (
      <div className={cn('h-1 bg-badgr-primary my-8', className)} />
    );
  }
  
  if (variant === 'dots') {
    return (
      <div className={cn('flex justify-center items-center my-12', className)}>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-badgr-primary rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-badgr-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-badgr-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default SectionDivider;
