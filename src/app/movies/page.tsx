'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Star, Clock, Play } from 'lucide-react';
import Link from 'next/link';
import CardMovie from "@/components/CardMovie";

interface Movie {
  id: number;
  title: string;
  posterImage: string;
  rating: number;
  duration: number;
  genre: string[];
  releaseDate: string;
  status: 'now_showing' | 'upcoming' | 'ended';
  ageRating: string;
}


export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const genres = ['all', 'Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];
  const ratings = ['all', '8+', '7+', '6+', '5+'];


  const fetchMovies = async () => {
      try {
          setIsLoading(true);
            const response = await fetch('/api/movies');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFilteredMovies(data.movies);
      }
        catch (error) {
            console.error('Error fetching movies:', error);
        }
        finally {
            setIsLoading(false)
      }
  }
  useEffect(() => {
    fetchMovies();
  }, []);


  useEffect(() => {
    let filtered = filteredMovies;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie => movie.genre.includes(selectedGenre));
    }

    // Filter by rating
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter(movie => movie.rating >= minRating);
    }

    setFilteredMovies(filtered);
  }, [searchQuery, selectedGenre, selectedRating]);

  const nowShowingMovies = filteredMovies.filter(movie => movie.status === 'now_showing');
  const upcomingMovies = filteredMovies.filter(movie => movie.status === 'upcoming');

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading theaters...</div>
            </div>
        )
    }
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Movies</h1>
          <p className="text-gray-400 text-lg">
            Discover the latest blockbusters and upcoming releases
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-700">
                    {genre === 'all' ? 'All Genres' : genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="All Ratings" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {ratings.map((rating) => (
                  <SelectItem key={rating} value={rating} className="text-white hover:bg-gray-700">
                    {rating === 'all' ? 'All Ratings' : `${rating} Stars`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Movie Tabs */}
        <Tabs defaultValue="now-showing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-gray-800">
            <TabsTrigger value="now-showing" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Now Showing ({nowShowingMovies.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Coming Soon ({upcomingMovies.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="now-showing" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nowShowingMovies.map((movie, index) => (
                <CardMovie props={movie} key={index}/>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {upcomingMovies.map((movie) => (
                <Card key={movie.id} className="bg-gray-900 border-gray-800 overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <img
                      src={movie.posterImage}
                      alt={movie.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                            <Play className="h-4 w-4 mr-2"/>
                            Watch Trailer
                        </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
                      {movie.ageRating}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{movie.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{movie.duration} min</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {movie.genre.slice(0, 2).map((genre, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Link href={`/movies/${movie.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
