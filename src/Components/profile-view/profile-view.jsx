import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ username, token, onLogout, movies }) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          setUser(JSON.parse(localStorage.getItem("user")) || localStorage.getItem("user"));
        } catch (error) {
          setError(error.message);
        } 
      };
  
      fetchUserData();
    }, [username, token]);

    return (
      <Container>
        <h1>Profile</h1>
        <p>Welcome, {user.Username}</p>
        <p>Email: {user.Email}</p>
        <p>Birthday: {user.Birthday}</p>
        <Form onSubmit={(e) => {
          e.preventDefault();
          axios.put(`https://moviflex-a914bff79426.herokuapp.com/users/${e.target.username.value}`,
             {
            "Username": e.target.username.value,
            "Email": e.target.email.value,
            "Birthday": e.target.birthday.value
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }).then((response) => {
            console.log(response.data);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/profile');
          }).catch((error) => {
            console.log(error);
          });
        }}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" name="username" defaultValue={user.Username} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Email" name="email" defaultValue={user.Email} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="date" placeholder="Birthday" name="birthday" defaultValue={user.Birthday} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
            <h2>Favorite Movies</h2>
        <Row xs={1} md={2} className="g-4">
          {user.FavoriteMovies && user.FavoriteMovies.map((movie) => (
            <Col key={movie._id}>
              <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <MovieCard movie={movie} /> 
              </Link>
            </Col>
          ))}
        </Row>
        </Form>
      </Container>
    );
  };
