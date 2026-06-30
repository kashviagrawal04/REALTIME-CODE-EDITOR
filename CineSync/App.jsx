import React, { useState, useEffect } from "react";
import Login from "./Login.jsx";
import Favourites from "./Favourites.jsx";
import moviesData from "./movies.json";

// ── Search component (inline, no missing import needed) ──────────────────────
const Search = ({ searchTerm, setSearchTerm }) => (
  <div className="search mt-8">
    <div>
      <img src="/search.svg" alt="Search" />
      <input
        type="text"
        placeholder="Search movies by title…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute right-3 text-gray-400 hover:text-white text-xl leading-none"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  </div>
);

// ── MovieCard component (inline, no missing import needed) ───────────────────
const MovieCard = ({ movie, toggleLike }) => {
  const year = movie.release_date?.split("-")[0] ?? "N/A";

  return (
    <li className="movie-card group cursor-pointer">
      <a href={movie.videoUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={movie.poster_url?.trim()}
          alt={movie.title}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/300x450/0f0d23/cecefb?text=No+Poster";
          }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </a>

      <div className="mt-3 flex items-start justify-between gap-2">
        <h3 title={movie.title}>{movie.title}</h3>
        <button
          onClick={() => toggleLike(movie.id)}
          aria-label={movie.liked ? "Unlike" : "Like"}
          className="shrink-0 text-xl transition-transform duration-200 hover:scale-125"
        >
          {movie.liked ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="content">
        <div className="rating">
          <img src="/star.svg" alt="Rating" />
          <p>{movie.rating?.toFixed(1)}</p>
        </div>
        <span>•</span>
        <span className="lang">{movie.language}</span>
        <span>•</span>
        <span className="year">{year}</span>
      </div>
    </li>
  );
};

// ── Root App ─────────────────────────────────────────────────────────────────
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [view, setView] = useState("home");

  useEffect(() => {
    try {
      const withLikes = moviesData.movies.map((m) => ({ ...m, liked: false }));
      setMovies(withLikes);
    } catch (err) {
      console.error(err);
      setErrorMessage("Error loading movies. Please try again later.");
    }
  }, []);

  const toggleLike = (id) =>
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, liked: !m.liked } : m))
    );

  // ── Search filtering (was missing in original) ───────────────────────────
  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const likedCount = movies.filter((m) => m.liked).length;

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">

        {/* ── Navbar ── */}
        <nav className="flex justify-between items-center py-4 px-6 bg-black/80 backdrop-blur shadow-md w-full fixed top-0 left-0 z-50">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="h-10 w-auto" alt="CineSync Logo" />
            <span className="text-white font-bold text-lg tracking-wide hidden sm:block">
              CineSync
            </span>
          </div>

          <ul className="flex space-x-2">
            {[
              { label: "Home", key: "home" },
              { label: "Login", key: "login" },
              {
                label: (
                  <span className="flex items-center gap-1">
                    Favourites
                    {likedCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                        {likedCount}
                      </span>
                    )}
                  </span>
                ),
                key: "favourites",
              },
            ].map(({ label, key }) => (
              <li key={key}>
                <button
                  onClick={() => setView(key)}
                  className={`text-white px-4 py-2 rounded-lg transition duration-200 text-sm font-medium
                    ${view === key ? "bg-white/10" : "hover:bg-white/5"}`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Spacer for fixed nav ── */}
        <div className="h-16" />

        {/* ── Views ── */}
        {view === "login" && <Login />}

        {view === "favourites" && (
          <Favourites movies={movies} toggleLike={toggleLike} MovieCard={MovieCard} />
        )}

        {view === "home" && (
          <>
            <header className="text-center py-12">
              <img
                src="/hero.png"
                alt="CineSync Hero"
                className="mx-auto w-1/2 mb-6"
              />
              <h1 className="text-4xl font-extrabold">Go ahead, stream free</h1>
              <p className="text-lg text-gray-300 mt-2">
                With CineSync you can watch movies from all over the world. So
                what are you waiting for?
              </p>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

            <section className="all-movies">
              <h2 className="text-2xl font-bold mt-10 mb-4">
                {searchTerm
                  ? `Results for "${searchTerm}" (${filteredMovies.length})`
                  : `All Movies (${movies.length})`}
              </h2>

              {errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : filteredMovies.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-4xl mb-3">🎬</p>
                  <p className="text-lg">No movies match "{searchTerm}"</p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 text-blue-400 underline text-sm"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <ul>
                  {filteredMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      toggleLike={toggleLike}
                    />
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default App;
