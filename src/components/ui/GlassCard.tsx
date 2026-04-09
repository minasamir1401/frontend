import React from 'react';
import { cn } from './Button';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverGlow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  className,
  hoverGlow = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-surface-lowest rounded-2xl glass p-6 transition-all duration-300",
        hoverGlow && "hover:shadow-[0_10px_40px_rgba(0,210,255,0.15)] hover:-translate-y-1",
        className
      )}
      {...props}
    />
  );
};
