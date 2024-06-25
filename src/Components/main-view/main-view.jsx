import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  useEffect(() => {
    fetch("https://moviflex-a914bff79426.herokuapp.com/movies")
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.docs.map((doc) => {
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

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <Col md={5}>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignupView />
          </Col>  
        </>
      ) : selectedMovie ? (
      <Col md={8} style={{ border: "1px solid black" }}>
        <MovieView
          style={{ border: "1px solid green" }}
          Movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </>
      )}
    </Row>
  );
};
