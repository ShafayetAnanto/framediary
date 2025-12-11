import React from 'react';
import SearchBar from './SearchBar';

const HomeHero = ({ searchQuery, onQueryChange, onKeyDown, onSearch }) => (
  <div className="bg-primary py-16">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Discover Your Next Favorite Movie
      </h1>
      <p className="text-gray-300 mb-10 text-lg">
        Explore thousands of movies and build your personal collection
      </p>
      <SearchBar
        value={searchQuery}
        onChange={onQueryChange}
        onKeyDown={onKeyDown}
        onSubmit={onSearch}
        placeholder="What are you looking for?"
        variant="hero"
      />
    </div>
  </div>
);

export default HomeHero;

