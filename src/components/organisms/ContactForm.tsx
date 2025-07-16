"use client";

import React, { useState } from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  className?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  className = '',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  
  const handleInputChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit?.(formData);
      setFormData({ name: '', email: '', message: '' });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div>
        <Typography variant="h4" className="mb-4">
          Contact Us
        </Typography>
        <Typography variant="body" color="secondary" className="mb-6">
          Get in touch with us for any questions or inquiries.
        </Typography>
      </div>
      
      <FormField
        label="Name"
        type="text"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleInputChange('name')}
        error={errors.name}
        required
      />
      
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange('email')}
        error={errors.email}
        required
      />
      
      <FormField
        label="Message"
        type="text"
        placeholder="Enter your message"
        value={formData.message}
        onChange={handleInputChange('message')}
        error={errors.message}
        required
      />
      
      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm; 