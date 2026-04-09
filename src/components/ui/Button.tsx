import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 active:scale-95",
        {
          "bg-primary-container text-[#002c38] hover:bg-opacity-90 shadow-lg hover:shadow-xl": variant === 'primary',
          "border border-primary-container text-primary-container hover:bg-primary-container/10": variant === 'secondary',
          "bg-transparent hover:bg-black/5 text-on-surface": variant === 'ghost',
          "px-3 py-1.5 text-sm": size === 'sm',
          "px-5 py-2.5 text-base": size === 'md',
          "px-8 py-4 text-lg": size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
};
