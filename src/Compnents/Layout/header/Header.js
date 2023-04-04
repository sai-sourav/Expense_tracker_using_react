import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';

import { Link, NavLink } from 'react-router-dom';

import "./Header.css";

export default function Header() {
  return (
    <Navbar bg="dark" expand="lg" sticky="top" variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to="/">Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-5 gap-5">
          <NavLink to='/signup' exact activeClassName="active" style={{textDecoration : "none"}}>Signup</NavLink>
            <NavLink to='/home' exact activeClassName="active" style={{textDecoration : "none"}}>Home</NavLink>
            <NavLink to='/contactus' exact activeClassName="active" style={{textDecoration : "none"}}>ContactUs</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
