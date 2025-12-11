import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieSection = ({ title, movies = [], loading, imageBaseUrl, onMovieClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesPerPage = 4;
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const visibleMovies = movies.slice(
    currentIndex * moviesPerPage,
    (currentIndex + 1) * moviesPerPage
  );

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-4">{title}</h2>
        <span className="text-gray-400 text-sm mb-4">{movies.length} titles</span>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-800 h-72 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="text-gray-400 text-center py-10 bg-gray-800 rounded-lg">
          Nothing to show yet. Try searching instead.
        </div>
      ) : (
        <div className="relative group">
          {totalPages > 1 && (
            <button
              onClick={handlePrevious}
              className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] border border-accent/30
              opacity-100 translate-x-2 
              md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-2"
              aria-label="Previous movies"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {visibleMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                imageBaseUrl={imageBaseUrl}
                onClick={onMovieClick}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <button
              onClick={handleNext}
              className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] border border-accent/30
              opacity-100 -translate-x-2 
              md:opacity-0 md:translate-x-4 md:group-hover:opacity-100 md:group-hover:-translate-x-2"
              aria-label="Next movies"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`cursor-pointer h-2 rounded-full transition-all duration-300 ${i === currentIndex
                    ? 'bg-accent w-8 shadow-[0_0_10px_rgba(236,72,153,0.5)]'
                    : 'bg-gray-600 hover:bg-accent/60 w-2'
                    }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MovieSection;