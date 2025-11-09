'use client';

import {useEffect, useState} from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, Clock, Play } from 'lucide-react';
import Link from 'next/link';
import {IMovie} from '@/lib/types';



interface MovieCarouselProps {
  title: string;
  status: 'now_showing' | 'upcoming' | 'ended';
}

export function MovieCarousel({ title, status }: MovieCarouselProps) {
    const [movies, setMovies] = useState<IMovie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const fetchMovies = async () => {
      try {
          const response = await fetch(`/api/movies?status=${status}&limit=20`);
            const data = await response.json();
            setMovies(data.movies);
      }
        catch (error) {
            console.log('Error fetching movies:', error);
        }
  }

  useEffect(() => {
      fetchMovies()
  },[])

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
              <div key={movie._id} className="w-full flex-shrink-0 px-2" style={{ width: `${100 / itemsPerView}%` }}>
                <Card className="bg-gray-900 border-gray-800 overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <img
                      src={movie.posterImage}
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
                      <Link href={`/movies/${movie._id}`}>
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
