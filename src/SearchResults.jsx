import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';

const TMDB_API_KEY = 'd7853f23bce5f7e3309e35b7765ee06c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const IS_API_KEY_MISSING = TMDB_API_KEY.length === 0;

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryFromUrl = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setSearchQuery(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    if (IS_API_KEY_MISSING || !queryFromUrl.trim()) {
      setResults([]);
      setError(IS_API_KEY_MISSING ? 'Add your TMDB API key to enable search.' : '');
      setLoading(false);
      return;
    }

    let ignore = false;
    const controller = new AbortController();

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(queryFromUrl)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();
        if (!ignore) {
          setResults(data.results || []);
        }
      } catch (err) {
        if (ignore || err.name === 'AbortError') {
          return;
        }
        console.error('Error searching movies:', err);
        setError('Failed to search movies. Please try again.');
        setResults([]);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [queryFromUrl]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }
    setSearchParams({ query: searchQuery.trim() });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const renderBody = () => {
    if (IS_API_KEY_MISSING) {
      return (
        <div className="text-center py-16">
          <Film className="w-24 h-24 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">API key missing</h3>
          <p className="text-gray-500">
            Set <code className="text-gray-200">VITE_TMDB_API_KEY</code> in a .env file and restart the dev server.
          </p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="bg-gray-800 h-72 rounded-lg animate-pulse" />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 p-4 rounded-lg">
          {error}
        </div>
      );
    }

    if (!queryFromUrl.trim()) {
      return (
        <div className="text-center py-16">
          <Film className="w-24 h-24 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">Start searching</h3>
          <p className="text-gray-500">Enter a movie title to see results</p>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className="text-center py-16">
          <Film className="w-24 h-24 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No movies found</h3>
          <p className="text-gray-500">Try a different search term</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {results.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            apiBaseUrl={TMDB_BASE_URL}
            imageBaseUrl={TMDB_IMAGE_BASE}
            apiKey={TMDB_API_KEY}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="bg-primary min-h-screen text-white">
      <div className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center sm:px-6 lg:px-8">
          <button
            onClick={handleBack}
            className="cursor-pointer text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className=" hidden lg:block w-8 h-10 mr-2" />
          </button>

          <div className="w-80 md:w-2xl lg:w-3xl">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onKeyDown={handleKeyDown}
              onSubmit={handleSearch}
              placeholder="Search for movies..."
              variant="inline"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {queryFromUrl ? `Search Results for "${queryFromUrl}"` : 'Search Movies'}
          </h2>
          {!IS_API_KEY_MISSING && queryFromUrl && (
            <p className="text-gray-400 mt-2">
              {loading ? 'Searching...' : `Found ${results.length} result${results.length !== 1 ? 's' : ''}`}
            </p>
          )}
        </div>
        {renderBody()}
      </div>
    </main>
  );
};

export default SearchResults;