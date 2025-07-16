import React from 'react';
import Typography from '../atoms/Typography';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  onClick,
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-md border border-gray-200 p-6';
  const interactiveClasses = onClick ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200' : '';
  
  const classes = `${baseClasses} ${interactiveClasses} ${className}`;
  
  return (
    <div className={classes} onClick={onClick}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <Typography variant="h4" className="mb-2">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body" color="secondary">
              {subtitle}
            </Typography>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card; 