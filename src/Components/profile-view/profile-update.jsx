import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Col } from "react-bootstrap";
import moment from "moment";

export const ProfileUpdate = ({ username, token, user, onProfileUpdate }) => {
  const formatDate = (dateString) => {
    // Parse the UTC date string
    let utcDate = moment.utc(dateString);

    // Format to "YYYY-MM-DD" ignoring the offset
    let formattedDate = utcDate.format("YYYY-MM-DD");

    return formattedDate;
  };

  const initialFormData = {
    Username: user.Username || "",
    Password: "",
    ConfirmPassword: "",
    Email: user.Email || "",
    Birthday: user.Birthday ? formatDate(user.Birthday) : "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    setFormData({
      Username: user.Username || "",
      Password: "",
      ConfirmPassword: "",
      Email: user.Email || "",
      Birthday: user.Birthday ? formatDate(user.Birthday) : "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "Password" || name === "ConfirmPassword") {
      if (
        (name === "Password" && value !== formData.ConfirmPassword) ||
        (name === "ConfirmPassword" && value !== formData.Password)
      ) {
        setPasswordError("Passwords do not match.");
      } else {
        setPasswordError(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.Password !== formData.ConfirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    // Check if password meets minimum length requirement
    if (formData.Password.length > 0 && formData.Password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `"https://moviflex-a914bff79426.herokuapp.com/users/${username}`,
        {
          ...formData,
          Birthday: formatDate(formData.Birthday),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      onProfileUpdate(updatedUser);
      alert("Profile updated successfully");
      // Force window reload after successful update
      window.location.reload();
    } catch (error) {
      setError(error.message);
      alert("Failed to update profile");
      // Force window reload after failed update
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Col md={8} className="profile-update">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            required
            minLength="3"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm New Password:</Form.Label>
          <Form.Control
            type="password"
            name="ConfirmPassword"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            isInvalid={!!passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            name="Birthday"
            value={formData.Birthday}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="update-button"
        >
          {loading ? "Updating..." : "Update"}
        </Button>
        {error && <div className="text-danger mt-3">Error: {error}</div>}
      </Form>
    </Col>
  );
};S