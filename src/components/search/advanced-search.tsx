'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Star, Clock, MapPin } from 'lucide-react';
import { toast } from 'sonner';


interface SearchFilters {
  query: string;
  genre: string;
  rating: string;
  duration: string;
  year: string;
  theater: string;
  date: string;
  time: string;
}

interface SearchResult {
  id: string;
  type: 'movie' | 'showtime' | 'theater';
  title: string;
  description: string;
  image?: string;
  rating?: number;
  duration?: number;
  genre?: string[];
  theater?: string;
  date?: string;
  time?: string;
  price?: number;
}

export function AdvancedSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    genre: '',
    rating: '',
    duration: '',
    year: '',
    theater: '',
    date: '',
    time: ''
  });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];
  const ratings = ['8+', '7+', '6+', '5+'];
  const durations = ['Under 90 min', '90-120 min', '120-150 min', 'Over 150 min'];
  const years = ['2024', '2023', '2022', '2021', '2020'];
  const theaters = ['Downtown Theater', 'Mall Theater', 'City Center Theater', 'Suburb Theater'];
  const timeSlots = ['Morning (9:00-12:00)', 'Afternoon (12:00-17:00)', 'Evening (17:00-21:00)', 'Night (21:00-24:00)'];

  // Sample search results
  const sampleResults: SearchResult[] = [
    {
      id: '1',
      type: 'movie',
      title: 'Avatar: The Way of Water',
      description: 'Set more than a decade after the events of the first film...',
      image: 'https://images.unsplash.com/photo-1489599809510-7b0b3b0b3b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      rating: 8.2,
      duration: 192,
      genre: ['Action', 'Adventure', 'Sci-Fi']
    },
    {
      id: '2',
      type: 'showtime',
      title: 'Avatar: The Way of Water - IMAX',
      description: 'Downtown Theater • Screen 1',
      theater: 'Downtown Theater',
      date: '2024-01-20',
      time: '19:30',
      price: 18
    },
    {
      id: '3',
      type: 'theater',
      title: 'Downtown Theater',
      description: '123 Cinema Street, Movie City • IMAX, 4DX, Premium Seating',
      image: 'https://images.unsplash.com/photo-1489599809510-7b0b3b0b3b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  const handleSearch = async () => {
    if (!filters.query.trim() && !filters.genre && !filters.theater) {
      toast.error('Please enter a search term or select filters');
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults(sampleResults);
      setIsSearching(false);
      toast.success(`Found ${sampleResults.length} results`);
    }, 1000);
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      genre: '',
      rating: '',
      duration: '',
      year: '',
      theater: '',
      date: '',
      time: ''
    });
    setResults([]);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'movie':
        return '🎬';
      case 'showtime':
        return '🎫';
      case 'theater':
        return '🏢';
      default:
        return '🔍';
    }
  };

  const getResultColor = (type: string) => {
    switch (type) {
      case 'movie':
        return 'bg-blue-500';
      case 'showtime':
        return 'bg-green-500';
      case 'theater':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <>
      {/* Search Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="border-gray-700 text-gray-300 hover:bg-gray-800"
      >
        <Search className="h-4 w-4 mr-2" />
        Advanced Search
      </Button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Advanced Search
                </CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Search Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Search Query</label>
                <Input
                  placeholder="Search movies, theaters, or showtimes..."
                  value={filters.query}
                  onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>

              {/* Filters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Genre</label>
                  <Select value={filters.genre} onValueChange={(value) => setFilters(prev => ({ ...prev, genre: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="" className="text-white hover:bg-gray-700">All Genres</SelectItem>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-700">
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Rating</label>
                  <Select value={filters.rating} onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="" className="text-white hover:bg-gray-700">All Ratings</SelectItem>
                      {ratings.map((rating) => (
                        <SelectItem key={rating} value={rating} className="text-white hover:bg-gray-700">
                          {rating} Stars
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Duration</label>
                  <Select value={filters.duration} onValueChange={(value) => setFilters(prev => ({ ...prev, duration: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="" className="text-white hover:bg-gray-700">Any Duration</SelectItem>
                      {durations.map((duration) => (
                        <SelectItem key={duration} value={duration} className="text-white hover:bg-gray-700">
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Year</label>
                  <Select value={filters.year} onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="" className="text-white hover:bg-gray-700">Any Year</SelectItem>
                      {years.map((year) => (
                        <SelectItem key={year} value={year} className="text-white hover:bg-gray-700">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Theater</label>
                  <Select value={filters.theater} onValueChange={(value) => setFilters(prev => ({ ...prev, theater: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select theater" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="" className="text-white hover:bg-gray-700">All Theaters</SelectItem>
                      {theaters.map((theater) => (
                        <SelectItem key={theater} value={theater} className="text-white hover:bg-gray-700">
                          {theater}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Date</label>
                  <Input
                    type="date"
                    value={filters.date}
                    onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Clear Filters
                </Button>
              </div>

              {/* Search Results */}
              {results.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Search Results</h3>
                  <div className="space-y-3">
                    {results.map((result) => (
                      <div key={result.id} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {result.image ? (
                              <img
                                src={result.image}
                                alt={result.title}
                                className="w-16 h-20 object-cover rounded"
                              />
                            ) : (
                              <div className="w-16 h-20 bg-gray-700 rounded flex items-center justify-center text-2xl">
                                {getResultIcon(result.type)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={`${getResultColor(result.type)} text-white`}>
                                {result.type}
                              </Badge>
                              <h4 className="font-semibold text-white">{result.title}</h4>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{result.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              {result.rating && (
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3" />
                                  <span>{result.rating}</span>
                                </div>
                              )}
                              {result.duration && (
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{result.duration} min</span>
                                </div>
                              )}
                              {result.theater && (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{result.theater}</span>
                                </div>
                              )}
                              {result.price && (
                                <span className="text-yellow-500 font-semibold">${result.price}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
