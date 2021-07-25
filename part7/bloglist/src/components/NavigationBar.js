import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { MdAccountCircle } from "react-icons/md";
import "../styles/NavigationBar.css";

export default function NavigationBar({ user, handleLogout }) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to='/'>Blog App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Blogs</Nav.Link>
                        <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
                        <Nav.Item className="ml-auto">
                            <Navbar.Text>
                                <MdAccountCircle />{user.name} has logged in {"  "}
                                <Button variant="primary" onClick={handleLogout}>Logout</Button>
                            </Navbar.Text>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
