import React from 'react';
import { Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, imageBaseUrl }) => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={handleMovieClick}
      className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
    >
      <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-800">
        {movie.poster_path ? (
          <img
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-72 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-72 bg-gray-700 flex items-center justify-center">
            <Film className="w-16 h-16 text-gray-500" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
          <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-gray-300 text-xs">{movie.release_date?.split('-')[0] || 'N/A'}</span>
            <span className="text-yellow-400 text-xs flex items-center">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;