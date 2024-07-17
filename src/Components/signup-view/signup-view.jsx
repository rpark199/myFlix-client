import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const [passwordError, setPasswordError] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    
        if (name === "password" || name === "confirmPassword") {
          validatePasswords(
            name === "password" ? value : formData.password,
            name === "confirmPassword" ? value : formData.confirmPassword
          );
        }
      };
    
    const validatePasswords = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
        } else if (password.length > 0 && password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
        } else {
            setPasswordError(null);
        }
      };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://moviflex-a914bff79426.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                navigate("/login");
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Container className="signup-section mb-4 p-4">
            <Row classname="justify-content-center">
                <Col md={12}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                                required
                                minLength="3"
                            />
                        </Form.Group>
                        
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>
                                Email:
                            </Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        
                        <Form.Group controlId="formBdate">
                            <Form.Label>
                                Birthday:
                            </Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
