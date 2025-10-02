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

interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  duration: number;
  genre: string[];
  releaseDate: string;
  status: 'now_showing' | 'upcoming' | 'ended';
  ageRating: string;
}

// Sample data - in real app, this would come from API
const sampleMovies: Movie[] = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    poster: "https://images.unsplash.com/photo-1489599809510-7b0b3b0b3b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 8.2,
    duration: 192,
    genre: ["Action", "Adventure", "Sci-Fi"],
    releaseDate: "2024-01-15",
    status: "now_showing",
    ageRating: "PG-13"
  },
  {
    id: 2,
    title: "Black Panther: Wakanda Forever",
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 7.8,
    duration: 161,
    genre: ["Action", "Adventure", "Drama"],
    releaseDate: "2024-02-10",
    status: "now_showing",
    ageRating: "PG-13"
  },
  {
    id: 3,
    title: "Top Gun: Maverick",
    poster: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 8.9,
    duration: 131,
    genre: ["Action", "Drama"],
    releaseDate: "2024-03-05",
    status: "now_showing",
    ageRating: "PG-13"
  },
  {
    id: 4,
    title: "Spider-Man: No Way Home",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 8.4,
    duration: 148,
    genre: ["Action", "Adventure", "Fantasy"],
    releaseDate: "2024-04-20",
    status: "upcoming",
    ageRating: "PG-13"
  },
  {
    id: 5,
    title: "The Batman",
    poster: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 7.8,
    duration: 176,
    genre: ["Action", "Crime", "Drama"],
    releaseDate: "2024-05-15",
    status: "upcoming",
    ageRating: "PG-13"
  },
  {
    id: 6,
    title: "Doctor Strange in the Multiverse of Madness",
    poster: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 6.9,
    duration: 126,
    genre: ["Action", "Adventure", "Fantasy"],
    releaseDate: "2024-06-10",
    status: "upcoming",
    ageRating: "PG-13"
  }
];

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const genres = ['all', 'Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];
  const ratings = ['all', '8+', '7+', '6+', '5+'];

  useEffect(() => {
    fetch('/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data.movies))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  useEffect(() => {
    let filtered = movies;

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
              {nowShowingMovies.map((movie) => (
                <Card key={movie.id} className="bg-gray-900 border-gray-800 overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Trailer
                      </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
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
                    <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 hover:text-white text-black">
                      <Link href={`/movies/${movie.id}`}>
                        Book Now
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {upcomingMovies.map((movie) => (
                <Card key={movie.id} className="bg-gray-900 border-gray-800 overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                        <Play className="h-4 w-4 mr-2" />
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
