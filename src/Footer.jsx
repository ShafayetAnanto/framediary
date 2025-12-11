import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-primary via-primary/98 to-primary/95 border-t border-accent/20 mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 text-center">

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-4">
            <img src="./logo.svg" alt="Logo"/>
            <h3 className="text-xl font-bold text-accent">FrameDiary</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-xs">
              Your movie companion for exploring, tracking, and discovering.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-textD mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 flex gap-5 text-sm md:text-md xl:text-lg">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/watched" className="hover:text-accent transition-colors">Watched</Link></li>
              <li><Link to="/watchlist" className="hover:text-accent transition-colors">Watchlist</Link></li>
              <li><Link to="/favorites" className="hover:text-accent transition-colors">Favorites</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-textD mb-4">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              FrameDiary is a personal project built for movie lovers to explore titles,
              track what they&apos;ve watched, and curate a watchlist — all in one place.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center">
          <p className="text-gray-400 text-sm">
            FrameDiary · © {new Date().getFullYear()}
          </p>

          <p className="text-gray-500 text-xs">
            Powered by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              TMDB
            </a>
            <br className="md:hidden" />
            <span className="hidden md:inline"> • </span>
            This product uses the TMDB API but is not endorsed or certified by TMDB
          </p>
        </div>
      </div>
    </footer>
  );
}
