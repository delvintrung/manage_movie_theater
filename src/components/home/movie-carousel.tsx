'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, Clock, Play } from 'lucide-react';
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
}

interface MovieCarouselProps {
  title: string;
  status: 'now_showing' | 'upcoming' | 'ended';
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
    status: "now_showing"
  },
  {
    id: 2,
    title: "Black Panther: Wakanda Forever",
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 7.8,
    duration: 161,
    genre: ["Action", "Adventure", "Drama"],
    releaseDate: "2024-02-10",
    status: "now_showing"
  },
  {
    id: 3,
    title: "Top Gun: Maverick",
    poster: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 8.9,
    duration: 131,
    genre: ["Action", "Drama"],
    releaseDate: "2024-03-05",
    status: "now_showing"
  },
  {
    id: 4,
    title: "Spider-Man: No Way Home",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 8.4,
    duration: 148,
    genre: ["Action", "Adventure", "Fantasy"],
    releaseDate: "2024-04-20",
    status: "upcoming"
  },
  {
    id: 5,
    title: "The Batman",
    poster: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 7.8,
    duration: 176,
    genre: ["Action", "Crime", "Drama"],
    releaseDate: "2024-05-15",
    status: "upcoming"
  },
  {
    id: 6,
    title: "Doctor Strange in the Multiverse of Madness",
    poster: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 6.9,
    duration: 126,
    genre: ["Action", "Adventure", "Fantasy"],
    releaseDate: "2024-06-10",
    status: "upcoming"
  }
];

export function MovieCarousel({ title, status }: MovieCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const movies = sampleMovies.filter(movie => movie.status === status);
  const itemsPerView = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= movies.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, movies.length - itemsPerView) : prev - 1
    );
  };

  if (movies.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex + itemsPerView >= movies.length}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="w-full flex-shrink-0 px-2" style={{ width: `${100 / itemsPerView}%` }}>
                <Card className="bg-gray-900 border-gray-800 overflow-hidden group hover:scale-105 transition-transform duration-300">
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
                      {status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
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
                    <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                      <Link href={`/movies/${movie.id}`}>
                        {status === 'now_showing' ? 'Book Now' : 'View Details'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
