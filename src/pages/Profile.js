import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col, Image } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Profile() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:4000/users/details", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => result.json())
        .then(data => {
            if (data.code === "USER-FOUND") {
                setUserProfile(data.result);
            } else {
                Swal.fire({
                    title: "Error",
                    text: data.message,
                    icon: "error"
                });
            }
        })
        .catch(() => {
            Swal.fire({
                title: "Error",
                text: "Something went wrong!",
                icon: "error"
            });
        });
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire({
                title: "Passwords don't match!",
                text: "Make sure the passwords match.",
                icon: "error"
            });
            return;
        }

        const token = localStorage.getItem("token");

        fetch("http://localhost:4000/users/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                newPassword: newPassword,
                confirmPassword: confirmPassword
            })
        })
        .then(result => result.json())
        .then(data => {
            if (data.code === "UPDATE-SUCCESS") {
                Swal.fire({
                    title: "Password Updated",
                    text: data.message,
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: data.message,
                    icon: "error"
                });
            }
        })
        .catch(() => {
            Swal.fire({
                title: "Error",
                text: "Something went wrong!",
                icon: "error"
            });
        });
    };

    return (
        <Container className="mt-5">
        <Row className="g-4">
            {/* Profile Card */}
            <Col md={4} className="d-flex flex-column align-items-center">
                <Card
                    className="border-0 rounded-lg shadow-lg mb-4"
                    style={{
                        backgroundColor: "#fff", // White background for clean look
                        color: "#333", // Darker text for better contrast
                        width: "100%",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Lighter shadow for depth
                    }}
                >
                    <Card.Body className="text-center">
                        <Image
                            src=""
                            roundedCircle
                            fluid
                            className="mb-3 shadow"
                            style={{
                                width: "120px", // Slightly larger image
                                height: "120px",
                                objectFit: "cover",
                                border: "4px solid #4CAF50", // Green border to stand out
                            }}
                        />
                        <h5
                            className="mb-2"
                            style={{
                                fontSize: "1.6rem",
                                fontWeight: "bold",
                                color: "#333", // Dark text for better contrast
                            }}
                        >
                            {userProfile
                                ? `${userProfile.firstName} ${userProfile.lastName}`
                                : "Loading..."}
                        </h5>
                        <p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>
                            {userProfile ? userProfile.email : ""}
                        </p>
                        <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                            {userProfile ? userProfile.contactNumber : ""}
                        </p>
                    </Card.Body>
                </Card>
            </Col>
    
            {/* Password Change Form */}
            <Col md={8}>
                <Card
                    className="border-0 rounded-lg shadow-lg"
                    style={{
                        backgroundColor: "#f8f8f8", // Light grey background for form
                        borderRadius: "12px", // Rounded corners for smooth look
                        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)", // Light shadow for form depth
                    }}
                >
                    <Card.Body>
                        <h4
                            className="text-center mb-4"
                            style={{
                                color: "#4CAF50", // Green color for title
                                fontWeight: "bold",
                                fontSize: "1.8rem", // Larger font size for visibility
                            }}
                        >
                            Change Your Password
                        </h4>
                        <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3">
                                <Form.Label
                                    style={{
                                        fontWeight: "600",
                                        fontSize: "1rem",
                                        color: "#333", // Darker text for labels
                                    }}
                                >
                                    New Password
                                </Form.Label>
                                <Form.Control
                                    className="np"
                                    type="password"
                                    placeholder="Enter a new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    style={{
                                        borderRadius: "10px",
                                        border: "2px solid #4CAF50", // Green border for consistency
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label
                                    style={{
                                        fontWeight: "600",
                                        fontSize: "1rem",
                                        color: "#333", // Darker text for labels
                                    }}
                                >
                                    Confirm New Password
                                </Form.Label>
                                <Form.Control
                                    className="cnp"
                                    type="password"
                                    placeholder="Confirm your new password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                    style={{
                                        borderRadius: "10px",
                                        border: "2px solid #4CAF50", // Green border for consistency
                                    }}
                                />
                            </Form.Group>
                            <Button
                                className="sub-but"
                                type="submit"
                                variant="success"
                                style={{
                                    width: "100%",
                                    borderRadius: "10px",
                                    fontWeight: "bold",
                                    backgroundColor: "#4CAF50", // Green background
                                    border: "none",
                                    transition: "0.3s ease",
                                }}
                                onMouseOver={(e) =>
                                    (e.target.style.backgroundColor = "#45a049")
                                }
                                onMouseOut={(e) =>
                                    (e.target.style.backgroundColor = "#4CAF50")
                                }
                            >
                                Update Password
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    
);
}