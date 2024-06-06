import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
//import { LoginView } from "../login-view/login-view";


export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  //const [user, setUser] = useState(null);
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYxZmI3ZmE5ZmM4YzhkNDRjMWE2YmIiLCJVc2VybmFtZSI6ImpvaG5kb2UxMiIsIlBhc3N3b3JkIjoiJDJiJDEwJFgzaGkyN2ZyR29TblUwRVJpSnhlSU83L2lrUXM1YXpZNFFySWpJT0hTcVJ2Qmo5N2s5aDIuIiwiRW1haWwiOiJqb2huZG9lMjEyQGVtYWlsLmNvbSIsIkJpcnRoZGF5IjoiMTk3MC0xMS0xNlQwMDowMDowMC4wMDBaIiwiRmF2b3JpdGVNb3ZpZXMiOltdLCJfX3YiOjAsImlhdCI6MTcxNzY5NzQxNywiZXhwIjoxNzE4MzAyMjE3LCJzdWIiOiJqb2huZG9lMTIifQ.ebKdJfjJ9ZWrEQkQ51iNTDaE9KzsNyJkj7Bhu-J51Zk`;
  useEffect(() => {
    fetch("https://movie-api-dwho.onrender.com/movies", {
      method: "GET",
      headers: {"Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((doc) => {
          return {
            id: doc._id,
            Title: doc.Title,
            Image: doc.ImagePath,
            Director: doc.Director?.Name,
            Genre: doc.Genre?.Name
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);
  
  /*if (!user) {
    return <LoginView />;
  } */ 

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
