import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './Nav.jsx'
import Home from './Home.jsx';
import MovieDetails from './MovieDetails.jsx';
import SearchResults from './SearchResults.jsx';
import Watched from './Watched.jsx';
import Watchlist from './Watchlist.jsx';
import Favorites from './Favorites.jsx';
import Footer from './Footer.jsx'

function App() {
  return (
    <>

      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watched" element={<Watched />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;