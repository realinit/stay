"use client";

import React, { useState } from 'react';
import MainLayout from '../templates/MainLayout';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Card from '../molecules/Card';
import FormField from '../molecules/FormField';
import Input from '../atoms/Input';

const JackstayLandingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    mobile: '',
    city: '',
    referralCode: '',
    teamSize: '',
    purpose: '',
  });

  const [selectedCountry, setSelectedCountry] = useState('+91');

  const countries = [
    { code: '+91', name: 'India' },
    { code: '+62', name: 'Indonesia' },
    { code: '+60', name: 'Malaysia' },
    { code: '+971', name: 'UAE' },
    { code: '+66', name: 'Thailand' },
    { code: '+63', name: 'Philippines' },
    { code: '+84', name: 'Vietnam' },
    { code: '+966', name: 'Saudi Arabia' },
  ];

  const features = [
    {
      title: 'Super Commissions',
      description: 'Book more and Earn attractive commissions',
      icon: '💰',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      title: 'Recharge Cashbacks',
      description: 'Super Charge your wallet and enjoy hassle free payments',
      icon: '💳',
      gradient: 'from-green-400 to-blue-500',
    },
    {
      title: 'Quick automated payouts',
      description: 'Hassle free commission payouts',
      icon: '⚡',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      title: 'Free Cancellations',
      description: 'No cancellation fee till the check-in day',
      icon: '✅',
      gradient: 'from-emerald-400 to-teal-500',
    },
    {
      title: 'Custom Markup Prices',
      description: 'Sell Jackstay inventory with custom markup settings',
      icon: '🎯',
      gradient: 'from-red-400 to-pink-500',
    },
    {
      title: 'Know your Business',
      description: 'Sales, Savings and Commission reporting and analytics',
      icon: '📊',
      gradient: 'from-indigo-400 to-purple-500',
    },
  ];

  const brands = [
    {
      name: 'Jackstay Home',
      description: 'Apartments and villas with extra space and privacy.',
      image: '🏠',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      name: 'Palette',
      description: 'Premium resorts across urban and holiday destinations.',
      image: '🎨',
      gradient: 'from-pink-500 to-red-500',
    },
    {
      name: 'Jackstay Rooms',
      description: 'Super affordable stays with essential amenities',
      image: '🏨',
      gradient: 'from-green-500 to-blue-500',
    },
    {
      name: 'Jackstay SilverKey',
      description: 'Fully serviced, professionally managed apartments',
      image: '🔑',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      name: 'Jackstay Townhouse',
      description: 'Your friendly neighbourhood hotel, in premium quality.',
      image: '🏘️',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      name: 'Capital J',
      description: 'Range of boutique spaces in premium quality.',
      image: '🏛️',
      gradient: 'from-teal-500 to-cyan-500',
    },
  ];

  const testimonials = [
    {
      name: 'Suman Patel',
      company: 'Bright Holidays, Jaipur',
      text: "Jackstay's dedicated account manager is what businesses like mine needs. With such attractive incentives, who would say no to a partnership with Jackstay.",
      avatar: '👩‍💼',
    },
    {
      name: 'Rahul Aggarwal',
      company: 'Prayosha Hospitality Services Pvt. Ltd., Gujarat',
      text: 'Time and again, Jackstay has provided pan India supply at the best rates. With their help, we have now set up 20 new franchises in Gujarat.',
      avatar: '👨‍💼',
    },
    {
      name: 'Sanjeev Bhatnagar',
      company: 'The Royal Escape, Jaipur',
      text: "Jackstay's 10 day package to Rajasthan which they curated specially for our guests is a huge hit in our area.",
      avatar: '👨‍💻',
    },
  ];

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! Our travel expert will connect with you soon.');
  };

  return (
    <MainLayout title="Jackstay" className="bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <span className="text-sm font-medium">🚀 Trusted by 45,000+ Travel Agents</span>
            </div>
          </div>

          <Typography variant="h1" className="mb-6 text-white text-6xl md:text-7xl font-bold leading-tight">
            Super Charge your
            <span className="block bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">
              business growth
            </span>
          </Typography>
          
          <Typography variant="h3" className="mb-12 text-blue-100 text-xl md:text-2xl max-w-3xl mx-auto text-white">
            Partner with Jackstay and unlock unlimited earning potential with our revolutionary travel platform
          </Typography>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <Typography variant="h2" className="text-white mb-2 text-4xl font-bold">80+</Typography>
                <Typography variant="body" className="text-white">Countries</Typography>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <Typography variant="h2" className="text-white mb-2 text-4xl font-bold">43,000+</Typography>
                <Typography variant="body" className="text-white">Hotels</Typography>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <Typography variant="h2" className="text-white mb-2 text-4xl font-bold">800+</Typography>
                <Typography variant="body" className="text-white">Cities</Typography>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
            variant="primary"
            size="lg"
            className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            <a href="/search">Search Hotels</a>
          </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration" className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full text-sm font-medium mb-6">
              🚀 Quick Registration
            </div>
            <Typography variant="h2" className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Start Your Journey Today
            </Typography>
            <Typography variant="body" color="secondary" className="text-xl">
              Join thousands of successful travel agents and start earning
            </Typography>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white text-center">
              <Typography variant="h3" className="text-2xl font-bold mb-2 text-white">
                Partner Registration
              </Typography>
              <Typography variant="body" className="text-blue-100 text-white">
                Complete your details and get exclusive access
              </Typography>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange('fullName')}
                  required
                />
                
                <FormField
                  label="Company"
                  placeholder="Enter your company name"
                  value={formData.company}
                  onChange={handleInputChange('company')}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="flex">
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    >
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      placeholder="Enter mobile number"
                      value={formData.mobile}
                      onChange={handleInputChange('mobile')}
                      className="rounded-r-xl w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Select City"
                  placeholder="Select your city"
                  value={formData.city}
                  onChange={handleInputChange('city')}
                  required
                />
                
                <FormField
                  label="Referral Code"
                  placeholder="Enter referral code (optional)"
                  value={formData.referralCode}
                  onChange={handleInputChange('referralCode')}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Team Size"
                  placeholder="Number of team members"
                  value={formData.teamSize}
                  onChange={handleInputChange('teamSize')}
                />
                
                <FormField
                  label="Purpose"
                  placeholder="Why are you interested?"
                  value={formData.purpose}
                  onChange={handleInputChange('purpose')}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Register Now
                </button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300"
                >
                  Request Call Back
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full text-sm font-medium mb-6">
              ✨ Premium Features
            </div>
            <Typography variant="h2" className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
              Everything Your Business Needs
            </Typography>
            <Typography variant="body" color="secondary" className="text-xl max-w-3xl mx-auto">
              Powerful tools and features designed to maximize your earning potential
            </Typography>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <Typography variant="h4" className="mb-4 font-bold text-gray-800">
                    {feature.title}
                  </Typography>
                  <Typography variant="body" color="secondary" className="text-gray-600">
                    {feature.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full text-sm font-medium mb-6">
              🏨 Our Brands
            </div>
            <Typography variant="h2" className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Find a Jackstay for Everyone
            </Typography>
            <Typography variant="body" color="secondary" className="text-xl max-w-3xl mx-auto">
              From luxury resorts to budget-friendly stays, we have the perfect accommodation for every traveler
            </Typography>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${brand.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {brand.image}
                  </div>
                  <Typography variant="h4" className="mb-4 font-bold text-gray-800">
                    {brand.name}
                  </Typography>
                  <Typography variant="body" color="secondary" className="text-gray-600">
                    {brand.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full text-sm font-medium mb-6">
              🚀 How It Works
            </div>
            <Typography variant="h2" className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Get Started in 3 Simple Steps
            </Typography>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  📝
                </div>
                <Typography variant="h4" className="mb-4 font-bold text-gray-800">
                  Quick Onboarding
                </Typography>
                <Typography variant="body" color="secondary" className="text-gray-600">
                  Submit your details & documents to get exclusive Super Agent Access
                </Typography>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  🏨
                </div>
                <Typography variant="h4" className="mb-4 font-bold text-gray-800">
                  Make Booking
                </Typography>
                <Typography variant="body" color="secondary" className="text-gray-600">
                  Find & Book the property your customers want at the lowest price
                </Typography>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  💰
                </div>
                <Typography variant="h4" className="mb-4 font-bold text-gray-800">
                  Earn Money
                </Typography>
                <Typography variant="body" color="secondary" className="text-gray-600">
                  Earn Money with our attractive commission rates
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full text-sm font-medium mb-6">
              ❤️ Success Stories
            </div>
            <Typography variant="h2" className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Our Partners Love Us
            </Typography>
            <Typography variant="body" color="secondary" className="text-xl mb-8">
              45,000+ Happy Customers Worldwide
            </Typography>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                                     <div className="flex items-center mb-6">
                     <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-xl mr-4">
                       {testimonial.avatar}
                     </div>
                    <div>
                      <Typography variant="h5" className="font-bold text-gray-800">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="small" color="secondary">
                        {testimonial.company}
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="body" color="secondary" className="italic text-gray-600">
                    "{testimonial.text}"
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <Typography variant="h2" className="mb-4 text-4xl md:text-5xl font-bold text-white">
            Ready to Start Earning?
          </Typography>
          <Typography variant="body" className="mb-8 text-xl  max-w-2xl mx-auto text-white">
            Join thousands of travel agents who are already earning with Jackstay and unlock your full potential
          </Typography>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Earning Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default JackstayLandingPage; 