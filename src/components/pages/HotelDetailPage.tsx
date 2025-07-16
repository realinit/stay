"use client";

import React, { useState, useEffect } from 'react';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Header from '../organisms/Header';
import VirtualizedListCommon from '../atoms/VirtualizedListCommon';

interface HotelDetailPageProps {
  hotelId: string;
}

interface HotelDetail {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  amenities: string[];
  type: string;
  distance: string;
  description: string;
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    children: string;
    pets: string;
  };
  reviews: {
    id: number;
    user: string;
    rating: number;
    date: string;
    comment: string;
    avatar: string;
  }[];
  rooms: {
    id: number;
    name: string;
    type: string;
    price: number;
    capacity: number;
    amenities: string[];
    images: string[];
  }[];
}

const HotelDetailPage: React.FC<HotelDetailPageProps> = ({ hotelId }) => {
  const [hotel, setHotel] = useState<HotelDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock hotel data
  const mockHotel: HotelDetail = {
    id: hotelId,
    name: "Jackstay Premium Hotel",
    location: "Mumbai, Maharashtra",
    rating: 4.5,
    price: 2500,
    originalPrice: 3200,
    discount: 22,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
    ],
    amenities: ["WiFi", "AC", "Restaurant", "Pool", "Spa", "Gym", "Parking", "Business Center", "Room Service", "Laundry"],
    type: "Hotel",
    distance: "2.5 km from center",
    description: "Experience luxury and comfort at Jackstay Premium Hotel, located in the heart of Mumbai. Our hotel offers world-class amenities, spacious rooms, and exceptional service. Perfect for both business and leisure travelers.",
    policies: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation until 24 hours before check-in",
      children: "Children of all ages are welcome",
      pets: "Pets are not allowed",
    },
    reviews: [
      {
        id: 1,
        user: "Sarah Johnson",
        rating: 5,
        date: "2024-01-15",
        comment: "Excellent hotel with great amenities. The staff was very friendly and helpful. Room was clean and comfortable.",
        avatar: "👩‍🦰"
      },
      {
        id: 2,
        user: "Michael Chen",
        rating: 4,
        date: "2024-01-10",
        comment: "Good location and clean rooms. The breakfast buffet was amazing. Would definitely recommend.",
        avatar: "👨‍🦱"
      },
      {
        id: 3,
        user: "Priya Patel",
        rating: 5,
        date: "2024-01-08",
        comment: "Perfect stay! The room was spacious and the view was beautiful. Staff went above and beyond.",
        avatar: "👩‍🦳"
      },
      {
        id: 4,
        user: "David Wilson",
        rating: 4,
        date: "2024-01-05",
        comment: "Great value for money. Clean facilities and good service. Location is convenient for business meetings.",
        avatar: "👨‍🦲"
      }
    ],
    rooms: [
      {
        id: 1,
        name: "Deluxe Room",
        type: "1 King Bed",
        price: 2500,
        capacity: 2,
        amenities: ["WiFi", "AC", "TV", "Mini Bar"],
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"]
      },
      {
        id: 2,
        name: "Premium Suite",
        type: "1 King Bed + Living Room",
        price: 4500,
        capacity: 3,
        amenities: ["WiFi", "AC", "TV", "Mini Bar", "Balcony", "City View"],
        images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop"]
      },
      {
        id: 3,
        name: "Family Room",
        type: "2 Queen Beds",
        price: 3500,
        capacity: 4,
        amenities: ["WiFi", "AC", "TV", "Mini Bar", "Extra Space"],
        images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop"]
      }
    ]
  };

  // Generate additional mock rooms for virtualization demo
  const generateMockRooms = () => {
    const additionalRooms = [];
    const roomNames = [
      "Executive Suite", "Business Room", "Standard Room", "Luxury Suite", "Junior Suite",
      "Presidential Suite", "Garden View Room", "Ocean View Room", "City View Room", "Mountain View Room",
      "Deluxe Suite", "Premium Room", "Comfort Room", "Economy Room", "Studio Suite",
      "Penthouse Suite", "Honeymoon Suite", "Accessible Room", "Connecting Rooms", "Villa Suite",
      "Royal Suite", "Imperial Suite", "Grand Suite", "Master Suite", "Superior Room",
      "Classic Room", "Modern Room", "Traditional Room", "Contemporary Room", "Boutique Room"
    ];

    const roomTypes = [
      "1 King Bed", "2 Queen Beds", "1 King Bed + Living Room", "1 Queen Bed", "2 Twin Beds",
      "1 King Bed + Balcony", "1 Queen Bed + City View", "2 King Beds", "1 King Bed + Sofa",
      "1 Queen Bed + Balcony", "1 King Bed + Ocean View", "2 Queen Beds + Living Room"
    ];

    const amenitiesList = [
      ["WiFi", "AC", "TV", "Mini Bar"],
      ["WiFi", "AC", "TV", "Mini Bar", "Balcony"],
      ["WiFi", "AC", "TV", "Mini Bar", "City View"],
      ["WiFi", "AC", "TV", "Mini Bar", "Ocean View"],
      ["WiFi", "AC", "TV", "Mini Bar", "Mountain View"],
      ["WiFi", "AC", "TV", "Mini Bar", "Garden View"],
      ["WiFi", "AC", "TV", "Mini Bar", "Balcony", "City View"],
      ["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Ocean View"],
      ["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Mountain View"],
      ["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Garden View"]
    ];

    const images = [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop"
    ];

    for (let i = 4; i <= 100; i++) {
      const randomName = roomNames[Math.floor(Math.random() * roomNames.length)];
      const randomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
      const randomAmenities = amenitiesList[Math.floor(Math.random() * amenitiesList.length)];
      const randomImage = images[Math.floor(Math.random() * images.length)];
      const randomPrice = 1500 + Math.random() * 5000;
      const randomCapacity = Math.floor(Math.random() * 4) + 1;

      additionalRooms.push({
        id: i,
        name: randomName,
        type: randomType,
        price: Math.round(randomPrice / 100) * 100,
        capacity: randomCapacity,
        amenities: randomAmenities,
        images: [randomImage]
      });
    }

    return additionalRooms;
  };

  // Room card component for virtualization
  const RoomCard = ({ index, result: room }: any) => {
    if (!room) return null;

    return (
      <div
        className={`border rounded-xl p-4 cursor-pointer transition-all mb-4 ${
          selectedRoom === room.id
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => setSelectedRoom(room.id)}
      >
        <div className="flex items-start space-x-4">
          <img
            src={room.images[0]}
            alt={room.name}
            className="w-24 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
            <Typography variant="h4" className="font-semibold text-gray-800 mb-1">
              {room.name}
            </Typography>
            <Typography variant="small" className="text-gray-600 mb-2">
              {room.type} • Up to {room.capacity} guests
            </Typography>
            <div className="flex flex-wrap gap-1 mb-3">
              {room.amenities.slice(0, 3).map((amenity: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{room.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <Typography variant="h4" className="font-bold text-gray-800">
              ₹{room.price.toLocaleString()}
            </Typography>
            <Typography variant="small" className="text-gray-600">
              per night
            </Typography>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const hotelWithMoreRooms = {
        ...mockHotel,
        rooms: [...mockHotel.rooms, ...generateMockRooms()]
      };
      setHotel(hotelWithMoreRooms);
      setIsLoading(false);
    }, 1000);
  }, [hotelId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Jackstay" />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <Typography variant="h3" className="text-xl font-semibold text-gray-800">
                Loading hotel details...
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Jackstay" />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
              <Typography variant="h3" className="text-xl font-semibold text-gray-800 mb-4">
                Hotel not found
              </Typography>
              <Button variant="primary" size="lg">
                <a href="/search">Back to Search</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Jackstay" />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Hotel Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <Typography variant="h1" className="text-3xl font-bold text-gray-800 mb-2">
                  {hotel.name}
                </Typography>
                <Typography variant="body" className="text-gray-600 mb-4">
                  {hotel.location} • {hotel.distance}
                </Typography>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(hotel.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600">{hotel.rating}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{hotel.type}</span>
                </div>
              </div>
              <div className="text-right">
                <Typography variant="h2" className="text-2xl font-bold text-gray-800">
                  ₹{hotel.price.toLocaleString()}
                </Typography>
                {hotel.originalPrice > hotel.price && (
                  <Typography variant="body" className="text-gray-500 line-through">
                    ₹{hotel.originalPrice.toLocaleString()}
                  </Typography>
                )}
                <Typography variant="small" className="text-gray-600">
                  per night
                </Typography>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-96">
                  <img
                    src={hotel.images[selectedImage]}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2">
                      {hotel.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-16 h-12 rounded-lg overflow-hidden border-2 ${
                            selectedImage === index ? 'border-blue-500' : 'border-white'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${hotel.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <Typography variant="h3" className="text-xl font-semibold text-gray-800 mb-4">
                  About this property
                </Typography>
                <Typography variant="body" className="text-gray-700 leading-relaxed">
                  {hotel.description}
                </Typography>
              </div>

              {/* Amenities */}
              <div>
                <Typography variant="h3" className="text-xl font-semibold text-gray-800 mb-4">
                  Amenities
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Types */}
              <div>
                <Typography variant="h3" className="text-xl font-semibold text-gray-800 mb-4">
                  Available Rooms ({hotel.rooms.length} rooms)
                </Typography>
                
                {/* Performance Indicator */}
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-medium">
                      {hotel.rooms.length} total rooms
                    </span>
                  </div>
                </div>

                <div className="h-[600px]">
                  <VirtualizedListCommon list={hotel.rooms} CardComponent={RoomCard} />
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Policies */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Typography variant="h4" className="text-lg font-semibold text-gray-800 mb-4">
                  Hotel Policies
                </Typography>
                <div className="space-y-4">
                  <div>
                    <Typography variant="small" className="font-medium text-gray-700">
                      Check-in
                    </Typography>
                    <Typography variant="body" className="text-gray-600">
                      {hotel.policies.checkIn}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="font-medium text-gray-700">
                      Check-out
                    </Typography>
                    <Typography variant="body" className="text-gray-600">
                      {hotel.policies.checkOut}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="font-medium text-gray-700">
                      Cancellation
                    </Typography>
                    <Typography variant="body" className="text-gray-600">
                      {hotel.policies.cancellation}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="font-medium text-gray-700">
                      Children
                    </Typography>
                    <Typography variant="body" className="text-gray-600">
                      {hotel.policies.children}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="font-medium text-gray-700">
                      Pets
                    </Typography>
                    <Typography variant="body" className="text-gray-600">
                      {hotel.policies.pets}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Typography variant="h4" className="text-lg font-semibold text-gray-800 mb-4">
                  Location
                </Typography>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <Typography variant="body" className="text-gray-500">
                    Map will be displayed here
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage; 