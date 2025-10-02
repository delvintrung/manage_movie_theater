'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Star, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

const heroMovies = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    description: "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family, the trouble that follows them, the lengths they go to keep each other safe.",
    backdrop: "https://images.unsplash.com/photo-1489599809510-7b0b3b0b3b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    rating: 8.2,
    duration: 192,
    genre: ["Action", "Adventure", "Sci-Fi"],
    releaseDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Black Panther: Wakanda Forever",
    description: "The nation of Wakanda is pitted against intervening world powers as they mourn the loss of King T'Challa.",
    backdrop: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    rating: 7.8,
    duration: 161,
    genre: ["Action", "Adventure", "Drama"],
    releaseDate: "2024-02-10"
  },
  {
    id: 3,
    title: "Top Gun: Maverick",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission.",
    backdrop: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    rating: 8.9,
    duration: 131,
    genre: ["Action", "Drama"],
    releaseDate: "2024-03-05"
  }
];

export function HeroSection() {
  const [currentMovie, setCurrentMovie] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % heroMovies.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const movie = heroMovies[currentMovie];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-lg font-semibold">{movie.rating}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-gray-300" />
                <span className="text-gray-300">{movie.duration} min</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-gray-300" />
                <span className="text-gray-300">{new Date(movie.releaseDate).getFullYear()}</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {movie.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                <Play className="h-5 w-5 mr-2" />
                Book Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-2">
          {heroMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMovie(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentMovie ? 'bg-yellow-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
