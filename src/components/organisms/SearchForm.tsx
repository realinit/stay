"use client";

import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import { format, addDays, isAfter, isBefore, startOfDay } from 'date-fns';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import 'react-calendar/dist/Calendar.css';

interface SearchFormProps {
  onSearch: (searchData: SearchData) => void;
  initialData?: Partial<SearchData>;
  onCitySelect?: (city: string) => void;
}

interface SearchData {
  cityId: string;
  city: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

interface CityOption {
  value: string;
  label: string;
  country: string;
}

const SearchForm = React.forwardRef<{ setFormDataFromExternal: (city: string) => void }, SearchFormProps>(
  ({ onSearch, initialData, onCitySelect }, ref) => {
    const [formData, setFormData] = useState<SearchData>({
      cityId: '',
      city: '',
      checkIn: '',
      checkOut: '',
      adults: 2,
      children: 0,
      rooms: 1,
      ...initialData
    });

    const [isLoading, setIsLoading] = useState(false);
    const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
    const [showTravelerModal, setShowTravelerModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const datePickerRef = useRef<HTMLDivElement>(null);

    // Mock cities data with cityId
    const mockCities = [
      { value: 'mumbai', label: 'Mumbai, Maharashtra', country: 'India' },
      { value: 'delhi', label: 'Delhi, Delhi', country: 'India' },
      { value: 'bangalore', label: 'Bangalore, Karnataka', country: 'India' },
      { value: 'hyderabad', label: 'Hyderabad, Telangana', country: 'India' },
      { value: 'chennai', label: 'Chennai, Tamil Nadu', country: 'India' },
      { value: 'kolkata', label: 'Kolkata, West Bengal', country: 'India' },
      { value: 'pune', label: 'Pune, Maharashtra', country: 'India' },
      { value: 'ahmedabad', label: 'Ahmedabad, Gujarat', country: 'India' },
      { value: 'jaipur', label: 'Jaipur, Rajasthan', country: 'India' },
      { value: 'lucknow', label: 'Lucknow, Uttar Pradesh', country: 'India' },
      { value: 'bangkok', label: 'Bangkok, Thailand', country: 'Thailand' },
      { value: 'singapore', label: 'Singapore, Singapore', country: 'Singapore' },
      { value: 'dubai', label: 'Dubai, UAE', country: 'UAE' },
      { value: 'kuala-lumpur', label: 'Kuala Lumpur, Malaysia', country: 'Malaysia' },
      { value: 'jakarta', label: 'Jakarta, Indonesia', country: 'Indonesia' },
      { value: 'goa', label: 'Goa, India', country: 'India' },
      { value: 'varanasi', label: 'Varanasi, Uttar Pradesh', country: 'India' },
    ];

    // Method to set form data from external component
    const setFormDataFromExternal = (city: string) => {
      const today = new Date();
      const tomorrow = addDays(today, 1);
      
      // Extract cityId from the city string (assuming format: "City, Country")
      const cityName = city.split(',')[0].trim();
      const cityId = cityName.toLowerCase().replace(/\s+/g, '-');
      
      const newFormData = {
        cityId: cityId,
        city: city,
        checkIn: format(today, 'yyyy-MM-dd'),
        checkOut: format(tomorrow, 'yyyy-MM-dd'),
        adults: 1,
        children: 0,
        rooms: 1,
      };
      
      setFormData(newFormData);
      setDateRange([today, tomorrow]);
      
      // Call the onCitySelect callback if provided
      if (onCitySelect) {
        onCitySelect(city);
      }

      // Automatically redirect to search results page
      const params = new URLSearchParams({
        cityId: cityId,
        city: city,
        checkIn: format(today, 'yyyy-MM-dd'),
        checkOut: format(tomorrow, 'yyyy-MM-dd'),
        adults: '1',
        children: '0',
        rooms: '1',
      });
      
      // Navigate to search results page
      window.location.href = `/search-results?${params.toString()}`;
    };

    // Expose the method to parent component
    React.useImperativeHandle(ref, () => ({
      setFormDataFromExternal
    }));

    // Simulate async city search
    const searchCities = async (query: string) => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filtered = mockCities.filter(city => 
        city.label.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase())
      );
      
      setCityOptions(filtered);
      setIsLoading(false);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData(prev => ({ ...prev, city: value }));
      
      if (value.length >= 2) {
        searchCities(value);
      } else {
        setCityOptions([]);
      }
    };

    const selectCity = (city: CityOption) => {
      setFormData(prev => ({ 
        ...prev, 
        city: city.label,
        cityId: city.value 
      }));
      setCityOptions([]);
    };

    const handleTravelerChange = (type: 'adults' | 'children' | 'rooms', operation: 'increase' | 'decrease') => {
      setFormData(prev => {
        const newValue = operation === 'increase' ? prev[type] + 1 : prev[type] - 1;
        
        // Validation rules
        if (type === 'adults' && newValue < 1) return prev;
        if (type === 'children' && newValue < 0) return prev;
        if (type === 'rooms' && newValue < 1) return prev;
        if (type === 'rooms' && newValue > 10) return prev;
        if (type === 'adults' && newValue > 20) return prev;
        if (type === 'children' && newValue > 10) return prev;
        
        return { ...prev, [type]: newValue };
      });
    };

    const handleDateChange = (value: any) => {
      if (Array.isArray(value)) {
        const [start, end] = value;
        setDateRange([start, end]);
        
        if (start && end) {
          setFormData(prev => ({
            ...prev,
            checkIn: format(start, 'yyyy-MM-dd'),
            checkOut: format(end, 'yyyy-MM-dd'),
          }));
          setShowDatePicker(false);
        }
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.city && formData.checkIn && formData.checkOut) {
        // Build URL with search parameters
        const params = new URLSearchParams({
          cityId: formData.cityId,
          city: formData.city,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          adults: formData.adults.toString(),
          children: formData.children.toString(),
          rooms: formData.rooms.toString(),
        });
        
        // Navigate to search results page
        window.location.href = `/search-results?${params.toString()}`;
      }
    };

    // Set default dates
    useEffect(() => {
      const today = new Date();
      const tomorrow = addDays(today, 1);
      
      setDateRange([today, tomorrow]);
      setFormData(prev => ({
        ...prev,
        checkIn: format(today, 'yyyy-MM-dd'),
        checkOut: format(tomorrow, 'yyyy-MM-dd'),
      }));
    }, []);

    // Close date picker when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
          setShowDatePicker(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div className="bg-white rounded-2xl shadow-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* City Search */}
            <div className="lg:col-span-1 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={formData.city}
                  onChange={handleCityChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                  required
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  </div>
                )}
                
                {/* City Suggestions */}
                {cityOptions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {cityOptions.map((city, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectCity(city)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">{city.label}</div>
                        <div className="text-sm text-gray-500">{city.country}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date Range */}
            <div className="lg:col-span-1 relative" ref={datePickerRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in & Check-out
              </label>
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left bg-white"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-900">
                    {dateRange[0] ? format(dateRange[0], 'MMM dd') : 'Check-in'} - {dateRange[1] ? format(dateRange[1], 'MMM dd, yyyy') : 'Check-out'}
                  </span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </button>

              {/* Date Picker Modal */}
              {showDatePicker && (
                <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-4 min-w-[320px]">
                  <Calendar
                    onChange={handleDateChange}
                    value={dateRange}
                    selectRange={true}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 365)}
                    className="border-0 shadow-none"
                    tileClassName={({ date, view }) => {
                      if (view === 'month') {
                        const today = startOfDay(new Date());
                        const selectedStart = dateRange[0] ? startOfDay(dateRange[0]) : null;
                        const selectedEnd = dateRange[1] ? startOfDay(dateRange[1]) : null;
                        const currentDate = startOfDay(date);
                        
                        if (selectedStart && selectedEnd && currentDate >= selectedStart && currentDate <= selectedEnd) {
                          if (currentDate.getTime() === selectedStart.getTime()) {
                            return 'bg-blue-600 text-white rounded-l-lg';
                          } else if (currentDate.getTime() === selectedEnd.getTime()) {
                            return 'bg-blue-600 text-white rounded-r-lg';
                          } else {
                            return 'bg-blue-100 text-blue-800';
                          }
                        }
                        
                        if (isBefore(date, today)) {
                          return 'text-gray-300 cursor-not-allowed';
                        }
                      }
                      return '';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Travelers */}
            <div className="lg:col-span-1 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travelers
              </label>
              <button
                type="button"
                onClick={() => setShowTravelerModal(!showTravelerModal)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left bg-white"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-900">
                    {formData.adults} Adult{formData.adults !== 1 ? 's' : ''}
                    {formData.children > 0 && `, ${formData.children} Child${formData.children !== 1 ? 'ren' : ''}`}
                    {formData.rooms > 1 && `, ${formData.rooms} Room${formData.rooms !== 1 ? 's' : ''}`}
                  </span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Traveler Modal */}
              {showTravelerModal && (
                <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-4">
                  <div className="space-y-4">
                    {/* Adults */}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">Adults</div>
                        <div className="text-sm text-gray-500">Ages 13 or above</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => handleTravelerChange('adults', 'decrease')}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          disabled={formData.adults <= 1}
                        >
                          <span className="text-gray-600">-</span>
                        </button>
                        <span className="w-8 text-center font-medium text-gray-600">{formData.adults}</span>
                        <button
                          type="button"
                          onClick={() => handleTravelerChange('adults', 'increase')}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          disabled={formData.adults >= 20}
                        >
                          <span className="text-gray-600">+</span>
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">Children</div>
                        <div className="text-sm text-gray-500">Ages 0 to 12</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => handleTravelerChange('children', 'decrease')}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          disabled={formData.children <= 0}
                        >
                          <span className="text-gray-600">-</span>
                        </button>
                        <span className="w-8 text-center font-medium text-gray-600">{formData.children}</span>
                        <button
                          type="button"
                          onClick={() => handleTravelerChange('children', 'increase')}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          disabled={formData.children >= 10}
                        >
                          <span className="text-gray-600">+</span>
                        </button>
                      </div>
                    </div>

                    {/* Rooms */}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">Rooms</div>
                        <div className="text-sm text-gray-500">Number of rooms</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => handleTravelerChange('rooms', 'decrease')}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          disabled={formData.rooms <= 1}
                        >
                          <span className="text-gray-600">-</span>
                        </button>
                        <span className="w-8 text-center font-medium text-gray-600">{formData.rooms}</span>
                        <button
                          type="button"
                          onClick={() => handleTravelerChange('rooms', 'increase')}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          disabled={formData.rooms >= 10}
                        >
                          <span className="text-gray-600">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
            <div className="lg:col-span-1 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 invisible">
                Search
              </label>
              {/* Search Button */}
              <div className="">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg px-12 py-2 text-lg w-full"
                >
                  Search Hotels
                </Button>
              </div>
            </div>
            
          </div>

          
        </form>
      </div>
    );
  }
);

export default SearchForm; 