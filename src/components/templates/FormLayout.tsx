import React from 'react';
import Typography from '../atoms/Typography';
import Card from '../molecules/Card';

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  subtitle,
  maxWidth = 'md',
  className = '',
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };
  
  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 ${className}`}>
      <div className={`w-full ${maxWidthClasses[maxWidth]}`}>
        <div className="text-center mb-8">
          <Typography variant="h2" className="mb-2">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body" color="secondary">
              {subtitle}
            </Typography>
          )}
        </div>
        
        <Card>
          {children}
        </Card>
      </div>
    </div>
  );
};

export default FormLayout; 