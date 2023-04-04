import React from 'react';
import "./Footer.css";

import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <Navbar bg="dark" sticky="bottom" expand="lg" variant='dark'>
            <Container>
                <Navbar.Brand as={Link} to="/">Expense Tracker</Navbar.Brand>
                <Nav className="ms-5 gap-5">
                    <Link to='/home' style={{ textDecoration: "none" }}>Home</Link>
                    <Link to='/contactus' style={{ textDecoration: "none" }}>ContactUs</Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
