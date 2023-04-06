import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

import { Link, NavLink, useNavigate } from "react-router-dom";

import "./Header.css";
import UserContext from "../../../Context/user-context";
import axios from "axios";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

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
    localStorage.removeItem('profile');
    localStorage.removeItem('verifyemail');
    navigate('/signup')
  }
  const verifyemailhandler = async() => {
    try{
      await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,{
        requestType : "VERIFY_EMAIL",
        idToken : localStorage.getItem('authToken')
      });
      alert("Verify link sent to you mail");
    }catch(err){
      const { error } = err.response.data;
      alert(`Error! : ${error.message}`);
    }
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
        {userctx.isLogin && !userctx.isEmailVerified && <Button variant="success" onClick={verifyemailhandler} style={{marginRight: "2rem"}}>Verify Email</Button>}
        {userctx.isLogin && <Button variant="danger" onClick={LogoutHandler}>Logout</Button>}
      </Container>
    </Navbar>
  );
}
