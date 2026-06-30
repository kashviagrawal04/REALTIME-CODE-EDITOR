import React from "react";

const Favourites = ({ movies, toggleLike, MovieCard }) => {
  const likedMovies = movies.filter((movie) => movie.liked);

  return (
    <section className="px-4 pt-10">
      <h2 className="text-2xl font-bold mb-6">
        ❤️ Your Favourites
        {likedMovies.length > 0 && (
          <span className="ml-2 text-base font-normal text-gray-400">
            ({likedMovies.length} {likedMovies.length === 1 ? "movie" : "movies"})
          </span>
        )}
      </h2>

      {likedMovies.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-5xl mb-4">🎞️</p>
          <p className="text-lg">You haven't liked any movies yet.</p>
          <p className="text-sm mt-2 opacity-60">
            Browse the home page and tap 🤍 to save a movie here.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {likedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} toggleLike={toggleLike} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Favourites;
