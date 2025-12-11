import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full sticky top-0 left-0 z-50 bg-gradient-to-b from-primary via-primary/98 to-primary/95 backdrop-blur-xl border-b border-accent/20 shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 relative">
          <Link to="/" className="relative z-10">
            <div className="flex items-center gap-1 group">
              <div className="relative">
                <img
                  src="./logo.svg"
                  alt="Logo"
                  className="h-8 md:h-10 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"
                />
                <div className="absolute inset-0 bg-accent/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-textD via-accent to-textD bg-[length:200%_100%] bg-clip-text text-transparent group-hover:bg-[position:100%_0] transition-all duration-700">
                FrameDiary
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex gap-2 text-textD text-sm font-medium">
              <Link to="/">
                <li className="cursor-pointer relative px-5 py-2.5 overflow-hidden group rounded-lg">
                  <span className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 transition-all duration-500 ease-out ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  <span className={`relative z-10 transition-colors duration-300 ${isActive('/') ? 'text-accent' : 'group-hover:text-accent'
                    }`}>
                    Home
                  </span>
                </li>
              </Link>
              <Link to="/watched">
                <li className="cursor-pointer relative px-5 py-2.5 overflow-hidden group rounded-lg">
                  <span className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 transition-all duration-500 ease-out ${isActive('/watched') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  <span className={`relative z-10 transition-colors duration-300 ${isActive('/watched') ? 'text-accent' : 'group-hover:text-accent'
                    }`}>
                    Watched
                  </span>
                </li>
              </Link>
              <Link to="/watchlist">
                <li className="cursor-pointer relative px-5 py-2.5 overflow-hidden group rounded-lg">
                  <span className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 transition-all duration-500 ease-out ${isActive('/watchlist') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  <span className={`relative z-10 transition-colors duration-300 ${isActive('/watchlist') ? 'text-accent' : 'group-hover:text-accent'
                    }`}>
                    Watchlist
                  </span>
                </li>
              </Link>
              <Link to="/favorites">
                <li className="cursor-pointer relative px-5 py-2.5 overflow-hidden group rounded-lg">
                  <span className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 transition-all duration-500 ease-out ${isActive('/favorites') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  <span className={`relative z-10 transition-colors duration-300 ${isActive('/favorites') ? 'text-accent' : 'group-hover:text-accent'
                    }`}>
                    Favorites
                  </span>
                </li>
              </Link>
            </ul>

            <div className="relative">
              {!isSearchOpen ? (
                <button
                  onClick={handleSearchClick}
                  className="cursor-pointer p-2.5 rounded-xl text-gray-400 hover:text-accent hover:bg-accent/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] border border-transparent hover:border-accent/30"
                  aria-label="Open search"
                >
                  <Search className="w-6 h-6" />
                </button>
              ) : (
                <div className="flex items-center bg-gradient-to-r from-gray-800/60 to-gray-800/40 backdrop-blur-md rounded-2xl border border-accent/30 transition-all focus-within:border-accent/50 focus-within:shadow-[0_0_20px_rgba(236,72,153,0.2)] animate-in fade-in slide-in-from-right-5 duration-300 min-w-0 max-w-[200px] xl:max-w-none">
                  <Search className="w-4 h-4 text-accent ml-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Find a movie…"
                    className="bg-transparent text-white px-3 py-3 outline-none text-sm placeholder:text-gray-500 w-48 lg:w-56 xl:w-64"
                    autoFocus
                  />
                  <button
                    onClick={handleCloseSearch}
                    className="cursor-pointer text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-all duration-200 mr-2"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="cursor-pointer lg:hidden p-2.5 rounded-xl text-gray-400 hover:text-accent hover:bg-accent/10 transition-all duration-300 border border-transparent hover:border-accent/30 relative z-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div className="lg:hidden pb-4">
          {!isSearchOpen ? (
            <button
              onClick={handleSearchClick}
              className="cursor-pointer w-full flex items-center gap-3 bg-gradient-to-r from-gray-800/60 to-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700/40 px-5 py-3 text-gray-400 hover:text-accent hover:border-accent/30 transition-all duration-300"
            >
              <Search className="w-5 h-5" />
              <span className="text-sm">Find a movie…</span>
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex-[0_1_calc(100%-76px)] flex items-center gap-2 bg-gradient-to-r from-gray-800/60 to-gray-800/40 backdrop-blur-md rounded-2xl border border-accent/30 transition-all focus-within:border-accent/50 focus-within:shadow-[0_0_20px_rgba(236,72,153,0.2)] min-w-0">
                <Search className="w-4 h-4 text-accent ml-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Find a movie…"
                  className="flex-1 bg-transparent text-white px-3 py-3 outline-none text-sm placeholder:text-gray-500 min-w-0"
                  autoFocus
                />
                <button
                  onClick={handleCloseSearch}
                  className="cursor-pointer p-2 text-gray-400 hover:text-accent transition-colors mr-1"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={onSearch}
                className="cursor-pointer bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white px-4 py-3 rounded-2xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center gap-2 flex-shrink-0"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </nav>

      {isMobileMenuOpen && (
        <>
          <div className="fixed top-20 left-0 right-0 bg-gradient-to-b from-primary via-primary/98 to-primary/95 backdrop-blur-xl border-b border-accent/20 shadow-2xl z-50 lg:hidden animate-in slide-in-from-top duration-300">
            <ul className="flex flex-col py-2 px-4 pb-6">
              <Link to="/" onClick={handleMobileNavClick}>
                <li className="cursor-pointer relative overflow-hidden rounded-2xl mb-2 group">
                  <span className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 transition-all duration-500 ease-out ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  <div className={`relative z-10 px-6 py-4 transition-colors duration-300 flex items-center gap-4 text-lg ${isActive('/') ? 'text-accent' : 'text-textD group-hover:text-accent'
                    }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </div>
                </li>
              </Link>
              <Link to="/watched" onClick={handleMobileNavClick}>
                <li className="cursor-pointer relative overflow-hidden rounded-2xl mb-2 group">
                  <span className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 transition-all duration-500 ease-out ${isActive('/watched') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  <div className={`relative z-10 px-6 py-4 transition-colors duration-300 flex items-center gap-4 text-lg ${isActive('/watched') ? 'text-accent' : 'text-textD group-hover:text-accent'
                    }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Watched
                  </div>
                </li>
              </Link>
              <Link to="/watchlist" onClick={handleMobileNavClick}>
                <li className="cursor-pointer relative overflow-hidden rounded-2xl mb-2 group">
                  <span className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 transition-all duration-500 ease-out ${isActive('/watchlist') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  <div className={`relative z-10 px-6 py-4 transition-colors duration-300 flex items-center gap-4 text-lg ${isActive('/watchlist') ? 'text-accent' : 'text-textD group-hover:text-accent'
                    }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Watchlist
                  </div>
                </li>
              </Link>
              <Link to="/favorites" onClick={handleMobileNavClick}>
                <li className="cursor-pointer relative overflow-hidden rounded-2xl mb-2 group">
                  <span className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 transition-all duration-500 ease-out ${isActive('/favorites') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  <div className={`relative z-10 px-6 py-4 transition-colors duration-300 flex items-center gap-4 text-lg ${isActive('/favorites') ? 'text-accent' : 'text-textD group-hover:text-accent'
                    }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Favorites
                  </div>
                </li>
              </Link>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}