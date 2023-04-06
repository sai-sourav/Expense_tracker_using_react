import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

import { Link, NavLink, useNavigate } from "react-router-dom";

import "./Header.css";
import UserContext from "../../../Context/user-context";

export default function Header() {
  const navigate = useNavigate();
  const userctx = useContext(UserContext);
  let content = <></>;
  if (userctx.isLogin && !userctx.Profiledetails) {
    content = (
      <div className="complete-profile">
        <span>Your Profile is in-complete!</span>
        <Link to="/completeprofile" style={{ color: "white" }}>
          Complete Now
        </Link>
      </div>
    );
  }else if(userctx.isLogin && userctx.Profiledetails){
    content = (
      <div className="complete-profile">
        <Button as={Link} to="/completeprofile" variant="primary">Edit Profile</Button>
      </div>
    )
  }
  const LogoutHandler = () => {
    localStorage.removeItem('authToken');
    userctx.setIsLogin((prev) => !prev );
    localStorage.removeItem('profile')
    navigate('/signup')
  }
  return (
    <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-5 gap-5">
            {!userctx.isLogin && <NavLink
              to="/signup"
              exact
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              Signup
            </NavLink>}
            <NavLink
              to="/home"
              exact
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              Home
            </NavLink>
            <NavLink
              to="/contactus"
              exact
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              ContactUs
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        {content}
        {userctx.isLogin && <Button variant="danger" onClick={LogoutHandler}>Logout</Button>}
      </Container>
    </Navbar>
  );
}
