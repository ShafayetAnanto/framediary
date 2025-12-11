import React, { useState, useEffect } from 'react';
import { Clipboard, Trash2, X } from 'lucide-react';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const navigate = useNavigate()
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = () => {
    try {
      setLoading(true);
      const watchlistData = localStorage.getItem('watchlist');
      if (watchlistData) {
        setWatchlist(JSON.parse(watchlistData));
      } else {
        setWatchlist([]);
      }
    } catch (error) {
      console.log('Error loading watchlist:', error);
      setWatchlist([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = (movieId) => {
    try {
      const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  const handleClearClick = () => {
    setShowConfirmModal(true);
  };

  const confirmClearWatchlist = () => {
    try {
      localStorage.removeItem('watchlist');
      setWatchlist([]);
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error clearing watchlist:', error);
    }
  };

  const cancelClear = () => {
    setShowConfirmModal(false);
  };

  return (
    <main className="bg-primary min-h-screen text-white">
      <div className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg lg:text-2xl font-bold text-white flex items-center gap-2">
                <Clipboard className="w-8 h-8" />
                My Watchlist
              </h1>
              <p className="text-gray-400 mt-2">
                {watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} in watchlist.
              </p>
            </div>
            {watchlist.length > 0 && (
              <button
                onClick={handleClearClick}
                className="cursor-pointer bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] border border-red-400/30 hover:border-red-300/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-primary h-72 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : watchlist.length === 0 ? (
          <div className="text-center py-16">
            <Clipboard className="w-24 h-24 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Your watchlist is empty</h3>
            <p className="text-gray-500 mb-6">Start adding movies you want to watch!</p>
            <button
              onClick={() => navigate('/')}
              className="cursor-pointer bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(153,41,234,0.5)] border border-secondary/30 hover:border-secondary/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...watchlist].reverse().map((movie) => (
              <div key={movie.id} className="relative group">
                <MovieCard
                  movie={movie}
                  imageBaseUrl="https://image.tmdb.org/t/p/w500"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWatchlist(movie.id);
                  }}
                  className="cursor-pointer absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] border border-red-400/30 hover:border-red-300/50 hover:scale-110 active:scale-95 z-20"
                  title="Remove from watchlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 rounded-lg shadow-2xl max-w-md w-full p-6 border border-gray-800 animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-500 p-2 rounded-full">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-white">Clear Entire Watchlist?</h2>
              </div>
              <button
                onClick={cancelClear}
                className="cursor-pointer text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5 hover:animate-[spin_0.2s_linear_1_forwards]" />
              </button>
            </div>

            <p className="text-gray-400 mb-6 ml-14">
              This will remove all {watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} from your watchlist. This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelClear}
                className="cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearWatchlist}
                className="cursor-pointer px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] border border-red-400/30 hover:border-red-300/50 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Watchlist;