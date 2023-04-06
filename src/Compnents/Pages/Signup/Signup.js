import React, { useContext, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../Context/user-context";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

export default function Signup() {
  const [isLogin, setIsLogin] = useState(false);
  const userctx = useContext(UserContext);
  const emailref = useRef();
  const pswdref = useRef();
  const confpswdref = useRef();

  const navigate = useNavigate();

  const clickHandler = async (e) => {
    e.preventDefault();
    const email = emailref.current.value;
    const pswd = pswdref.current.value;
    if (!isLogin) {
      const confpswd = confpswdref.current.value;
      if (pswd === confpswd) {
        try {
          await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
            {
              email: email,
              password: pswd,
            }
          );
          e.target.reset();
          console.log({
            email: email,
            password: pswd,
          });
          setIsLogin((prev) => !prev);
        } catch (err) {
          const { error } = err.response.data;
          alert(`Error! : ${error.message}`);
        }
      } else {
        alert("passwords dont match");
      }
    } else {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
          {
            email: email,
            password: pswd,
            returnSecureToken: true,
          }
        );
        const { idToken } = response.data;
        localStorage.setItem("authToken", idToken);
        const response1 = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
          {
            idToken: localStorage.getItem("authToken"),
          }
        );
        const users = response1.data.users;
        if(users[0].displayName) {
          userctx.setProfiledetails(true);
          localStorage.setItem('profile', true);
        }else{
          userctx.setProfiledetails(false);
          localStorage.setItem('profile', false);
        }
        e.target.reset();
        userctx.setIsLogin();
        navigate("/home");
      } catch (err) {
        const { error } = err.response.data;
        alert(`Error! : ${error.message}`);
      }
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={3}>
          <Form className="signupform" onSubmit={clickHandler}>
            <Row>
              <Col>
                <h2>{isLogin ? "Login" : "Signup"}</h2>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailref}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={pswdref}
              />
            </Form.Group>

            {!isLogin && (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={confpswdref}
                />
              </Form.Group>
            )}

            <Row className="justify-content-lg-center">
              <Col className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: "60%" }}
                >
                  {isLogin ? "Login" : "Signup"}
                </Button>
              </Col>
            </Row>
          </Form>
          <Row className="justify-content-lg-center">
            <Col className="text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin((prev) => !prev)}
              >
                {isLogin
                  ? "Don't have an account? Signup"
                  : "Already have an Account? Signin"}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
