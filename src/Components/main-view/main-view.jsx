import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
      {
        id: 1,
        Title: 'Shutter Island',
        Director: 'Martin Scorsese',
        Genre:'Suspense-Thriller',
        ImageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/76/Shutterislandposter.jpg'
      },
      {
        id: 2,
        Title: 'The Fugitive',
        Director: 'Andrew Davis',
        Genre: 'Suspense-Thriller',
        ImageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/The_Fugitive_official_logo.png/250px-The_Fugitive_official_logo.png'
      },
      {
        id: 3,
        Title: 'The Shack',
        Director: 'Stuart Hazeldine',
        Genre: 'Feel-Good',
        ImageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Shackover.jpg'
      },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};