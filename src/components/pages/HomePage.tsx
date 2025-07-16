"use client";

import React from 'react';
import MainLayout from '../templates/MainLayout';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Card from '../molecules/Card';
import ButtonGroup from '../molecules/ButtonGroup';

const HomePage: React.FC = () => {
  const handleLogin = () => {
    console.log('Login clicked');
  };
  
  const handleSignup = () => {
    console.log('Signup clicked');
  };
  
  const handleGetStarted = () => {
    console.log('Get Started clicked');
  };
  
  const features = [
    {
      title: 'Feature 1',
      description: 'This is a description of feature 1.',
      icon: '🚀',
    },
    {
      title: 'Feature 2',
      description: 'This is a description of feature 2.',
      icon: '⚡',
    },
    {
      title: 'Feature 3',
      description: 'This is a description of feature 3.',
      icon: '🎯',
    },
  ];
  
  const actionButtons = [
    { label: 'Learn More', variant: 'outline' as const, onClick: () => console.log('Learn More') },
    { label: 'Get Started', variant: 'primary' as const, onClick: handleGetStarted },
  ];
  
  return (
    <MainLayout
      title="MyRoom"
      onLogin={handleLogin}
      onSignup={handleSignup}
    >
      {/* Hero Section */}
      <section className="text-center py-16">
        <Typography variant="h1" className="mb-4">
          Welcome to MyRoom
        </Typography>
        <Typography variant="h3" color="secondary" className="mb-8 max-w-2xl mx-auto">
          A modern platform built with Next.js, TypeScript, and Tailwind CSS using atomic design principles.
        </Typography>
        
        <ButtonGroup buttons={actionButtons} className="justify-center" />
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <Typography variant="h2" className="text-center mb-12">
          Features
        </Typography>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              title={feature.title}
              subtitle={feature.description}
              className="text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <Typography variant="body" color="secondary">
                {feature.description}
              </Typography>
            </Card>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-center">
          <Typography variant="h3" className="mb-4">
            Ready to get started?
          </Typography>
          <Typography variant="body" color="secondary" className="mb-8">
            Join thousands of users who are already using our platform.
          </Typography>
          
          <Button
            variant="primary"
            size="lg"
            onClick={handleGetStarted}
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage; 