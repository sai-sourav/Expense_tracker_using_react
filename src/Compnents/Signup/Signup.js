import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Signup.css";
import axios from "axios";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

export default function Signup() {
  const [isLogin, setIsLogin] = useState(false);
  const emailref = useRef();
  const pswdref = useRef();
  const confpswdref = useRef();

  const clickHandler = async (e) => {
    e.preventDefault();
    const email = emailref.current.value;
    const pswd = pswdref.current.value;
    const confpswd = confpswdref.current.value;
    if (pswd === confpswd && !isLogin) {
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
            email : email,
            password : pswd
        })
      } catch (err) {
        alert(`Error! : ${err}`);
      }
    } else {
      alert("passwords dont match");
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={confpswdref}
              />
            </Form.Group>

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
