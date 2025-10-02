'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export function QuickSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const locations = [
    'All Locations',
    'Downtown Theater',
    'Mall Theater',
    'City Center Theater',
    'Suburb Theater'
  ];

  const timeSlots = [
    'Any Time',
    'Morning (9:00 AM - 12:00 PM)',
    'Afternoon (12:00 PM - 5:00 PM)',
    'Evening (5:00 PM - 9:00 PM)',
    'Night (9:00 PM - 12:00 AM)'
  ];

  const handleSearch = () => {
    // Implement search functionality
    console.log('Search:', { searchQuery, selectedLocation, selectedDate, selectedTime });
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Perfect Movie Experience
          </h2>
          <p className="text-gray-400 text-lg">
            Search for movies, theaters, and showtimes in your area
          </p>
        </div>

        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Movie Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Search Movies
              </label>
              <Input
                placeholder="Enter movie name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {locations.map((location) => (
                    <SelectItem key={location} value={location} className="text-white hover:bg-gray-700">
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Date
              </label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Time
              </label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time} className="text-white hover:bg-gray-700">
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5 mr-2" />
              Search Movies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
