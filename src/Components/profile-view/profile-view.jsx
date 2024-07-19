import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { ProfileUpdate } from "./profile-update";
import { ProfileDelete } from "./profile-delete";
import { FavoriteMovies } from "./favorite-movies";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const ProfileView = ({ username, token, onLogout, movies }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    "https://moviflex-a914bff79426.herokuapp.com/users/${username}",
                    {
                        headers: {
                            Authorization:`Bearer ${token}`,
                        }
                    }
                );
                setUser(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

    fetchUserData();
}, [username, token]);

    const handleUpdate = (updatedUser) => {
    setUser(updatedUser); 
    navigate(`/users/${updatedUser.Username}`, { replace: true });
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your profile?")) {
        setIsDeleting(true);
        try {
            const response = await axios.delete(
              `https://moviflex-a914bff79426.herokuapp.com/users/${username}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.status === 200) {
              alert("Profile deleted");
              onLogout();
              navigate("/login");
            } else {
              alert("Failed to delete profile:", response.statusText);
              setIsDeleting(false);
            }
          } catch (error) {
              console.error("Error deleting profile:", error);
          }
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    const favoriteMovies = movies.filter((m) =>
        user.FavoriteMovies.includes(m._id)
    );

    const formattedBirthday = moment.utc(user.Birthday).format("MM-DD-YYYY");
    
    return (
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="profile-section mb-4 p-4">
              <h1 className="text-center mb-4">Profile Info</h1>
              <UserInfo
                username={user.Username}
                email={user.Email}
                birthday={formattedBirthday}
              />
            </div>
            <div className="profile-section mb-4 p-4">
              <h2 className="text-center mb-4">Update Info</h2>
              <ProfileUpdate
                username={username}
                token={token}
                user={user}
                onProfileUpdate={handleUpdate}
              />
              <ProfileDelete username={username} onDelete={handleDelete} />
            </div>
          </Col>
          <Row className="mb-4">
            <Col xs={12}>
              <div className="profile-section p-4">
                <h2 className="text-center mb-4">Favorite Movies</h2>
                <FavoriteMovies
                  favoriteMovies={favoriteMovies}
                  user={user}
                  token={token}
                  onUpdateFavorites={(movieId) => {
                    setUser((prevUser) => ({
                      ...prevUser,
                      FavoriteMovies: prevUser.FavoriteMovies.filter(
                        (id) => id !== movieId
                      ),
                    }));
                  }}
                />
              </div>
            </Col>
          </Row>
        </Row>
      );
    };

ProfileView.propTypes = {
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired,
  };