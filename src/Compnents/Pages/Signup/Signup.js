import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from "../../../Redux/userReducer";

const API_KEY = "AIzaSyAe5vc2TP8RDgqhG681woI8zJAXLHgu4sw";

export default function Signup() {
  const dispatch = useDispatch();
  const [type, setType] = useState("signin");
  const emailref = useRef();
  const pswdref = useRef();
  const confpswdref = useRef();

  const navigate = useNavigate();

  const clickHandler = async (e) => {
    e.preventDefault();
    const email = emailref.current.value;
    if (type === "signup") {
      const pswd = pswdref.current.value;
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
          setType("signin");
        } catch (err) {
          const { error } = err.response.data;
          alert(`Error! : ${error.message}`);
        }
      } else {
        alert("passwords dont match");
      }
    } else if (type === "forgot") {
      try {
        await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
          {
            requestType: "PASSWORD_RESET",
            email: email,
          }
        );
        alert("Password reset link sent to email");
        setType("signin");
      } catch (err) {
        const { error } = err.response.data;
        alert(`Error! : ${error.message}`);
      }
    } else if (type === "signin") {
      try {
        const pswd = pswdref.current.value;
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
        console.log(users[0]);
        if (users[0].displayName) {
          dispatch(userAction.updateProfiledetails(true));
          localStorage.setItem("profile", true);
        } else {
          dispatch(userAction.updateProfiledetails(false));
          localStorage.setItem("profile", false);
        }
        dispatch(userAction.updateEmailVerified(users[0].emailVerified));
        localStorage.setItem("verifyemail", users[0].emailVerified);
        e.target.reset();
        dispatch(userAction.updateLogin());
        navigate("/home");
      } catch (err) {
        const { error } = err.response.data;
        alert(`Error! : ${error.message}`);
      }
    }
  };
  const signinsignuphandler = () => {
    if (type === "signin") {
      setType("signup");
    } else {
      setType("signin");
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={6}>
          <Row>
            <h1
              className="text-center"
              style={{
                marginTop: "4rem",
                color: "white",
                fontFamily: "Lucida Console , Courier New, monospace",
                width: "100rem",
                fontSize: "4rem",
              }}
            >
              Expense Tracker
            </h1>
          </Row>
          <Row className="justify-content-md-center">
            <Form className="signupform" onSubmit={clickHandler}>
              <Row>
                <Col>
                  {type === "signin" && <h2>Login</h2>}
                  {type === "signup" && <h2>Signup</h2>}
                  {type === "forgot" && <h2>Forgot Password</h2>}
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={emailref}
                />
              </Form.Group>

              {type !== "forgot" && (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    ref={pswdref}
                  />
                </Form.Group>
              )}

              {type === "signup" && (
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
                    {type === "signin" && "Login"}
                    {type === "signup" && "Signup"}
                    {type === "forgot" && "Reset Password"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>
          <Row className="justify-content-lg-center">
            <Col className="text-center">
              <Row>
                <Button
                  variant="link"
                  onClick={signinsignuphandler}
                  style={{ color: "white" }}
                  className="login-signup-link"
                >
                  {type === "signin" && "Don't have an account? Signup"}
                  {type === "signup" && "Already have an Account? Signin"}
                  {type === "forgot" && "Already have an Account? Signin"}
                </Button>
              </Row>
              {type !== "forgot" && (
                <Row>
                  {" "}
                  <Button
                    variant="link"
                    onClick={() => setType("forgot")}
                    style={{ color: "white" }}
                  >
                    Forgot Password?
                  </Button>
                </Row>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
