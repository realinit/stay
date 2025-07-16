import React from 'react';
import FormLayout from '../templates/FormLayout';
import ContactForm from '../organisms/ContactForm';

const ContactPage: React.FC = () => {
  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to your backend
    alert('Thank you for your message! We will get back to you soon.');
  };
  
  return (
    <FormLayout
      title="Contact Us"
      subtitle="Get in touch with us for any questions or inquiries."
      maxWidth="lg"
    >
      <ContactForm onSubmit={handleSubmit} />
    </FormLayout>
  );
};

export default ContactPage; 