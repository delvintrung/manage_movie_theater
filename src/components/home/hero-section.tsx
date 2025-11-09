'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Star, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {IMovie} from "@/lib/types";


export function HeroSection() {
  const [currentMovie, setCurrentMovie] = useState(0);
    const [heroMovies, setHeroMovies] = useState<IMovie[]>([]);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

  const fetchMovieHeroData = async () => {
      try {
          const response = await fetch('/api/movies?status=now_showing&limit=3');
            const data = await response.json();
          setHeroMovies(data.movies)
      } catch (e) {
          console.log(e);
      }
  }



  useEffect(() => {
      fetchMovieHeroData()
      setIsClient(true)
  }, []);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setCurrentMovie((prev) => (prev + 1) % heroMovies.length);
    //     }, 5000);
    //
    //     return () => clearInterval(timer);
    // }, []);

    if (!isClient) {
        return <div>Tải placeholder...</div>;
    }

  const movie = heroMovies[currentMovie];

    const handleOpenTrailer = (trailerUrl: string) => {
        window.open(trailerUrl, '_blank');
    }

    const handleBookNow = (movieId: string) => {
        router.push(`/movies/${movieId}`);
    }

  return (
    <section className="relative h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${movie?.backdropImage})` }}
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
                <span className="text-lg font-semibold">{movie?.rating}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-gray-300" />
                <span className="text-gray-300">{movie?.duration} min</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-gray-300" />
                <span className="text-gray-300">{new Date(movie?.releaseDate).getFullYear()}</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {movie?.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie?.genre.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {movie?.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold cursor-pointer" onClick={() => handleBookNow(movie?._id)}>
                <Play className="h-5 w-5 mr-2" />
                Book Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black" onClick={()=> {
                  handleOpenTrailer(movie?.trailerUrl)
              }}>
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
