"use client";

import React from 'react';
import Button from '../atoms/Button';

interface ButtonGroupProps {
  buttons: Array<{
    label: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    disabled?: boolean;
  }>;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  orientation = 'horizontal',
  className = '',
}) => {
  const containerClasses = orientation === 'vertical' 
    ? 'flex flex-col space-y-2' 
    : 'flex space-x-2';
  
  return (
    <div className={`${containerClasses} ${className}`}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant}
          size={button.size}
          onClick={button.onClick}
          disabled={button.disabled}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup; 