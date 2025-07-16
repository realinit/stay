import React from 'react';
import Input from '../atoms/Input';
import Typography from '../atoms/Typography';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-1">
        <Typography variant="body" className="font-medium">
          {label}
        </Typography>
        {required && (
          <Typography variant="small" color="error">
            *
          </Typography>
        )}
      </div>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        disabled={disabled}
      />
    </div>
  );
};

export default FormField; 