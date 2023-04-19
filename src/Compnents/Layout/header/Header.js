import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";
import axios from "axios";
import { userAction } from "../../../Redux/userReducer";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

export default function Header() {
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.user.isLogin);
  const Profiledetails = useSelector(state => state.user.Profiledetails);
  const isEmailVerified = useSelector(state => state.user.isEmailVerified);
  const dispatch = useDispatch();

  let content = <></>;
  if (isLogin && !Profiledetails) {
    content = (
      <div className="complete-profile">
        <span>Your Profile is in-complete!</span>
        <Link to="/completeprofile" style={{ color: "white" }}>
          Complete Now
        </Link>
      </div>
    );
  }else if(isLogin && Profiledetails){
    content = (
      <div className="complete-profile">
        <Button as={Link} to="/completeprofile" variant="primary">Edit Profile</Button>
      </div>
    )
  }
  const LogoutHandler = () => {
    localStorage.removeItem('authToken');
    dispatch(userAction.updateLogin());
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
            {!isLogin && <NavLink
              to="/signup"
              className={(navData) => (navData.isActive ? "active" : 'none')}
              style={{ textDecoration: "none" }}
            >
              Signup
            </NavLink>}
            <NavLink
              to="/home"
              className={(navData) => (navData.isActive ? "active" : 'none')}
              style={{ textDecoration: "none" }}
            >
              Home
            </NavLink>
            <NavLink
              to="/contactus"
              className={(navData) => (navData.isActive ? "active" : 'none')}
              style={{ textDecoration: "none" }}
            >
              ContactUs
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        {content}
        {isLogin && !isEmailVerified && <Button variant="success" onClick={verifyemailhandler} style={{marginRight: "2rem"}}>Verify Email</Button>}
        {isLogin && <Button variant="danger" onClick={LogoutHandler}>Logout</Button>}
      </Container>
    </Navbar>
  );
}
