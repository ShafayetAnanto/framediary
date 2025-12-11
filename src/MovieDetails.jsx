import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Film, ArrowLeft, Plus, Check, Heart, Star, Loader2, Eye } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);
  const [watchProviders, setWatchProviders] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [isInWatched, setIsInWatched] = useState(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError('');
        setIsInWatchlist(false);
        setIsInFavorites(false);
        setIsInWatched(false);

        const movieResponse = await fetch(
          `/api/tmdb?endpoint=/movie/${id}`,
          { signal: controller.signal }
        );

        if (!movieResponse.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const movieData = await movieResponse.json();

        const creditsResponse = await fetch(
          `/api/tmdb?endpoint=/movie/${id}/credits`,
          { signal: controller.signal }
        );

        if (!creditsResponse.ok) {
          throw new Error('Failed to fetch credits');
        }

        const creditsData = await creditsResponse.json();

        const videosResponse = await fetch(
          `/api/tmdb?endpoint=/movie/${id}/videos`,
          { signal: controller.signal }
        );

        const videosData = videosResponse.ok ? await videosResponse.json() : { results: [] };

        const providersResponse = await fetch(
          `/api/tmdb?endpoint=/movie/${id}/watch/providers`,
          { signal: controller.signal }
        );

        const providersData = providersResponse.ok ? await providersResponse.json() : {};

        const similarResponse = await fetch(
          `/api/tmdb?endpoint=/movie/${id}/similar`,
          { signal: controller.signal }
        );

        const similarData = similarResponse.ok ? await similarResponse.json() : { results: [] };

        if (!ignore) {
          setMovie(movieData);
          setCredits(creditsData);
          setVideos(videosData.results || []);
          setWatchProviders(providersData.results || {});
          setSimilarMovies(similarData.results?.slice(0, 6) || []);
          checkIfInLists(movieData);
        }
      } catch (err) {
        if (ignore || err.name === 'AbortError') {
          return;
        }
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again.');
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchMovieDetails();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [id]);

  const checkIfInLists = (movieData) => {
    try {
      const watchlistData = localStorage.getItem('watchlist');
      if (watchlistData) {
        const watchlist = JSON.parse(watchlistData);
        setIsInWatchlist(watchlist.some(m => m.id === movieData.id));
      }
    } catch (error) {
      console.log('Error checking watchlist:', error);
    }

    try {
      const favoritesData = localStorage.getItem('favorites');
      if (favoritesData) {
        const favorites = JSON.parse(favoritesData);
        setIsInFavorites(favorites.some(m => m.id === movieData.id));
      }
    } catch (error) {
      console.log('Error checking favorites:', error);
    }

    try {
      const watchedData = localStorage.getItem('watched');
      if (watchedData) {
        const watched = JSON.parse(watchedData);
        setIsInWatched(watched.some(m => m.id === movieData.id));
      }
    } catch (error) {
      console.log('Error checking watched:', error);
    }
  };

  const toggleWatchlist = () => {
    try {
      let watchlist = [];
      const watchlistData = localStorage.getItem('watchlist');

      if (watchlistData) {
        watchlist = JSON.parse(watchlistData);
      }

      if (isInWatchlist) {
        watchlist = watchlist.filter(m => m.id !== movie.id);
      } else {
        watchlist.push(movie);
      }

      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Error toggling watchlist:', error);
      alert('Failed to update watchlist. Please try again.');
    }
  };

  const toggleFavorites = () => {
    try {
      let favorites = [];
      const favoritesData = localStorage.getItem('favorites');

      if (favoritesData) {
        favorites = JSON.parse(favoritesData);
      }

      if (isInFavorites) {
        favorites = favorites.filter(m => m.id !== movie.id);
      } else {
        favorites.push(movie);
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsInFavorites(!isInFavorites);
    } catch (error) {
      console.error('Error toggling favorites:', error);
      alert('Failed to update favorites. Please try again.');
    }
  };

  const toggleWatched = () => {
    try {
      let watched = [];
      const watchedData = localStorage.getItem('watched');

      if (watchedData) {
        watched = JSON.parse(watchedData);
      }

      if (isInWatched) {
        watched = watched.filter(m => m.id !== movie.id);
      } else {
        watched.push(movie);
      }

      localStorage.setItem('watched', JSON.stringify(watched));
      setIsInWatched(!isInWatched);
    } catch (error) {
      console.error('Error toggling watched:', error);
      alert('Failed to update watched. Please try again.');
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getKeyCrewMembers = () => {
    if (!credits?.crew) return [];

    const roles = ['Director', 'Writer', 'Screenplay', 'Producer'];
    const keyMembers = [];

    roles.forEach(role => {
      const member = credits.crew.find(c => c.job === role);
      if (member && !keyMembers.some(m => m.id === member.id)) {
        keyMembers.push({ ...member, job: role });
      }
    });

    return keyMembers.slice(0, 4);
  };

  const getTrailer = () => {
    if (!videos || videos.length === 0) return null;

    const trailer = videos.find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    );

    return trailer || videos.find(v => v.site === 'YouTube');
  };

  if (loading) {
    return (
      <div className="min-h-[90vh] bg-primary flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-2"><Loader2 className='animate-spin' /><span>Rolling the film...</span></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-white text-xl">{error || 'Movie not found'}</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-primary text-textL">
      <button
        onClick={() => navigate(-1)}
        className="flex cursor-pointer fixed top-37 left-2 z-40 hover:bg-accent/60 bg-opacity-50 text-white rounded-full px-4 py-2 items-center space-x-2 hover:bg-opacity-70 transition"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover object-[center_30%] opacity-40"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <Film className="w-16 h-16 text-gray-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 md:-mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-48 sm:w-56 md:w-64 rounded-lg shadow-2xl"
              />
            ) : (
              <div className="w-48 sm:w-56 md:w-64 h-72 sm:h-84 md:h-96 bg-gray-800 rounded-lg flex items-center justify-center">
                <Film className="w-16 h-16 text-gray-600" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-400 mb-4">
              <span>{movie.release_date?.split('-')[0]}</span>
              {credits?.crew?.find(c => c.job === 'Director')?.name && (
                <>
                  <span>•</span>
                  <span>Directed by {credits.crew.find(c => c.job === 'Director').name}</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
              <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-white font-semibold">{movie.vote_average?.toFixed(1)}</span>
              </div>
              {movie.runtime && (
                <span className="text-gray-400">{formatRuntime(movie.runtime)}</span>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-700 transition"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className='mb-3 text-[1.1rem] text-white'>{movie.tagline}</div>

            <div className="mb-6">
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {credits?.cast && credits.cast.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Top Cast</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {credits.cast.slice(0, 6).map((member) => (
                    <div key={member.id} className="flex flex-col">
                      <div className="w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 mb-2">
                        {member.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600">
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm font-medium">
                        {member.name}
                      </p>
                      {member.character && (
                        <p className="text-gray-500 text-xs">
                          {member.character}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {getKeyCrewMembers().length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Crew</h3>
                <div className="grid grid-cols-2 gap-3">
                  {getKeyCrewMembers().map((member) => (
                    <div key={`${member.id}-${member.job}`}>
                      <p className="text-white font-medium text-sm">{member.name}</p>
                      <p className="text-gray-500 text-xs">{member.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={toggleWatched}
                className={`${isInWatched
                  ? 'bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 shadow-lg hover:shadow-[0_0_25px_rgba(153,41,234,0.5)] border border-secondary/30 hover:border-secondary/50'
                  : 'bg-gradient-to-r from-gray-800/60 to-gray-800/40 hover:from-gray-700/60 hover:to-gray-700/40 shadow-md hover:shadow-lg border border-gray-700/40 hover:border-gray-600/50'
                  } cursor-pointer text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto flex items-center justify-center gap-2`}
              >
                <Eye className={`w-5 h-5 ${isInWatched ? 'text-white' : ''}`} />
                {isInWatched ? 'Watched' : 'Mark as Watched'}
              </button>

              <button
                onClick={toggleWatchlist}
                className={`${isInWatchlist
                  ? 'bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 shadow-lg hover:shadow-[0_0_25px_rgba(153,41,234,0.5)] border border-secondary/30 hover:border-secondary/50'
                  : 'bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] border border-accent/30 hover:border-accent/50'
                  } cursor-pointer text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto flex items-center justify-center gap-2`}
              >
                {isInWatchlist ? (
                  <>
                    <Check className="w-5 h-5" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add to Watchlist
                  </>
                )}
              </button>

              <button
                onClick={toggleFavorites}
                className={`${isInFavorites
                  ? 'bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 shadow-lg hover:shadow-[0_0_25px_rgba(153,41,234,0.5)] border border-secondary/30 hover:border-secondary/50'
                  : 'bg-gradient-to-r from-gray-800/60 to-gray-800/40 hover:from-gray-700/60 hover:to-gray-700/40 shadow-md hover:shadow-lg border border-gray-700/40 hover:border-gray-600/50'
                  } cursor-pointer text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto flex items-center justify-center gap-2`}
              >
                <Heart className={`w-5 h-5 ${isInFavorites ? 'fill-white' : ''}`} />
                {isInFavorites ? 'In Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>

        {getTrailer() && (
          <div className="mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-6">Trailer</h2>
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getTrailer().key}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {watchProviders && (watchProviders.US?.flatrate || watchProviders.US?.rent || watchProviders.US?.buy) && (
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Where to Watch</h2>
            <div className="space-y-4">
              {watchProviders.US?.flatrate && (
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Stream</h3>
                  <div className="flex flex-wrap gap-3">
                    {watchProviders.US.flatrate.map((provider) => (
                      <div key={provider.provider_id} className="text-center">
                        <img
                          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          alt={provider.provider_name}
                          className="w-12 h-12 rounded-lg"
                          title={provider.provider_name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {watchProviders.US?.rent && (
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Rent</h3>
                  <div className="flex flex-wrap gap-3">
                    {watchProviders.US.rent.map((provider) => (
                      <div key={provider.provider_id} className="text-center">
                        <img
                          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          alt={provider.provider_name}
                          className="w-12 h-12 rounded-lg"
                          title={provider.provider_name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {watchProviders.US?.buy && (
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Buy</h3>
                  <div className="flex flex-wrap gap-3">
                    {watchProviders.US.buy.map((provider) => (
                      <div key={provider.provider_id} className="text-center">
                        <img
                          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          alt={provider.provider_name}
                          className="w-12 h-12 rounded-lg"
                          title={provider.provider_name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {similarMovies && similarMovies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similarMovies.map((similarMovie) => (
                <div
                  key={similarMovie.id}
                  onClick={() => navigate(`/movie/${similarMovie.id}`)}
                  className="cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-lg mb-2">
                    {similarMovie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                        alt={similarMovie.title}
                        className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full aspect-[2/3] bg-gray-800 flex items-center justify-center">
                        <Film className="w-8 h-8 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-accent transition">
                    {similarMovie.title}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {similarMovie.release_date?.split('-')[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;