"use client";

import React from 'react';
import Typography from '../atoms/Typography';
import { format, addDays } from 'date-fns';

interface PopularCitiesProps {
  onCitySelect: (city: string) => void;
}

interface PopularCity {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
}

const PopularCities: React.FC<PopularCitiesProps> = ({ onCitySelect }) => {
  const popularCities: PopularCity[] = [
    {
      id: "mumbai",
      name: "Mumbai",
      country: "India",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "The City of Dreams"
    },
    {
      id: "delhi",
      name: "Delhi",
      country: "India",
      image: "https://images.unsplash.com/photo-1524492412937-b28074ba5bb7?w=400&h=300&fit=crop",
      description: "Heart of India"
    },
    {
      id: "bangalore",
      name: "Bangalore",
      country: "India",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
      description: "Garden City"
    },
    {
      id: "hyderabad",
      name: "Hyderabad",
      country: "India",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      description: "City of Pearls"
    },
    {
      id: "chennai",
      name: "Chennai",
      country: "India",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      description: "Gateway to South India"
    },
    {
      id: "kolkata",
      name: "Kolkata",
      country: "India",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      description: "City of Joy"
    },
    {
      id: "pune",
      name: "Pune",
      country: "India",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      description: "Oxford of the East"
    },
    {
      id: "jaipur",
      name: "Jaipur",
      country: "India",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "Pink City"
    },
    {
      id: "bangkok",
      name: "Bangkok",
      country: "Thailand",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
      description: "City of Angels"
    },
    {
      id: "singapore",
      name: "Singapore",
      country: "Singapore",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      description: "Lion City"
    },
    {
      id: "dubai",
      name: "Dubai",
      country: "UAE",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      description: "City of Gold"
    },
    {
      id: "kuala-lumpur",
      name: "Kuala Lumpur",
      country: "Malaysia",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      description: "Garden City of Lights"
    },
    {
      id: "jakarta",
      name: "Jakarta",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      description: "Big Durian"
    },
    {
      id: "goa",
      name: "Goa",
      country: "India",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "Pearl of the Orient"
    },
    {
      id: "varanasi",
      name: "Varanasi",
      country: "India",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
      description: "City of Light"
    }
  ];

  const handleCityClick = (city: PopularCity) => {
    const cityLabel = `${city.name}, ${city.country}`;
    
    // Call the parent callback
    onCitySelect(cityLabel);
    
    // Redirect directly to search results page
    const today = new Date();
    const tomorrow = addDays(today, 1);
    
    const params = new URLSearchParams({
      cityId: city.id,
      city: cityLabel,
      checkIn: format(today, 'yyyy-MM-dd'),
      checkOut: format(tomorrow, 'yyyy-MM-dd'),
      adults: '1',
      children: '0',
      rooms: '1',
    });
    
    // Navigate to search results page
    window.location.href = `/search-results?${params.toString()}`;
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <Typography variant="h3" className="text-2xl font-bold text-gray-800 mb-2">
          Popular Destinations
        </Typography>
        <Typography variant="body" className="text-gray-600">
          Click on a city to search with current dates and 1 adult
        </Typography>
      </div>
      
      <div className="relative">
        {/* Scrollable Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide popular-cities-scroll">
          {popularCities.map((city, index) => (
            <div
              key={index}
              onClick={() => handleCityClick(city)}
              className="flex-shrink-0 w-64 bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              {/* City Image */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <Typography variant="h4" className="font-bold text-white text-lg">
                    {city.name}
                  </Typography>
                  <Typography variant="small" className="text-white/90">
                    {city.country}
                  </Typography>
                </div>
                {/* Click indicator overlay */}
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Typography variant="small" className="text-blue-600 font-semibold">
                      Search Now →
                    </Typography>
                  </div>
                </div>
              </div>
              
              {/* City Info */}
              <div className="p-4">
                <Typography variant="body" className="text-gray-600 text-sm mb-2">
                  {city.description}
                </Typography>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <Typography variant="small" className="text-blue-600 font-medium">
                      Click to search
                    </Typography>
                  </div>
                  <div className="text-right">
                    <Typography variant="small" className="text-gray-500">
                      Current dates
                    </Typography>
                    <Typography variant="small" className="text-gray-500">
                      1 Adult
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Scroll Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PopularCities; 