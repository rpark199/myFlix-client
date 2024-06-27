import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card>
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <img src={movie.Image} alt="" width={150} height={150} />
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
    };
