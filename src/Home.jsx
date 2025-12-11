import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHero from './HomeHero';
import MovieSection from './MovieSection';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [trending, setTrending] = useState([]);
  const [recent, setRecent] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [classics, setClassics] = useState([]);
  const [olderHits, setOlderHits] = useState([]);
  const [awardWinners, setAwardWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {

      try {
        setLoading(true);
        setFetchError('');

        const [trendingData, recentData, topRatedData, classicsData, olderHitsData, awardWinnersData] = await Promise.all([
          // Trending
          fetch('/api/tmdb?endpoint=/trending/movie/week').then((res) => res.json()),

          // Recent
          fetch('/api/tmdb?endpoint=/movie/now_playing').then((res) => res.json()),

          // Top Rated
          fetch('/api/tmdb?endpoint=/movie/top_rated').then((res) => res.json()),

          // Classics
          fetch('/api/tmdb?endpoint=/discover/movie&primary_release_date.lte=1989-12-31&sort_by=vote_average.desc&vote_count.gte=1000').then((res) => res.json()),

          // Older Hits
          fetch('/api/tmdb?endpoint=/discover/movie&primary_release_date.gte=1990-01-01&primary_release_date.lte=2010-12-31&sort_by=popularity.desc&vote_count.gte=1000').then((res) => res.json()),

          // Award Winners
          fetch('/api/tmdb?endpoint=/discover/movie&sort_by=vote_average.desc&vote_count.gte=5000&primary_release_year=2020|2021|2022|2023|2024|2025').then((res) => res.json())
        ]);

        setTrending(trendingData.results?.slice(0, 20) || []);
        setRecent(recentData.results?.slice(0, 20) || []);
        setTopRated(topRatedData.results?.slice(0, 20) || []);
        setClassics(classicsData.results?.slice(0, 20) || []);
        setOlderHits(olderHitsData.results?.slice(0, 20) || []);
        setAwardWinners(awardWinnersData.results?.slice(0, 20) || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setFetchError('Unable to load movies right now. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }
    navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <main className="bg-primary min-h-screen text-white">
      <HomeHero
        searchQuery={searchQuery}
        onQueryChange={setSearchQuery}
        onKeyDown={handleKeyDown}
        onSearch={handleSearch}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {fetchError && (
          <div className="bg-yellow-500 bg-opacity-20 border border-yellow-500 text-yellow-200 p-4 rounded-lg mb-8">
            {fetchError}
          </div>
        )}
        <MovieSection
          title="Trending This Week"
          movies={trending}
          loading={loading}
          imageBaseUrl={TMDB_IMAGE_BASE}
        />
        <MovieSection
          title="Recently Released"
          movies={recent}
          loading={loading}
          imageBaseUrl={TMDB_IMAGE_BASE}
        />
        <MovieSection
          title="Top Rated"
          movies={topRated}
          loading={loading}
          imageBaseUrl={TMDB_IMAGE_BASE}
        />
        <MovieSection
          title="Classics"
          movies={classics}
          loading={loading}
          imageBaseUrl={TMDB_IMAGE_BASE}
        />
        <MovieSection
          title="Older Hits (1990-2010)"
          movies={olderHits}
          loading={loading}
          imageBaseUrl={TMDB_IMAGE_BASE}
        />
        <MovieSection
          title="Award Winners"
          movies={awardWinners}
          loading={loading}
          imageBaseUrl={TMDB_IMAGE_BASE}
        />
      </div>
    </main>
  );
};

export default Home;