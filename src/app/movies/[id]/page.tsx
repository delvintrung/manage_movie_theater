'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, Clock, Calendar, Play, MapPin, Users } from 'lucide-react';
import { toast } from 'sonner';
import { MovieReviews } from '@/components/movies/movie-reviews';
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string[];
  duration: number;
  releaseDate: string;
  director: string;
  cast: string[];
  trailerUrl: string;
  posterImage: string;
  backdropImage: string;
  rating: number;
  ageRating: string;
  language: string;
  subtitles: string[];
  status: 'upcoming' | 'now_showing' | 'ended';
}

interface Showtime {
  id: string;
  date: string;
  time: string;
  endTime: string;
  theater: string;
  screen: string;
  screenType: string;
  availableSeats: number;
  totalSeats: number;
  price: {
    regular: number;
    premium: number;
    vip: number;
  };
}

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  // Sample movie data - in real app, this would come from API
  const sampleMovie: Movie = {
    id: 1,
    title: "Avatar: The Way of Water",
    description: "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family, the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure. Directed by James Cameron and produced by Cameron and Jon Landau, the Lightstorm Entertainment production stars Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang and Kate Winslet.",
    genre: ["Action", "Adventure", "Sci-Fi"],
    duration: 192,
    releaseDate: "2024-01-15",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang", "Kate Winslet"],
    trailerUrl: "https://www.youtube.com/watch?v=d9MyW72ELq0",
    posterImage: "https://images.unsplash.com/photo-1489599809510-7b0b3b0b3b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    backdropImage: "https://images.unsplash.com/photo-1489599809510-7b0b3b0b3b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    rating: 8.2,
    ageRating: "PG-13",
    language: "English",
    subtitles: ["Spanish", "French", "German"],
    status: "now_showing"
  };

  const sampleShowtimes: Showtime[] = [
    {
      id: "1",
      date: "2024-01-20",
      time: "10:00",
      endTime: "13:12",
      theater: "Downtown Theater",
      screen: "Screen 1",
      screenType: "IMAX",
      availableSeats: 45,
      totalSeats: 200,
      price: { regular: 12, premium: 18, vip: 25 }
    },
    {
      id: "2",
      date: "2024-01-20",
      time: "13:30",
      endTime: "16:42",
      theater: "Downtown Theater",
      screen: "Screen 1",
      screenType: "IMAX",
      availableSeats: 32,
      totalSeats: 200,
      price: { regular: 12, premium: 18, vip: 25 }
    },
    {
      id: "3",
      date: "2024-01-20",
      time: "17:00",
      endTime: "20:12",
      theater: "Downtown Theater",
      screen: "Screen 1",
      screenType: "IMAX",
      availableSeats: 28,
      totalSeats: 200,
      price: { regular: 12, premium: 18, vip: 25 }
    },
    {
      id: "4",
      date: "2024-01-20",
      time: "20:30",
      endTime: "23:42",
      theater: "Downtown Theater",
      screen: "Screen 1",
      screenType: "IMAX",
      availableSeats: 15,
      totalSeats: 200,
      price: { regular: 12, premium: 18, vip: 25 }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMovie(sampleMovie);
      setShowtimes(sampleShowtimes);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleBookNow = (showtimeId: string) => {
    router.push(`/booking/${showtimeId}`);
  };

  const handleWatchTrailer = () => {
    if (movie?.trailerUrl) {
      window.open(movie.trailerUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.backdropImage})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <Badge className="bg-yellow-500 text-black text-lg px-4 py-2">
                {movie.ageRating}
              </Badge>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-lg font-semibold">{movie.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-gray-300" />
                <span className="text-gray-300">{movie.duration} min</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((genre, index) => (
                <Badge key={index} variant="outline" className="border-gray-400 text-gray-300">
                  {genre}
                </Badge>
              ))}
            </div>
            <div className="flex space-x-4">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                onClick={handleWatchTrailer}
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Trailer
              </Button>
              {movie.status === 'now_showing' && (
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-400 " onClick={() => handleBookNow("2")}>
                  Book Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900 border border-gray-800">
                <TabsTrigger value="overview" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="cast" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  Cast & Crew
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Synopsis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cast" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Cast & Crew</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Director</h4>
                      <p className="text-gray-300">{movie.director}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Cast</h4>
                      <div className="flex flex-wrap gap-2">
                        {movie.cast.map((actor, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {actor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <MovieReviews movieId={movie.id.toString()} movieTitle={movie.title} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Showtimes */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Showtimes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-3">
                  {showtimes
                    .filter(showtime => showtime.date === selectedDate)
                    .map((showtime) => (
                      <div key={showtime.id} className="p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-white">{showtime.time}</h4>
                            <p className="text-sm text-gray-400">
                              {showtime.theater} • {showtime.screen} ({showtime.screenType})
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">
                              {showtime.availableSeats} seats available
                            </p>
                            <p className="text-sm text-white">
                              From ${showtime.price.regular}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleBookNow(showtime.id)}
                          className="w-full bg-yellow-500 hover:bg-yellow-600 hover:text-white text-black"
                          disabled={showtime.availableSeats === 0}
                        >
                          {showtime.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                        </Button>
                      </div>
                    ))}
                </div>

                {showtimes.filter(showtime => showtime.date === selectedDate).length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No showtimes available for this date</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Movie Info */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Movie Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Release Date:</span>
                  <span className="text-white">{new Date(movie.releaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{movie.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span className="text-white">{movie.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtitles:</span>
                  <span className="text-white">{movie.subtitles.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Age Rating:</span>
                  <Badge className="bg-yellow-500 text-black">{movie.ageRating}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
