"use client";

import React from 'react';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Header from '../organisms/Header';
import SearchForm from '../organisms/SearchForm';
import PopularCities from '../molecules/PopularCities';

const SearchPage: React.FC = () => {
  const handleCitySelect = (city: string) => {
    // The SearchForm component now handles the redirect automatically
    console.log('City selected:', city);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Jackstay" />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 text-white py-16">
          <div className=" mx-auto px-6">
            <div className=" mb-8">
              <Typography variant="h1" className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Find Your Perfect Stay
              </Typography>
              <Typography variant="body" className="text-xl text-white">
                Discover amazing hotels, resorts, and accommodations worldwide
              </Typography>
            </div>
            
            {/* Search Form */}
            <div className=" mx-auto">
              <SearchForm 
                onSearch={() => {}} 
              />
            </div>
          </div>
        </div>

        {/* Popular Cities Section */}
        <div className=" mx-auto px-6">
          <PopularCities onCitySelect={handleCitySelect} />
        </div>

        {/* Features Section */}
        <div className=" mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Jackstay?
            </Typography>
            <Typography variant="body" className="text-gray-600">
              Experience the best in hospitality with our curated selection of properties
            </Typography>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Cities Worldwide</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Hotels & Resorts</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage; 