import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export const MovieView = ({ user, token, onFavorite }) => {
  const { movieId } =useParams();
  const movies = useSelector((state) => state.movies.list);
  const movie = movies.find((m) => m._id === movieId);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user.FavoriteMovies.includes(movieId)) {
      setIsFavorite(true);
    }
  }, [movieId, user.FavoriteMovies]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(
          `https://moviflex-a914bff79426.herokuapp.com/users/${user.Username}/movies/${movieId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          `https://moviflex-a914bff79426.herokuapp.com/users/${user.Username}/movies/${movieId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      onFavorite(movieId, !isFavorite);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorite movie:", error);
    }
  };

  return (
      <Row className="justify-content-center">
        <Col md={6}>
          <img
            src={movie.ImagePath}
            alt={movie.Title}
            className="img-fluid rounded"
          />
        </Col>
        <Col md={6}>
            <h3 className="mb-3">{movie.Title}</h3>
            <p>
              <strong>Description: </strong> {movie.Description}
            </p>
            <p>
              <strong>Genre: </strong> {movie.Genre.Name}
            </p>
            <p>
              <strong>Director: </strong> {movie.Director.Name}
            </p>
            <p>
              <strong>Cast: </strong> {movie.Actors.join(", ")}
            </p>
            <Link to={`/`}>
              <Button className="back-button">Back</Button>
            </Link>
            <Button
              onClick={handleFavorite}
              variant={isFavorite ? "danger" : "primary"}
              className="favorite-button"
            >
              {isFavorite ? "Unfavorite" : "Favorite"}
            </Button>
        </Col>
      </Row>
  );
};

  MovieView.propTypes = {
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    onFavorite: PropTypes.func.isRequired,
  };
