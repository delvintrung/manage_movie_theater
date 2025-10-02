'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Wifi, Car, Utensils, Accessibility } from 'lucide-react';

interface Theater {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
  };
  facilities: string[];
  isActive: boolean;
}

export default function TheatersPage() {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample data - in real app, this would come from API
  const sampleTheaters: Theater[] = [
    {
      id: '1',
      name: 'Downtown Theater',
      location: {
        address: '123 Cinema Street',
        city: 'Movie City',
        state: 'MC',
        zipCode: '12345',
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      contact: {
        phone: '+1 (555) 123-4567',
        email: 'downtown@theatermylife.com'
      },
      facilities: ['IMAX', '4DX', 'Dolby Atmos', 'Premium Seating', 'Free WiFi', 'Parking', 'Food Court', 'Wheelchair Accessible'],
      isActive: true
    },
    {
      id: '2',
      name: 'Mall Theater',
      location: {
        address: '456 Shopping Center',
        city: 'Mall City',
        state: 'MC',
        zipCode: '12346',
        coordinates: { lat: 40.7589, lng: -73.9851 }
      },
      contact: {
        phone: '+1 (555) 234-5678',
        email: 'mall@theatermylife.com'
      },
      facilities: ['3D', 'Premium Seating', 'Food Court', 'Free WiFi', 'Parking', 'Wheelchair Accessible'],
      isActive: true
    },
    {
      id: '3',
      name: 'City Center Theater',
      location: {
        address: '789 Entertainment District',
        city: 'City Center',
        state: 'CC',
        zipCode: '12347',
        coordinates: { lat: 40.7505, lng: -73.9934 }
      },
      contact: {
        phone: '+1 (555) 345-6789',
        email: 'citycenter@theatermylife.com'
      },
      facilities: ['IMAX', '3D', 'Premium Seating', 'Dolby Atmos', 'Free WiFi', 'Valet Parking', 'Restaurant', 'Wheelchair Accessible'],
      isActive: true
    },
    {
      id: '4',
      name: 'Suburb Theater',
      location: {
        address: '321 Family Plaza',
        city: 'Suburb Town',
        state: 'ST',
        zipCode: '12348',
        coordinates: { lat: 40.6892, lng: -74.0445 }
      },
      contact: {
        phone: '+1 (555) 456-7890',
        email: 'suburb@theatermylife.com'
      },
      facilities: ['2D', '3D', 'Premium Seating', 'Free WiFi', 'Free Parking', 'Food Court', 'Wheelchair Accessible'],
      isActive: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTheaters(sampleTheaters);
      setLoading(false);
    }, 1000);
  }, []);

  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case 'free wifi':
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
      case 'free parking':
      case 'valet parking':
        return <Car className="h-4 w-4" />;
      case 'food court':
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'wheelchair accessible':
        return <Accessibility className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getFacilityColor = (facility: string) => {
    if (facility.includes('IMAX') || facility.includes('4DX')) return 'bg-purple-500';
    if (facility.includes('Premium')) return 'bg-yellow-500';
    if (facility.includes('3D')) return 'bg-blue-500';
    if (facility.includes('Dolby')) return 'bg-green-500';
    return 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading theaters...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Theaters</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the magic of cinema at our state-of-the-art theaters across the city. 
            Each location offers unique amenities and the latest in movie technology.
          </p>
        </div>

        {/* Theaters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {theaters.map((theater) => (
            <Card key={theater.id} className="bg-gray-900 border-gray-800 overflow-hidden hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2">{theater.name}</CardTitle>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">
                        {theater.location.address}, {theater.location.city}, {theater.location.state} {theater.location.zipCode}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">
                    Open
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{theater.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{theater.contact.email}</span>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Facilities & Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {theater.facilities.map((facility, index) => (
                      <Badge 
                        key={index} 
                        className={`${getFacilityColor(facility)} text-white flex items-center space-x-1`}
                      >
                        {getFacilityIcon(facility)}
                        <span>{facility}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                    View Showtimes
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-center">Find Us on the Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Interactive map coming soon</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Use the "Get Directions" button on each theater card for now
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Theater Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Theaters?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎬</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Premium Technology</h3>
                <p className="text-gray-400">
                  Experience movies like never before with IMAX, 4DX, and Dolby Atmos sound systems.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🪑</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Comfortable Seating</h3>
                <p className="text-gray-400">
                  Relax in our premium reclining seats with extra legroom and cup holders.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍿</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Food & Drinks</h3>
                <p className="text-gray-400">
                  Enjoy fresh popcorn, gourmet snacks, and a full bar at select locations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
