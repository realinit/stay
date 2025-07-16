"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Header from '../organisms/Header';
import SearchResults from '../organisms/SearchResults';

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

const SearchResultsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Get search parameters from URL
  const city = searchParams.get('city') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const adults = searchParams.get('adults') || '2';
  const children = searchParams.get('children') || '0';
  const rooms = searchParams.get('rooms') || '1';

  // Mock search results based on search criteria
  const getMockResults = (searchCity: string): SearchResult[] => {
    const baseResults = [
      {
        id: 1,
        name: "Jackstay Premium Hotel",
        location: searchCity || "Mumbai, Maharashtra",
        rating: 4.5,
        price: 2500,
        originalPrice: 3200,
        discount: 22,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        amenities: ["WiFi", "AC", "Restaurant", "Pool"],
        type: "Hotel",
        distance: "2.5 km from center"
      },
      {
        id: 2,
        name: "Jackstay Business Inn",
        location: searchCity || "Mumbai, Maharashtra", 
        rating: 4.2,
        price: 1800,
        originalPrice: 2200,
        discount: 18,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
        amenities: ["WiFi", "AC", "Parking"],
        type: "Hotel",
        distance: "1.8 km from center"
      },
      {
        id: 3,
        name: "Jackstay Comfort Lodge",
        location: searchCity || "Mumbai, Maharashtra",
        rating: 4.0,
        price: 1200,
        originalPrice: 1500,
        discount: 20,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
        amenities: ["WiFi", "AC"],
        type: "Lodge",
        distance: "3.2 km from center"
      },
      {
        id: 4,
        name: "Jackstay Luxury Resort",
        location: searchCity || "Mumbai, Maharashtra",
        rating: 4.8,
        price: 4500,
        originalPrice: 5800,
        discount: 22,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        amenities: ["WiFi", "AC", "Restaurant", "Pool", "Spa", "Gym"],
        type: "Resort",
        distance: "5.1 km from center"
      },
      {
        id: 5,
        name: "Jackstay Budget Stay",
        location: searchCity || "Mumbai, Maharashtra",
        rating: 3.8,
        price: 800,
        originalPrice: 1000,
        discount: 20,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
        amenities: ["WiFi", "AC"],
        type: "Guest House",
        distance: "4.0 km from center"
      },
      {
        id: 6,
        name: "Jackstay Executive Suites",
        location: searchCity || "Mumbai, Maharashtra",
        rating: 4.6,
        price: 3200,
        originalPrice: 4000,
        discount: 20,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
        amenities: ["WiFi", "AC", "Restaurant", "Gym", "Business Center"],
        type: "Hotel",
        distance: "1.2 km from center"
      }
    ];

    // Generate additional mock data for virtualization demo
    const additionalResults: SearchResult[] = [];
    const hotelNames = [
      "Jackstay Grand Plaza", "Jackstay Central Hotel", "Jackstay Marina View", 
      "Jackstay Skyline Tower", "Jackstay Riverside Inn", "Jackstay Downtown Lodge",
      "Jackstay Heritage Hotel", "Jackstay Modern Suites", "Jackstay Garden Resort",
      "Jackstay Business Center", "Jackstay Airport Hotel", "Jackstay Beach Resort",
      "Jackstay Mountain View", "Jackstay City Center", "Jackstay Express Inn",
      "Jackstay Premium Suites", "Jackstay Boutique Hotel", "Jackstay Family Resort",
      "Jackstay Corporate Lodge", "Jackstay Holiday Inn", "Jackstay Royal Plaza",
      "Jackstay Comfort Inn", "Jackstay Executive Hotel", "Jackstay Luxury Suites",
      "Jackstay Budget Inn", "Jackstay Standard Hotel", "Jackstay Deluxe Resort",
      "Jackstay Classic Hotel", "Jackstay Modern Inn", "Jackstay Traditional Lodge",
      "Jackstay Contemporary Hotel", "Jackstay Elegant Suites", "Jackstay Cozy Inn",
      "Jackstay Premium Lodge", "Jackstay Business Hotel", "Jackstay Leisure Resort",
      "Jackstay Urban Hotel", "Jackstay Rural Lodge", "Jackstay Coastal Resort",
      "Jackstay Hill Station", "Jackstay Desert Oasis", "Jackstay Forest Retreat",
      "Jackstay Lakeside Hotel", "Jackstay Valley View", "Jackstay Peak Resort",
      "Jackstay Oceanfront Hotel", "Jackstay Cliff Lodge", "Jackstay Island Resort"
    ];

    const amenitiesList = [
      ["WiFi", "AC", "Restaurant"],
      ["WiFi", "AC", "Pool", "Gym"],
      ["WiFi", "AC", "Spa", "Restaurant"],
      ["WiFi", "AC", "Parking", "Business Center"],
      ["WiFi", "AC", "Restaurant", "Pool", "Gym"],
      ["WiFi", "AC", "Spa", "Restaurant", "Pool"],
      ["WiFi", "AC", "Parking", "Gym"],
      ["WiFi", "AC", "Restaurant", "Business Center"],
      ["WiFi", "AC", "Pool", "Spa"],
      ["WiFi", "AC", "Gym", "Restaurant"]
    ];

    const images = [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop"
    ];

    const types = ["Hotel", "Resort", "Lodge", "Guest House", "Inn", "Suites"];

    for (let i = 7; i <= 60000; i++) {
      const randomName = hotelNames[Math.floor(Math.random() * hotelNames.length)];
      const randomAmenities = amenitiesList[Math.floor(Math.random() * amenitiesList.length)];
      const randomImage = images[Math.floor(Math.random() * images.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomRating = 3.5 + Math.random() * 1.5;
      const randomPrice = 800 + Math.random() * 4000;
      const randomDistance = 0.5 + Math.random() * 10;
      const hasDiscount = Math.random() > 0.3;
      const discount = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0;

      additionalResults.push({
        id: i,
        name: randomName,
        location: searchCity || "Mumbai, Maharashtra",
        rating: Math.round(randomRating * 10) / 10,
        price: Math.round(randomPrice / 100) * 100,
        originalPrice: Math.round(randomPrice / 100) * 100 + (hasDiscount ? Math.round(randomPrice * 0.3) : 0),
        discount: discount,
        image: randomImage,
        amenities: randomAmenities,
        type: randomType,
        distance: `${randomDistance.toFixed(1)} km from center`
      });
    }

    const allResults = [...baseResults, ...additionalResults];

    // Filter results based on search criteria
    return allResults.filter(result => {
      if (searchCity && !result.location.toLowerCase().includes(searchCity.toLowerCase())) {
        return false;
      }
      return true;
    });
  };

  useEffect(() => {
    if (city || checkIn || checkOut) {
      setIsLoading(true);
      setSearchPerformed(true);
      
      // Simulate API call
      setTimeout(() => {
        const results = getMockResults(city);
        setSearchResults(results);
        setIsLoading(false);
      }, 1500);
    }
  }, [city, checkIn, checkOut, adults, children, rooms]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Jackstay" />
      
      <div className="pt-20">
        {/* Search Summary */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <Typography variant="h2" className="text-2xl font-bold text-gray-800 mb-2">
                  Search Results
                </Typography>
                {city && (
                  <Typography variant="body" className="text-gray-600">
                    Hotels in {city} • {checkIn && checkOut ? `${checkIn} - ${checkOut}` : 'Any dates'} • {adults} Adults, {children} Children, {rooms} Room{rooms !== '1' ? 's' : ''}
                  </Typography>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <a href="/search">Modify Search</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <SearchResults 
            results={searchResults} 
            isLoading={isLoading}
            searchPerformed={searchPerformed}
          />
        </div>

        {/* No Search Performed */}
        {!searchPerformed && (
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <Typography variant="h2" className="text-2xl font-bold text-gray-800 mb-4">
                Start Your Search
              </Typography>
              <Typography variant="body" className="text-gray-600 mb-8">
                Use the search form to find your perfect accommodation
              </Typography>
              <Button
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <a href="/search">Search Hotels</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage; 