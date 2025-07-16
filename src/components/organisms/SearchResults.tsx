"use client";

import React, { useState, useCallback } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import VirtualizedListCommon from '../atoms/VirtualizedListCommon'; 

interface SearchResult {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  amenities: string[];
  type: string;
  distance: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  searchPerformed: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading, searchPerformed }) => {
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('price');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenities = ['WiFi', 'AC', 'Restaurant', 'Pool', 'Spa', 'Gym', 'Parking', 'Business Center'];

  const filteredResults = results.filter(result => {
    const priceInRange = result.price >= priceRange[0] && result.price <= priceRange[1];
    const hasSelectedAmenities = selectedAmenities.length === 0 || 
      selectedAmenities.some(amenity => result.amenities.includes(amenity));
    
    return priceInRange && hasSelectedAmenities;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        const aDistance = parseFloat(a.distance.split(' ')[0]);
        const bDistance = parseFloat(b.distance.split(' ')[0]);
        return aDistance - bDistance;
      default:
        return 0;
    }
  });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  // Virtualized grid cell renderer
  const Cell = ({ index, result }: any) => {
    console.log(index, result);
    if (!result) return null;

    return (
      <div  className="p-3">
        <div className="bg-white rounded-xl flex flex-row shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
          {/* Image */}
          <div className="relative h-48 overflow-hidden ">
            <img
              src={result.image}
              alt={result.name}
              className="w-full h-full object-cover"
            />
            {result.discount > 0 && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                {result.discount}% OFF
              </div>
            )}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium text-gray-800">
              {result.type}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col w-full">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <Typography variant="h4" className="font-semibold text-gray-800 mb-1 line-clamp-1">
                  {result.name}
                </Typography>
                <Typography variant="small" className="text-gray-600 mb-2">
                  {result.location}
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  {result.distance}
                </Typography>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(result.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{result.rating}</span>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-1 mb-4">
              {result.amenities.slice(0, 3).map(amenity => (
                <span
                  key={amenity}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {result.amenities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{result.amenities.length - 3} more
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 justify-between ml-auto">
              <div>
                <Typography variant="h4" className="font-bold text-gray-800">
                  ₹{result.price.toLocaleString()}
                </Typography>
                {result.originalPrice > result.price && (
                  <Typography variant="small" className="text-gray-500 line-through">
                    ₹{result.originalPrice.toLocaleString()}
                  </Typography>
                )}
              </div>
              <Button
                variant="primary"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 "
              >
                <a href={`/hotel/${result.id}`}>View Details</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <Typography variant="h3" className="text-xl font-semibold text-gray-800">
          Searching for the best deals...
        </Typography>
        <Typography variant="body" className="text-gray-600">
          This may take a few moments
        </Typography>
      </div>
    );
  }

  if (!searchPerformed) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <Typography variant="h2" className="text-2xl font-bold text-gray-800 mb-2">
            Search Results
          </Typography>
          <Typography variant="body" className="text-gray-600">
            Found {sortedResults.length} properties
          </Typography>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'distance')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="price">Price (Low to High)</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="distance">Distance (Near to Far)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <Typography variant="h4" className="text-lg font-semibold text-gray-800">
              Filters
            </Typography>

            {/* Price Range */}
            <div>
              <Typography variant="small" className="font-medium text-gray-700 mb-3">
                Price Range
              </Typography>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹0</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <Typography variant="small" className="font-medium text-gray-700 mb-3">
                Amenities
              </Typography>
              <div className="space-y-2">
                {amenities.map(amenity => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          {sortedResults.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏨</span>
              </div>
              <Typography variant="h3" className="text-xl font-semibold text-gray-800 mb-2">
                No properties found
              </Typography>
              <Typography variant="body" className="text-gray-600">
                Try adjusting your filters or search criteria
              </Typography>
            </div>
          ) : (
            <div>
              {/* Performance Indicator */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600 font-medium">
                    {sortedResults.length} total properties
                  </span>
                </div>
              </div>
              
              <div className="h-[100vh]">
                <VirtualizedListCommon list={sortedResults} CardComponent={Cell} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 