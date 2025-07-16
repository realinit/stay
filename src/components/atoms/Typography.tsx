import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  className = '',
}) => {
  const variantClasses = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
    body: 'text-base',
    caption: 'text-sm',
    small: 'text-xs',
  };
  
  const colorClasses = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
  };
  
  const classes = `${variantClasses[variant]} ${colorClasses[color]} ${className}`;
  
  const Component = variant.startsWith('h') ? variant : 'p';
  
  return React.createElement(Component, { className: classes }, children);
};

export default Typography; 